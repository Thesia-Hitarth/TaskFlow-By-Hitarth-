import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PathFinderQuiz } from "../PathFinderQuiz";

// Mock saveQuizResult action
vi.mock("@/lib/actions/onboarding", () => ({
  saveQuizResult: vi.fn().mockResolvedValue({ success: true }),
}));

describe("PathFinderQuiz Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders progress bar and first step of quiz", () => {
    render(<PathFinderQuiz onClose={vi.fn()} isOverlay={false} />);
    expect(screen.getByText(/Step 1 of/i)).toBeInTheDocument();
  });

  it("calls onClose when the X button is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(<PathFinderQuiz onClose={handleClose} isOverlay={false} />);
    
    const closeBtn = screen.getByLabelText("Close");
    await user.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
