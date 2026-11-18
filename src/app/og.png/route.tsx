import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Rendered once at build time and written to /og.png (a real .png, so every host serves the right type).
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };
const font = (file: string) => readFile(path.join(process.cwd(), "src/fonts/og", file));

const stickers = [
  { label: "Performance", fill: "#ff5532", text: "#ffffff", d: 250, x: 955, y: 185 },
  { label: "React", fill: "#ffffff", text: "#17130f", d: 160, x: 830, y: 430 },
  { label: "AI", fill: "#7fe0bf", text: "#17130f", d: 140, x: 1060, y: 455 },
];

export async function GET() {
  const [display, regular, bold] = await Promise.all([
    font("unbounded-latin-900-normal.woff"),
    font("dm-sans-latin-400-normal.woff"),
    font("dm-sans-latin-700-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffe14d",
          padding: 72,
          color: "#17130f",
          fontFamily: "DM Sans",
          position: "relative",
          borderBottom: "10px solid #17130f",
        }}
      >
        {stickers.map((s) => (
          <div
            key={s.label}
            style={{
              position: "absolute",
              left: s.x - s.d / 2,
              top: s.y - s.d / 2,
              width: s.d,
              height: s.d,
              borderRadius: "50%",
              background: s.fill,
              color: s.text,
              border: "6px solid #17130f",
              boxShadow: "10px 10px 0 #17130f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: Math.min(s.d / 4.2, (s.d * 0.75) / (s.label.length * 0.6)),
              fontWeight: 700,
            }}
          >
            {s.label}
          </div>
        ))}
        <div style={{ fontFamily: "Unbounded", fontSize: 34 }}>{site.shortName}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Unbounded",
            fontSize: 64,
            lineHeight: 1,
            letterSpacing: -3,
            maxWidth: 760,
          }}
        >
          <span>{site.headline[0]}</span>
          <span>{site.headline[1]}</span>
        </div>
        <div style={{ fontSize: 30 }}>{`${site.name} · ${site.role} · ${site.location}`}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: display, weight: 900, style: "normal" },
        { name: "DM Sans", data: regular, weight: 400, style: "normal" },
        { name: "DM Sans", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
