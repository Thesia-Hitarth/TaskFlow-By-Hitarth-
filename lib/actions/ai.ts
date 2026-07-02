"use server"

import { auth } from "@/auth";
import { generateAIResponse } from "@/lib/ai/client";
import { BASE_TUTOR_PERSONA } from "@/lib/ai/prompts";
import { limitExplain, limitCodeReview, limitQuizGen } from "@/lib/ai/rateLimit";
import { getCachedResponse, setCachedResponse } from "@/lib/ai/cache";
import { validateUserInput } from "@/lib/ai/validation";
import { getNodeDetail, getAllRoadmapIds, getRoadmap } from "@/lib/roadmaps";
import { getGuideBySlug } from "@/lib/guides/getAllGuides";
import { z } from "zod";

// Zod schemas for validation
const RecommendationSchema = z.object({
  primaryRoadmapId: z.string(),
  secondaryRoadmapId: z.string().nullable().optional(),
  reasoning: z.string(),
  firstThreeActions: z.array(z.string()).min(1),
});

const QuizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctIndex: z.number().min(0).max(3),
  explanation: z.string(),
});

const QuizResponseSchema = z.object({
  questions: z.array(QuizQuestionSchema).length(5),
});

/**
 * Server Action: Explain Node Topic
 */
export async function explainNodeTopic(
  roadmapId: string,
  nodeId: string,
  question: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, error: "Please sign in to use AI features." };
  }

  const validation = validateUserInput(question, 500);
  if (!validation.valid) {
    return { success: false as const, error: validation.error };
  }

  const { success: withinLimit, reset } = await limitExplain(session.user.id);
  if (!withinLimit) {
    const mins = Math.ceil((reset.getTime() - Date.now()) / 60000);
    return { success: false as const, error: `Hourly limit reached. Please try again in ${mins} minute(s).` };
  }

  const nodeDetail = getNodeDetail(roadmapId, nodeId);
  if (!nodeDetail) {
    return { success: false as const, error: "Topic not found." };
  }

  // Check cache
  const cached = await getCachedResponse([roadmapId, nodeId, question]);
  if (cached) {
    return { success: true as const, answer: cached, fromCache: true };
  }

  const systemPrompt = `${BASE_TUTOR_PERSONA}

The student is currently learning: "${nodeDetail.label}" (difficulty: ${nodeDetail.difficulty}).
Context on this topic: ${nodeDetail.whyLearn}

Answer their question specifically in the context of this topic. Stay focused — 
if they ask something unrelated to "${nodeDetail.label}", gently steer back. Keep response very short and concise.`;

  try {
    const answer = await generateAIResponse({
      systemPrompt,
      userMessage: question,
      maxTokens: 500,
      userId: session.user.id,
      feature: "explain",
    });

    await setCachedResponse([roadmapId, nodeId, question], answer);

    return { success: true as const, answer, fromCache: false };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to generate response.";
    return { success: false as const, error: msg };
  }
}

/**
 * Server Action: AI Path Recommendation
 */
export async function getAIPathRecommendation(userDescription: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, error: "Please sign in to use AI features." };
  }

  const validation = validateUserInput(userDescription, 500);
  if (!validation.valid) {
    return { success: false as const, error: validation.error };
  }

  const { success: withinLimit } = await limitExplain(session.user.id);
  if (!withinLimit) {
    return { success: false as const, error: "Hourly limit reached. Try again later." };
  }

  const validRoadmapIds = getAllRoadmapIds();
  const roadmapSummaries = validRoadmapIds
    .map((id) => {
      const r = getRoadmap(id);
      return r ? `- ${id}: ${r.title} — ${r.description}` : null;
    })
    .filter(Boolean)
    .join("\n");

  const systemPrompt = `You help recommend learning paths on TaskFlow, a web development learning platform.
Here are the available paths:
${roadmapSummaries}

Based on the student's description of themselves, recommend ONE primary path and optionally ONE secondary path from the list above.
Use the exact IDs (e.g. "frontend", not "Frontend Developer").

You MUST respond with a valid JSON object matching this schema:
{
  "primaryRoadmapId": "string (must be one of the valid IDs above)",
  "secondaryRoadmapId": "string or null",
  "reasoning": "2-3 sentence personalized explanation referencing what they said",
  "firstThreeActions": ["action 1", "action 2", "action 3"]
}

Keep descriptions and reasoning extremely concise.`;

  try {
    const rawResponse = await generateAIResponse({
      systemPrompt,
      userMessage: userDescription,
      maxTokens: 400,
      responseMimeType: "application/json",
      userId: session.user.id,
      feature: "path_rec",
    });

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawResponse);
    } catch {
      return {
        success: false as const,
        error: "Couldn't generate a recommendation. Please try rephrasing.",
      };
    }

    const result = RecommendationSchema.safeParse(parsed);
    if (!result.success) {
      console.error("[AI Path Rec] Schema validation failed:", result.error);
      return {
        success: false as const,
        error: "Couldn't generate a recommendation. Please try rephrasing.",
      };
    }

    let primaryRoadmapId = result.data.primaryRoadmapId.toLowerCase().trim();
    if (!validRoadmapIds.includes(primaryRoadmapId)) {
      const matched = validRoadmapIds.find((id) => id.includes(primaryRoadmapId) || primaryRoadmapId.includes(id));
      if (matched) {
        primaryRoadmapId = matched;
      } else {
        return {
          success: false as const,
          error: `Could not match recommended path "${result.data.primaryRoadmapId}" to an available TaskFlow path.`,
        };
      }
    }

    let secondaryRoadmapId = result.data.secondaryRoadmapId
      ? result.data.secondaryRoadmapId.toLowerCase().trim()
      : null;
    if (secondaryRoadmapId && !validRoadmapIds.includes(secondaryRoadmapId)) {
      const matched = validRoadmapIds.find((id) => id.includes(secondaryRoadmapId!) || secondaryRoadmapId!.includes(id));
      secondaryRoadmapId = matched || null;
    }

    return {
      success: true as const,
      recommendation: {
        primaryRoadmapId,
        secondaryRoadmapId,
        reasoning: result.data.reasoning,
        firstThreeActions: result.data.firstThreeActions.slice(0, 3),
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to generate recommendation.";
    return { success: false as const, error: msg };
  }
}

