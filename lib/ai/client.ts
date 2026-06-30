import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini SDK client
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

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
      console.log(`[AI Usage] feature=${params.feature ?? "unknown"} input_tokens=${inputTokens} output_tokens=${outputTokens}`);

      if (params.userId) {
        // Dynamic import to prevent circular dependencies
        import("@/lib/prisma").then(({ prisma }) => {
          prisma.aIUsageLog.create({
            data: {
              userId: params.userId,
              feature: params.feature ?? "unknown",
              inputTokens,
              outputTokens,
            },
          }).catch((err) => {
            console.error("Failed to log AI usage to database:", err);
          });
        });
      }
    }

    return response.text;
  } catch (err) {
    console.error("[AI Service Error]", err);
    throw new AIServiceError("The AI assistant is temporarily unavailable. Please try again.", err);
  }
}
