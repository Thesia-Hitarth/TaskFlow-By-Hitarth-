import { ImageResponse } from "next/og";
import { guides } from "@/lib/guides-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

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
        <div style={{ fontSize: 22, color: "#f59e0b", fontWeight: 600 }}>
          DEVELOPER GUIDES
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 16 }}>
          {guide?.title ?? "Guide"}
        </div>
        <div style={{ fontSize: 28, color: "#737373", marginTop: 16, maxWidth: 900 }}>
          {guide?.description ?? ""}
        </div>
      </div>
    ),
    { ...size }
  );
}
