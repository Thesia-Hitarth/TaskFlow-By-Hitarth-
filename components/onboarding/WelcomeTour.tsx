// components/onboarding/WelcomeTour.tsx
"use client"

import { useState, useEffect } from "react"
import Joyride, { STATUS, Step, EventData, ACTIONS, EVENTS } from "react-joyride"
import { markTourSeen } from "@/lib/actions/onboarding"

const TOUR_STEPS: Step[] = [
  {
    target: '[data-tour="roadmap-node"]',
    content: "This is your learning path. Click any topic card to see resources, guides, and track your progress.",
    skipBeacon: true,
    disableBeacon: true,
  },
  {
    target: '[data-tour="status-buttons"]',
    content: "Mark topics as done, in progress, or skip them to structure your study workflow.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="related-guides"]',
    content: "Access in-depth articles and tutorials related to the topic directly on TaskFlow.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="compare-link"]',
    content: "Not sure which path to follow? Compare multiple paths side-by-side anytime.",
    disableBeacon: true,
  },
]

export function WelcomeTour({ hasSeenTour }: { hasSeenTour: boolean }) {
  const [run, setRun] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const isLocalSeen = typeof window !== "undefined" && localStorage.getItem("taskflow_tour_seen") === "true"
    if (!hasSeenTour && !isLocalSeen) {
      const timer = setTimeout(() => setRun(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [hasSeenTour])

  const handleCallback = (data: EventData) => {
    const { action, index, status, type } = data

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false)
      if (typeof window !== "undefined") {
        localStorage.setItem("taskflow_tour_seen", "true")
      }
      markTourSeen() // fire-and-forget server action if authenticated
      return
    }

    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      if (action === ACTIONS.NEXT) {
        if (index === 0) {
          // Pointing to node on canvas -> Transition to details inside sheet
          // Programmatically click the first node to open the Sheet
          const firstNode = document.querySelector('[data-tour="roadmap-node"]') as HTMLElement
          if (firstNode) {
            firstNode.click()
            setRun(false)
            setTimeout(() => {
              setStepIndex(1)
              setRun(true)
            }, 600) // Delay to let Sheet open transition finish
          } else {
            setStepIndex(1)
          }
        } else if (index === 1) {
          setStepIndex(2)
        } else if (index === 2) {
          // Transitioning to compare link -> Programmatically close the sheet so compare link is fully visible
          const closeBtn = document.querySelector('[aria-label="Close panel"]') as HTMLElement
          if (closeBtn) {
            closeBtn.click()
            setRun(false)
            setTimeout(() => {
              setStepIndex(3)
              setRun(true)
            }, 450)
          } else {
            setStepIndex(3)
          }
        }
      } else if (action === ACTIONS.PREV) {
        if (index === 1) {
          // Going back from Step 2 to Step 1 -> Close the sheet
          const closeBtn = document.querySelector('[aria-label="Close panel"]') as HTMLElement
          if (closeBtn) {
            closeBtn.click()
            setRun(false)
            setTimeout(() => {
              setStepIndex(0)
              setRun(true)
            }, 450)
          } else {
            setStepIndex(0)
          }
        } else if (index === 2) {
          setStepIndex(1)
        } else if (index === 3) {
          // Going back from Step 4 (Compare) to Step 3 (Guides) -> Re-open the sheet
          const firstNode = document.querySelector('[data-tour="roadmap-node"]') as HTMLElement
          if (firstNode) {
            firstNode.click()
            setRun(false)
            setTimeout(() => {
              setStepIndex(2)
              setRun(true)
            }, 600)
          } else {
            setStepIndex(2)
          }
        }
      }
    }
  }

  if (hasSeenTour) return null

  return (
    <Joyride
      steps={TOUR_STEPS}
      run={run}
      stepIndex={stepIndex}
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
