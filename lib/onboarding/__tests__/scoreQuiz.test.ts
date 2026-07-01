import { describe, it, expect } from "vitest";
import { scoreQuizAnswers, buildRecommendation } from "../scoreQuiz";

describe("scoreQuizAnswers", () => {
  it("should score quiz answers and rank roadmaps", () => {
    const answers = {
      goal: "first-job",
      experience: "some-basics",
      time: "committed",
      interest: ["web-apps"],
      ecosystem: "javascript-eco",
    };
    const scored = scoreQuizAnswers(answers);
    expect(scored).toBeInstanceOf(Array);
    if (scored.length > 0) {
      expect(scored[0]).toHaveProperty("roadmapId");
      expect(scored[0]).toHaveProperty("score");
    }
  });
});

describe("buildRecommendation", () => {
  it("should build recommendation for primary and secondary roadmaps", () => {
    const answers = {
      goal: "first-job",
      experience: "some-basics",
      time: "committed",
      interest: ["web-apps"],
      ecosystem: "javascript-eco",
    };
    const rec = buildRecommendation(answers);
    expect(rec).toHaveProperty("primary");
    expect(rec).toHaveProperty("reasoning");
    expect(rec.primary).toHaveProperty("roadmapId");
  });
});