/**
 * Server Action: AI Code Review
 */
export async function getAICodeReview(exerciseTitle: string, userCode: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, error: "Please sign in to use AI features." };
  }

  const { success: withinLimit } = await limitCodeReview(session.user.id);
  if (!withinLimit) {
    return { success: false as const, error: "Hourly code review limit reached. Try again later." };
  }

  const validation = validateUserInput(userCode, 3000);
  if (!validation.valid) {
    return {
      success: false as const,
      error: validation.error || "Invalid code submission",
    };
  }

  const systemPrompt = `${BASE_TUTOR_PERSONA}

The student just solved the exercise "${exerciseTitle}" — their code already passes all tests, so do NOT comment on correctness or whether it works. Instead, review it like a friendly senior developer doing a code review, focusing on:
1. Readability — is the code easy to follow?
2. More idiomatic patterns, if any clearly simpler approach exists
3. Edge cases the tests might not have covered (mention only if genuinely relevant)

Keep it constructive and brief — 2-3 short bullet points maximum. If the code is already excellent, say so plainly rather than inventing nitpicks.`;

  try {
    const review = await generateAIResponse({
      systemPrompt,
      userMessage: `\`\`\`javascript\n${userCode}\n\`\`\``,
      maxTokens: 300,
      userId: session.user.id,
      feature: "code_review",
    });

    return { success: true as const, review };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to perform code review.";
    return { success: false as const, error: msg };
  }
}

/**
 * Server Action: Generate Guide Quiz
 */
export async function generateGuideQuiz(guideSlug: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, error: "Please sign in to use AI features." };
  }

  // Check cache first
  const cached = await getCachedResponse(["quiz", guideSlug]);
  if (cached) {
    const parsed = QuizResponseSchema.safeParse(JSON.parse(cached));
    if (parsed.success) {
      return { success: true as const, quiz: parsed.data, fromCache: true };
    }
  }

  const { success: withinLimit } = await limitQuizGen(session.user.id);
  if (!withinLimit) {
    return { success: false as const, error: "Hourly quiz generation limit reached." };
  }

  const guide = getGuideBySlug(guideSlug);
  if (!guide) {
    return { success: false as const, error: "Guide not found." };
  }

  const systemPrompt = `Generate a 5-question multiple-choice quiz testing understanding of the following article.
Questions should test genuine comprehension. Each question needs exactly 4 options with exactly one correct answer, plus a brief explanation of why the correct answer is right.

You MUST respond with a valid JSON object matching exactly this schema:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctIndex": number (0 to 3),
      "explanation": "string"
    }
  ]
}

Article title: ${guide.frontmatter.title}
Article content snippet:
${guide.content.slice(0, 3000)}`;

  try {
    const rawResponse = await generateAIResponse({
      systemPrompt,
      userMessage: "Generate the quiz now.",
      maxTokens: 1000,
      responseMimeType: "application/json",
      userId: session.user.id,
      feature: "quiz_gen",
    });

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawResponse);
    } catch {
      return { success: false as const, error: "Couldn't generate a quiz. Please try again." };
    }

    const result = QuizResponseSchema.safeParse(parsed);
    if (!result.success) {
      console.error("[Quiz Gen] Schema validation failed:", result.error);
      return { success: false as const, error: "Couldn't generate a quiz. Please try again." };
    }

    await setCachedResponse(["quiz", guideSlug], JSON.stringify(result.data));

    return { success: true as const, quiz: result.data, fromCache: false };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to generate quiz.";
    return { success: false as const, error: msg };
  }
}
