// lib/exercises/getAllExercises.ts
import { sumEvenNumbers } from "@/content/exercises/sum-even-numbers"
import { reverseString } from "@/content/exercises/reverse-string"
import { findLargest } from "@/content/exercises/find-largest"
import { countVowels } from "@/content/exercises/count-vowels"
import { palindromeCheck } from "@/content/exercises/palindrome-check"
import { fizzBuzz } from "@/content/exercises/fizzbuzz"
import { removeDuplicates } from "@/content/exercises/remove-duplicates"
import { flattenArray } from "@/content/exercises/flatten-array"
import { debounce } from "@/content/exercises/debounce"
import { deepClone } from "@/content/exercises/deep-clone"

import { centerDiv } from "@/content/exercises/center-div"
import { responsiveNavbar } from "@/content/exercises/responsive-navbar"
import { cardGrid } from "@/content/exercises/card-grid"
import { pricingTable } from "@/content/exercises/pricing-table"
import { modalDialog } from "@/content/exercises/modal-dialog"

import type { Exercise } from "./types"

const ALL_EXERCISES: Exercise[] = [
  sumEvenNumbers,
  reverseString,
  findLargest,
  countVowels,
  palindromeCheck,
  fizzBuzz,
  removeDuplicates,
  flattenArray,
  debounce,
  deepClone,

  centerDiv,
  responsiveNavbar,
  cardGrid,
  pricingTable,
  modalDialog,
]

export function getExerciseById(id: string): Exercise | null {
  return ALL_EXERCISES.find(e => e.id === id) ?? null
}

export function getExercisesForNode(roadmapId: string, nodeId: string): Exercise[] {
  return ALL_EXERCISES.filter(
    e => e.relatedRoadmapNode?.roadmapId === roadmapId && e.relatedRoadmapNode?.nodeId === nodeId
  )
}
