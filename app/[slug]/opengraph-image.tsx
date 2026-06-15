import { ImageResponse } from "next/og";
import { taskflows } from "@/lib/taskflows-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const taskflow = taskflows.find((t) => t.slug === slug);

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
          DEVELOPER TASKFLOWS
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 16 }}>
          {taskflow?.title ?? "Taskflow"}
        </div>
        <div style={{ fontSize: 28, color: "#737373", marginTop: 16, maxWidth: 900 }}>
          {taskflow?.description ?? ""}
        </div>
      </div>
    ),
    { ...size }
  );
}
