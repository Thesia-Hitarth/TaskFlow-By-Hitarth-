import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#101010",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>Developer Taskflows</div>
        <div style={{ fontSize: 28, color: "#737373", marginTop: 20 }}>
          Community created taskflows, guides and articles to help developers
          grow in their career.
        </div>
      </div>
    ),
    { ...size }
  );
}
