import type { ProjectChallenge } from "@/lib/projects/types"

export const weatherApp: ProjectChallenge = {
  id: "weather-app",
  title: "Weather App",
  roadmapId: "javascript",
  difficulty: "intermediate",
  estimatedTime: "4-8 hours",
  description: `
Build a weather app that lets a user search for any city and see the 
current weather conditions. This project combines DOM manipulation, 
fetch requests, async/await, and basic error handling — skills that 
appear in almost every real frontend job.
  `,
  mustHaveRequirements: [
    "A search input where the user types a city name",
    "On submit, fetch current weather data from a public weather API (e.g. OpenWeatherMap, free tier)",
    "Display temperature, weather condition, and an icon representing the condition",
    "Show a clear error message if the city isn't found or the request fails",
    "Show a loading state while the request is in flight",
  ],
  stretchGoals: [
    "Add a 5-day forecast",
    "Remember the last searched city using localStorage",
    "Add a toggle for Celsius/Fahrenheit",
    "Add a subtle background change based on weather condition (sunny, rainy, etc.)",
  ],
  suggestedTechStack: ["HTML", "CSS", "Vanilla JavaScript", "Fetch API"],
  hints: [
    "Start by getting a free API key from OpenWeatherMap before writing any code.",
    "Build the static HTML/CSS layout first with hardcoded fake data, THEN wire up the real API call. Don't try to do both at once.",
    "Wrap your fetch call in try/catch so a bad city name doesn't crash the whole page.",
  ],
}
