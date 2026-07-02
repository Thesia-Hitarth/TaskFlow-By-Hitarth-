// lib/analytics/events.ts
// This is a client-side module — only call from "use client" components
import { track } from "@vercel/analytics";

export const Analytics = {
  // Roadmap interactions
  nodeOpened: (roadmapId: string, nodeId: string) => {
    try {
      track("node_opened", { roadmapId, nodeId });
    } catch (e) {
      console.warn("Analytics.nodeOpened failed", e);
    }
  },

  nodeStatusChanged: (roadmapId: string, nodeId: string, status: string) => {
    try {
      track("node_status_changed", { roadmapId, nodeId, status });
    } catch (e) {
      console.warn("Analytics.nodeStatusChanged failed", e);
    }
  },

  roadmapViewed: (roadmapId: string) => {
    try {
      track("roadmap_viewed", { roadmapId });
    } catch (e) {
      console.warn("Analytics.roadmapViewed failed", e);
    }
  },

  // Guide interactions
  guideViewed: (slug: string, difficulty: string) => {
    try {
      track("guide_viewed", { slug, difficulty });
    } catch (e) {
      console.warn("Analytics.guideViewed failed", e);
    }
  },

  guideCompleted: (slug: string) => {
    try {
      track("guide_completed", { slug });
    } catch (e) {
      console.warn("Analytics.guideCompleted failed", e);
    }
  },

  // Onboarding
  quizStarted: () => {
    try {
      track("quiz_started");
    } catch (e) {
      console.warn("Analytics.quizStarted failed", e);
    }
  },

  quizCompleted: (primaryRoadmapId: string, timeCommitment: string) => {
    try {
      track("quiz_completed", { primaryRoadmapId, timeCommitment });
    } catch (e) {
      console.warn("Analytics.quizCompleted failed", e);
    }
  },

  // Compare tool
  compareViewed: (roadmapA: string, roadmapB: string) => {
    try {
      track("compare_viewed", { roadmapA, roadmapB });
    } catch (e) {
      console.warn("Analytics.compareViewed failed", e);
    }
  },

  // Showcase
  projectSubmitted: (projectId: string) => {
    try {
      track("project_submitted", { projectId });
    } catch (e) {
      console.warn("Analytics.projectSubmitted failed", e);
    }
  },

  projectUpvoted: (projectId: string) => {
    try {
      track("project_upvoted", { projectId });
    } catch (e) {
      console.warn("Analytics.projectUpvoted failed", e);
    }
  },

  // Auth
  signUpStarted: (provider: string) => {
    try {
      track("sign_up_started", { provider });
    } catch (e) {
      console.warn("Analytics.signUpStarted failed", e);
    }
  },

  signInCompleted: (provider: string) => {
    try {
      track("sign_in_completed", { provider });
    } catch (e) {
      console.warn("Analytics.signInCompleted failed", e);
    }
  },

  // Email
  emailSubscribed: (source: string) => {
    try {
      track("email_subscribed", { source });
    } catch (e) {
      console.warn("Analytics.emailSubscribed failed", e);
    }
  },
};
