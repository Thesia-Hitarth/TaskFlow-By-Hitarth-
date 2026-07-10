import { GoogleGenAI } from "@google/genai";

// Lazy singleton — initialized on first use so the SDK is never constructed
// with an empty API key during module load / cold-start env validation.
let _ai: GoogleGenAI | null = null;
export function getAIClient(): GoogleGenAI {
  if (!_ai) {
    if (!process.env.GEMINI_API_KEY) {
      throw new AIServiceError("GEMINI_API_KEY is not configured.");
    }
    _ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return _ai;
}

export const AI_MODEL = "gemini-2.5-flash";

export class AIServiceError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "AIServiceError";
  }
}

interface GenerateResponseParams {
  systemPrompt: string;
  userMessage: string;
  maxTokens?: number;
  responseMimeType?: string;
  userId?: string;
  feature?: string;
}

export async function generateAIResponse(params: GenerateResponseParams): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new AIServiceError("GEMINI_API_KEY is not configured.");
    }

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: AI_MODEL,
      contents: params.userMessage,
      config: {
        systemInstruction: params.systemPrompt,
        maxOutputTokens: params.maxTokens ?? 1000,
        responseMimeType: params.responseMimeType,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    if (!response.text) {
      throw new AIServiceError("AI response was empty.");
    }

    // Log usage statistics
    if (response.usageMetadata) {
      const inputTokens = response.usageMetadata.promptTokenCount ?? 0;
      const outputTokens = response.usageMetadata.candidatesTokenCount ?? 0;
      if (process.env.NODE_ENV !== "production") {
        console.log(`[AI Usage] feature=${params.feature ?? "unknown"} input_tokens=${inputTokens} output_tokens=${outputTokens}`);
      }

      if (params.userId) {
        // Dynamic import to prevent circular dependencies.
        // Single .catch() covers both the import() rejection and the create() failure.
        import("next/server")
          .then(({ after }) => {
            try {
              after(() => {
                import("@/lib/prisma")
                  .then(({ prisma }) =>
                    prisma.aIUsageLog.create({
                      data: {
                        userId: params.userId!,
                        feature: params.feature ?? "unknown",
                        inputTokens,
                        outputTokens,
                      },
                    })
                  )
                  .catch((err) => {
                    console.error("Failed to log AI usage to database in after:", err);
                  });
              });
            } catch {
              // Fallback if after is not available/applicable
              import("@/lib/prisma")
                .then(({ prisma }) =>
                  prisma.aIUsageLog.create({
                    data: {
                      userId: params.userId!,
                      feature: params.feature ?? "unknown",
                      inputTokens,
                      outputTokens,
                    },
                  })
                )
                .catch((err) => {
                  console.error("Failed to log AI usage to database directly:", err);
                });
            }
          })
          .catch((err) => {
            console.error("Failed to load next/server or prisma for AI usage logging:", err);
          });
      }
    }

    return response.text;
  } catch (err) {
    console.error("[AI Service Error]", err);
    throw new AIServiceError("The AI assistant is temporarily unavailable. Please try again.", err);
  }
}
