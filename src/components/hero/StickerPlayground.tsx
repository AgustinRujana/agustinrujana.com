"use client";

import { useEffect, useRef } from "react";
import { stickers } from "@/content/site";
import { accentHex } from "@/lib/accents";
import { MOTION_EVENT, SHAKE_EVENT } from "@/lib/events";
import { isAtRest, kick, rescale, scaleFor, stack, step, type Body, type World } from "@/lib/physics";

const INK = "#17130f";
const SHAKE_THRESHOLD = 14; // m/s² change between motion samples
const SHAKE_COOLDOWN_MS = 280;
const FRAMES_BEFORE_SLEEP = 90;

type MotionPermission = { requestPermission?: () => Promise<"granted" | "denied"> };

const items = stickers.map((s) => ({ label: s.label, size: s.size, ...accentHex[s.accent] }));

/**
 * Drag-and-throw skill stickers drawn on a canvas.
 * The loop sleeps when everything is at rest or off screen, so it costs nothing while idle.
 */
export function StickerPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const world: World = { width: 0, height: 0, floorInset: 5 };
    let bodies: Body[] = [];
    let held: (Body & { ox: number; oy: number }) | null = null;
    let visible = true;
    let frame = 0;
    let restFrames = 0;
    const family = getComputedStyle(canvas).fontFamily;

    const draw = () => {
      ctx.clearRect(0, 0, world.width, world.height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const b of bodies) {
        ctx.beginPath();
        ctx.arc(b.x + 4, b.y + 4, b.r, 0, Math.PI * 2);
        ctx.fillStyle = INK;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.fill;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = INK;
        ctx.stroke();
        let fs = Math.max(10, b.r * 0.36);
        ctx.font = `700 ${fs}px ${family}`;
        const w = ctx.measureText(b.label).width;
        if (w > b.r * 1.7) {
          fs *= (b.r * 1.7) / w;
          ctx.font = `700 ${fs}px ${family}`;
        }
        ctx.fillStyle = b.text;
        ctx.fillText(b.label, b.x, b.y + 1);
      }
    };

    const tick = () => {
      frame = 0;
      step(bodies, world, held);
      draw();
      restFrames = !held && isAtRest(bodies) ? restFrames + 1 : 0;
      if (visible && restFrames < FRAMES_BEFORE_SLEEP) frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      restFrames = 0;
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      world.width = Math.max(200, rect.width);
      world.height = Math.max(160, rect.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = world.width * dpr;
      canvas.height = world.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = scaleFor(world.width);
      if (!bodies.length) bodies = stack(items, world, scale);
      else rescale(bodies, world, scale);
      draw();
      wake();
    };

    // Pointer: grab, drag and throw.
    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top] as const;
    };
    const onDown = (e: PointerEvent) => {
      const [x, y] = toLocal(e);
      const hit = [...bodies].reverse().find((b) => Math.hypot(b.x - x, b.y - y) < b.r);
      if (!hit) return;
      canvas.setPointerCapture(e.pointerId);
      held = Object.assign(hit, { ox: x - hit.x, oy: y - hit.y });
      held.vx = held.vy = 0;
      canvas.style.cursor = "grabbing";
      wake();
    };
    const onMove = (e: PointerEvent) => {
      if (!held) return;
      const [x, y] = toLocal(e);
      const nx = Math.min(Math.max(x - held.ox, held.r), world.width - held.r);
      const ny = Math.min(Math.max(y - held.oy, held.r), world.height - world.floorInset - held.r);
      held.vx = nx - held.x;
      held.vy = ny - held.y;
      held.x = nx;
      held.y = ny;
    };
    const onUp = () => {
      if (!held) return;
      held.vx = Math.max(-30, Math.min(30, held.vx));
      held.vy = Math.max(-30, Math.min(30, held.vy));
      held = null;
      canvas.style.cursor = "grab";
      wake();
    };

    // The Shake button dispatches this synchronously inside its click, so iOS still counts it as a tap.
    const onShake = (e: Event) => {
      startMotion();
      kick(bodies, (e as CustomEvent<number | undefined>).detail ?? 1);
      wake();
    };

    // Phone shake through the accelerometer. iOS requires a tap before asking.
    let motionStarted = false;
    let motionAnnounced = false;
    let last: { x: number; y: number; z: number } | null = null;
    let lastKick = 0;
    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity ?? e.acceleration;
      if (!a || a.x == null || a.y == null) return;
      const cur = { x: a.x, y: a.y, z: a.z ?? 0 };
      if (!motionAnnounced) {
        motionAnnounced = true;
        window.dispatchEvent(new Event(MOTION_EVENT));
      }
      if (last) {
        const delta = Math.hypot(cur.x - last.x, cur.y - last.y, cur.z - last.z);
        const now = performance.now();
        if (delta > SHAKE_THRESHOLD && now - lastKick > SHAKE_COOLDOWN_MS && visible) {
          lastKick = now;
          kick(bodies, Math.min(1.6, delta / 22));
          wake();
        }
      }
      last = cur;
    };
    const startMotion = () => {
      if (motionStarted || typeof DeviceMotionEvent === "undefined") return;
      motionStarted = true;
      const ask = (DeviceMotionEvent as unknown as MotionPermission).requestPermission;
      if (typeof ask === "function") {
        ask.call(DeviceMotionEvent)
          .then((state) => state === "granted" && window.addEventListener("devicemotion", onMotion))
          // Rejected (e.g. not counted as a tap): allow the next tap or Shake press to ask again.
          .catch(() => {
            motionStarted = false;
          });
      } else {
        window.addEventListener("devicemotion", onMotion);
      }
    };
    const needsTap =
      typeof DeviceMotionEvent !== "undefined" &&
      typeof (DeviceMotionEvent as unknown as MotionPermission).requestPermission === "function";
    if (!needsTap) startMotion();
    const onFirstTap = () => startMotion();

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    window.addEventListener(SHAKE_EVENT, onShake);
    window.addEventListener("pointerdown", onFirstTap);

    const resize = new ResizeObserver(layout);
    resize.observe(canvas);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) wake();
    });
    seen.observe(canvas);
    // Redraw once the web font is in, so labels don't stay in the fallback face.
    void document.fonts?.ready.then(draw);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      window.removeEventListener(SHAKE_EVENT, onShake);
      window.removeEventListener("pointerdown", onFirstTap);
      window.removeEventListener("devicemotion", onMotion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={`Skill stickers you can drag and throw: ${stickers.map((s) => s.spoken ?? s.label).join(", ")}. The same skills are listed as text below.`}
      className="absolute inset-0 block h-full w-full cursor-grab touch-none pointer-coarse:w-[calc(100%-44px)]"
    />
  );
}
