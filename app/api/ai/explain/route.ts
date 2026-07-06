import { auth } from "@/auth";
import { ai, AI_MODEL } from "@/lib/ai/client";
import { BASE_TUTOR_PERSONA } from "@/lib/ai/prompts";
import { limitExplain } from "@/lib/ai/rateLimit";
import { getNodeDetail } from "@/lib/roadmaps";
import { NextRequest } from "next/server";
import { validateUserInput } from "@/lib/ai/validation";

import { z } from "zod";

const ExplainRequestSchema = z.object({
  roadmapId: z.string().regex(/^[a-z0-9-]{1,50}$/),
  nodeId: z.string().regex(/^[a-zA-Z0-9-]{1,100}$/),
  question: z.string().min(1).max(500),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { success: withinLimit } = await limitExplain(session.user.id);
  if (!withinLimit) {
    return new Response("Rate limit exceeded. Try again in an hour.", { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = ExplainRequestSchema.safeParse(body);
    if (!parsed.success) {
      return new Response("Invalid parameters or input length exceeded", { status: 400 });
    }

    const { roadmapId, nodeId, question } = parsed.data;

    const validation = validateUserInput(question, 500);
    if (!validation.valid) {
      return new Response(validation.error || "Invalid input", { status: 400 });
    }

    const nodeDetail = getNodeDetail(roadmapId, nodeId);
    if (!nodeDetail) {
      return new Response("Topic not found", { status: 404 });
    }

    const systemPrompt = `${BASE_TUTOR_PERSONA}

The student is currently learning: "${nodeDetail.label}" (difficulty: ${nodeDetail.difficulty}).
Context on this topic: ${nodeDetail.whyLearn}

Answer their question specifically in the context of this topic. Stay focused — 
if they ask something unrelated to "${nodeDetail.label}", gently steer back. Keep response very short and concise.`;

    const responseStream = await ai.models.generateContentStream({
      model: AI_MODEL,
      contents: question,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 500,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: unknown) {
    console.error("[Streaming AI Error]", err);
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return new Response(msg, { status: 500 });
  }
}
