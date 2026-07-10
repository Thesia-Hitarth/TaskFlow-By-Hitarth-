// lib/actions/onboarding.ts
"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { cookies, headers } from "next/headers"
import { Prisma } from "@prisma/client"
import type { QuizAnswers, QuizRecommendation } from "@/lib/onboarding/scoreQuiz"
import { z } from "zod"
import { checkRateLimit } from "@/lib/ai/rateLimit"
import { getAllRoadmapIds } from "@/lib/roadmaps"
import { createHmac, timingSafeEqual } from "crypto"

const QuizAnswersSchema = z.record(z.string(), z.string().or(z.array(z.string())))

const RecommendationSchema = z.object({
  primary: z.object({
    roadmapId: z.string(),
    score: z.number(),
  }),
  secondary: z.object({
    roadmapId: z.string(),
    score: z.number(),
  }).nullable().optional(),
  reasoning: z.string().max(2000),
})

function signId(id: string): string {
  const secret = process.env.AUTH_SECRET || "fallback_secret";
  const hmac = createHmac("sha256", secret).update(id).digest("hex");
  return `${id}.${hmac}`;
}

function verifySignedId(signed: string): string | null {
  const secret = process.env.AUTH_SECRET || "fallback_secret";
  const parts = signed.split(".");
  if (parts.length !== 2) return null;
  const [id, signature] = parts;
  const expectedSignature = createHmac("sha256", secret).update(id).digest("hex");
  
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (sigBuf.length === expectedBuf.length && timingSafeEqual(sigBuf, expectedBuf)) {
    return id;
  }
  return null;
}

export async function saveQuizResult(answers: QuizAnswers, recommendation: QuizRecommendation) {
  const session = await auth()

  // Rate limiting based on IP
  try {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const { success } = await checkRateLimit(`ip:savequiz:${ip}`, 10, 3600); // 10 quiz saves per hour per IP
    if (!success) {
      throw new Error("Too many quiz submissions. Please try again later.");
    }
  } catch (err) {
    console.error("Rate limiting failed on quiz save:", err);
  }
  
  const parsedAnswers = QuizAnswersSchema.safeParse(answers)
  if (!parsedAnswers.success) {
    throw new Error("Invalid quiz answers format.")
  }

  const parsedRecommendation = RecommendationSchema.safeParse(recommendation)
  if (!parsedRecommendation.success) {
    throw new Error("Invalid quiz recommendation format.")
  }

  // Validate roadmap IDs
  const validRoadmapIds = new Set(getAllRoadmapIds())
  if (!validRoadmapIds.has(recommendation.primary.roadmapId)) {
    throw new Error("Invalid primary roadmap ID.")
  }
  if (recommendation.secondary && !validRoadmapIds.has(recommendation.secondary.roadmapId)) {
    throw new Error("Invalid secondary roadmap ID.")
  }

  const timeCommitment = (answers["time"] as string) ?? "part-time"

  const result = await prisma.quizResult.create({
    data: {
      userId: session?.user?.id ?? null,
      answers: answers as Prisma.InputJsonValue, // Prisma Json field
      primaryRoadmapId: recommendation.primary.roadmapId,
      secondaryRoadmapId: recommendation.secondary?.roadmapId ?? null,
      reasoning: recommendation.reasoning,
      timeCommitment,
    },
  })

  // For anonymous (logged-out) users, stashing the result ID in a signed cookie
  // so the results page can read it back without requiring login.
  if (!session?.user?.id) {
    const cookieStore = await cookies()
    const signedValue = signId(result.id)
    cookieStore.set("taskflow_quiz_result", signedValue, { maxAge: 60 * 60 * 24 * 30, path: "/" }) // 30 days
  }

  return result
}

export async function getLatestQuizResult() {
  const session = await auth()

  if (session?.user?.id) {
    return prisma.quizResult.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })
  }

  // Anonymous fallback — read and verify the signed cookie set above
  const cookieStore = await cookies()
  const resultIdValue = cookieStore.get("taskflow_quiz_result")?.value
  if (!resultIdValue) return null

  const verifiedId = verifySignedId(resultIdValue)
  if (!verifiedId) return null

  return prisma.quizResult.findUnique({ where: { id: verifiedId } })
}

export async function markTourSeen() {
  const session = await auth()
  if (!session?.user?.id) return
  await prisma.user.update({
    where: { id: session.user.id },
    data: { hasSeenTour: true },
  })
}
