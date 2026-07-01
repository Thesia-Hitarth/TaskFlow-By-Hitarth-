// components/onboarding/WelcomeTour.tsx
"use client"

import { useState, useEffect } from "react"
import { Joyride, STATUS, Step, EventData } from "react-joyride"
import { markTourSeen } from "@/lib/actions/onboarding"

const TOUR_STEPS: Step[] = [
  {
    target: '[data-tour="roadmap-node"]',
    content: "This is your learning path. Click any topic card to see resources, guides, and track your progress.",
    skipBeacon: true,
  },
  {
    target: '[data-tour="status-buttons"]',
    content: "Mark topics as done, in progress, or skip them to structure your study workflow.",
  },
  {
    target: '[data-tour="related-guides"]',
    content: "Access in-depth articles and tutorials related to the topic directly on TaskFlow.",
  },
  {
    target: '[data-tour="compare-link"]',
    content: "Not sure which path to follow? Compare multiple paths side-by-side anytime.",
  },
]

export function WelcomeTour({ hasSeenTour }: { hasSeenTour: boolean }) {
  const [run, setRun] = useState(false)

  useEffect(() => {
    // Small delay so the tour starts after the roadmap canvas is fully rendered
    const isLocalSeen = typeof window !== "undefined" && localStorage.getItem("taskflow_tour_seen") === "true"
    if (!hasSeenTour && !isLocalSeen) {
      const timer = setTimeout(() => setRun(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [hasSeenTour])

  const handleCallback = (data: EventData) => {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      setRun(false)
      if (typeof window !== "undefined") {
        localStorage.setItem("taskflow_tour_seen", "true")
      }
      markTourSeen() // fire-and-forget server action if authenticated
    }
  }

  if (hasSeenTour) return null

  return (
    <Joyride
      steps={TOUR_STEPS}
      run={run}
      continuous
      onEvent={handleCallback}
      options={{
        buttons: ["back", "close", "primary", "skip"],
        showProgress: true,
        primaryColor: "#d97706",
        backgroundColor: "var(--color-surface, #ffffff)",
        textColor: "var(--color-text-primary, #0f172a)",
        zIndex: 10000,
      }}
      styles={{
        tooltipContainer: {
          textAlign: "left",
          fontFamily: "inherit",
          borderRadius: "16px",
          padding: "8px",
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          border: "1px solid var(--color-border, #e2e8f0)",
        },
        buttonPrimary: {
          backgroundColor: "#d97706",
          color: "#000000",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "12px",
          outline: "none",
        },
        buttonBack: {
          color: "var(--color-text-secondary, #64748b)",
          fontWeight: "bold",
          fontSize: "12px",
          marginRight: "10px",
        },
        buttonSkip: {
          color: "var(--color-text-secondary, #64748b)",
          fontWeight: "bold",
          fontSize: "12px",
        }
      }}
    />
  )
}
