"use server";

import { guidesQuizData } from "@/lib/guides-quiz-data";
import { auth } from "@/auth";

export async function checkQuizAnswerAction(
  guideSlug: string,
  questionId: string,
  selectedIndex: number
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Please sign in to check your answers." };
  }
  const quiz = guidesQuizData.find((q) => q.guideSlug === guideSlug);
  if (!quiz) {
    return { error: "Quiz not found" };
  }

  const question = quiz.questions.find((q) => q.id === questionId);
  if (!question) {
    return { error: "Question not found" };
  }

  return {
    success: true,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    isCorrect: question.correctIndex === selectedIndex,
  };
}
