import { describe, it, expect } from "vitest";
import { computeOverlap } from "../computeOverlap";

describe("computeOverlap", () => {
  it("should calculate overlap of roadmaps", () => {
    // Tests overlapping roadmaps
    const result = computeOverlap("frontend", "backend");
    expect(result).toHaveProperty("overlapPercentage");
    expect(result).toHaveProperty("sharedTopics");
    expect(result).toHaveProperty("uniqueToA");
    expect(result).toHaveProperty("uniqueToB");
    expect(typeof result.overlapPercentage).toBe("number");
    expect(result.overlapPercentage).toBeGreaterThanOrEqual(0);
    expect(result.overlapPercentage).toBeLessThanOrEqual(100);
  });

  it("should handle non-existent roadmaps gracefully", () => {
    const result = computeOverlap("fake-path-a", "fake-path-b");
    expect(result.overlapPercentage).toBe(0);
    expect(result.sharedTopics.length).toBe(0);
  });
});
