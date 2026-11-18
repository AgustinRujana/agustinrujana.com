/**
 * Minimal circle physics for the hero stickers: gravity, damping, wall bounces
 * and pairwise collision resolution. Pure functions, no DOM, easy to test.
 */

export type Body = {
  label: string;
  base: number; // radius at scale 1
  r: number; // current radius
  fill: string;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export type World = { width: number; height: number; floorInset: number };

const GRAVITY = 0.42;
const AIR = 0.99;
const ITERATIONS = 4;

/** Scale stickers with the canvas so phones and wide screens both look full. */
export const scaleFor = (width: number) => Math.max(0.52, Math.min(1.15, width / 1100));

/** Stack bodies in rows from the floor up, in random order. */
export function stack(
  items: { label: string; size: number; fill: string; text: string }[],
  world: World,
  scale: number,
  random = Math.random,
): Body[] {
  const shuffled = items.map((item) => ({ item, k: random() })).sort((a, b) => a.k - b.k);
  let x = 0;
  let y = world.height;
  let row = 0;
  return shuffled.map(({ item }) => {
    const r = item.size * scale;
    if (x + 2 * r > world.width) {
      x = 0;
      y -= row;
      row = 0;
    }
    const body: Body = { ...item, label: item.label, base: item.size, r, x: x + r + random() * 6, y: y - r, vx: 0, vy: 0 };
    x += 2 * r + 2;
    row = Math.max(row, 2 * r);
    return body;
  });
}

/** Keep bodies inside a resized world. */
export function rescale(bodies: Body[], world: World, scale: number) {
  for (const b of bodies) {
    b.r = b.base * scale;
    b.x = Math.min(Math.max(b.x, b.r), world.width - b.r);
    b.y = Math.min(b.y, world.height - b.r);
  }
}

function walls(b: Body, w: World) {
  const floor = w.height - w.floorInset;
  if (b.y + b.r > floor) {
    b.y = floor - b.r;
    if (b.vy > 0) b.vy *= -0.3;
    b.vx *= 0.92;
  }
  if (b.y - b.r < 0) {
    b.y = b.r;
    if (b.vy < 0) b.vy *= -0.3;
  }
  if (b.x - b.r < 0) {
    b.x = b.r;
    if (b.vx < 0) b.vx *= -0.5;
  }
  if (b.x + b.r > w.width) {
    b.x = w.width - b.r;
    if (b.vx > 0) b.vx *= -0.5;
  }
}

/** Advance one frame. `held` is the body under the pointer: it pushes others but is not pushed. */
export function step(bodies: Body[], world: World, held: Body | null) {
  for (const b of bodies) {
    if (b === held) continue;
    b.vy += GRAVITY;
    b.vx *= AIR;
    b.vy *= AIR;
    b.x += b.vx;
    b.y += b.vy;
    walls(b, world);
  }
  for (let it = 0; it < ITERATIONS; it++) {
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i]!;
        const c = bodies[j]!;
        const dx = c.x - a.x;
        const dy = c.y - a.y;
        const d = Math.hypot(dx, dy) || 0.01;
        const overlap = a.r + c.r - d;
        if (overlap <= 0) continue;
        const nx = dx / d;
        const ny = dy / d;
        const wa = a === held ? 0 : c === held ? 1 : 0.5;
        const wc = c === held ? 0 : a === held ? 1 : 0.5;
        a.x -= nx * overlap * wa;
        a.y -= ny * overlap * wa;
        c.x += nx * overlap * wc;
        c.y += ny * overlap * wc;
        const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
        if (rv < 0) {
          const impulse = (-1.3 * rv) / 2;
          if (a !== held) {
            a.vx -= impulse * nx;
            a.vy -= impulse * ny;
          }
          if (c !== held) {
            c.vx += impulse * nx;
            c.vy += impulse * ny;
          }
        }
      }
    }
    for (const b of bodies) if (b !== held) walls(b, world);
  }
}

/** Throw every body upward with some sideways spin. */
export function kick(bodies: Body[], strength = 1, random = Math.random) {
  for (const b of bodies) {
    b.vy -= (8 + random() * 10) * strength;
    b.vx += (random() - 0.5) * 14 * strength;
  }
}

/** True when everything has settled, so the render loop can sleep. */
export const isAtRest = (bodies: Body[]) => bodies.every((b) => Math.abs(b.vx) < 0.05 && Math.abs(b.vy) < 0.5);
