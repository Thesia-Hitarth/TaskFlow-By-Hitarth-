// lib/exercises/useTestRunner.ts
"use client"

import { useState, useCallback, useRef } from "react"

export interface TestCase {
  description: string
  args: unknown[]
  expected: unknown
  hidden?: boolean
  runSnippet?: string
}

export interface TestResult {
  passed: boolean
  description: string
  expected: unknown
  actual: unknown
  args: unknown[]
  error?: string
}

export interface RunResult {
  success: boolean
  results?: TestResult[]
  globalError?: string
}

const TIMEOUT_MS = 5000 // kill runaway code (infinite loops) after 5 seconds

export function useTestRunner() {
  const [isRunning, setIsRunning] = useState(false)
  const [lastResult, setLastResult] = useState<RunResult | null>(null)
  const workerRef = useRef<Worker | null>(null)

  const runTests = useCallback((userCode: string, testCases: TestCase[], functionName: string) => {
    return new Promise<RunResult>(async (resolve) => {
      setIsRunning(true)
      setLastResult(null)

      let worker: Worker
      let objectUrl: string | null = null

      try {
        const response = await fetch("/workers/js-test-runner.worker.js")
        if (!response.ok) throw new Error("Worker file fetch failed")
        const code = await response.text()
        const blob = new Blob([code], { type: "application/javascript" })
        objectUrl = URL.createObjectURL(blob)
        worker = new Worker(objectUrl)
      } catch (err) {
        console.warn("Falling back to absolute worker path:", err)
        worker = new Worker(new URL("/workers/js-test-runner.worker.js", window.location.origin))
      }

      workerRef.current = worker

      const cleanup = () => {
        worker.terminate()
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl)
        }
      }

      const timeoutId = setTimeout(() => {
        cleanup()
        const timeoutResult: RunResult = {
          success: false,
          globalError: "Your code took too long to run. Check for infinite loops.",
        }
        setLastResult(timeoutResult)
        setIsRunning(false)
        resolve(timeoutResult)
      }, TIMEOUT_MS)

      worker.onmessage = (event) => {
        clearTimeout(timeoutId)
        cleanup()
        const result: RunResult = event.data
        setLastResult(result)
        setIsRunning(false)
        resolve(result)
      }

      worker.onerror = () => {
        clearTimeout(timeoutId)
        cleanup()
        const errorResult: RunResult = {
          success: false,
          globalError: "Something went wrong running your code.",
        }
        setLastResult(errorResult)
        setIsRunning(false)
        resolve(errorResult)
      }

      worker.postMessage({ userCode, testCases, functionName })
    })
  }, [])

  return { runTests, isRunning, lastResult }
}
