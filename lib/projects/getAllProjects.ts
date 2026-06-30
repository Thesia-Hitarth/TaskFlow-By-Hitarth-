// lib/projects/getAllProjects.ts
import { tributePage } from "@/content/projects/tribute-page"
import { surveyForm } from "@/content/projects/survey-form"
import { calculator } from "@/content/projects/calculator"
import { todoList } from "@/content/projects/todo-list"
import { weatherApp } from "@/content/projects/weather-app"

import type { ProjectChallenge } from "./types"

const ALL_PROJECTS: ProjectChallenge[] = [
  tributePage,
  surveyForm,
  calculator,
  todoList,
  weatherApp,
]

export function getAllProjects(): ProjectChallenge[] {
  return ALL_PROJECTS
}

export function getProjectById(id: string): ProjectChallenge | null {
  return ALL_PROJECTS.find(p => p.id === id) ?? null
}

export function getProjectsForRoadmap(roadmapId: string): ProjectChallenge[] {
  return ALL_PROJECTS.filter(p => p.roadmapId === roadmapId)
}
