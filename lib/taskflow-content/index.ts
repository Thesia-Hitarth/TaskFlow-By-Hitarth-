import { TaskflowContent } from "./types";
import { frontendTaskflow } from "./frontend";
import { backendTaskflow } from "./backend";
import { devopsTaskflow } from "./devops";
import { fullStackTaskflow } from "./full-stack";
import { aiEngineerTaskflow } from "./ai-engineer";
import { androidTaskflow } from "./android";
import { iosTaskflow } from "./ios";
import { devrelTaskflow } from "./devrel";
import { cyberSecurityTaskflow } from "./cyber-security";
import { qaTaskflow } from "./qa";
import { mlopsTaskflow } from "./mlops";
import { dataAnalystTaskflow } from "./data-analyst";
import { networkEngineerTaskflow } from "./network-engineer";
import { javascriptTaskflow } from "./javascript";
import { typescriptTaskflow } from "./typescript";
import { reactTaskflow } from "./react";
import { nodejsTaskflow } from "./nodejs";
import { pythonTaskflow } from "./python";
import { sqlTaskflow } from "./sql";
import { dockerTaskflow } from "./docker";
import { kubernetesTaskflow } from "./kubernetes";
import { gitGithubTaskflow } from "./git-github";
import { linuxTaskflow } from "./linux";
import { awsTaskflow } from "./aws";
import { systemDesignTaskflow } from "./system-design";
import { computerScienceTaskflow } from "./computer-science";
import { nextjsTaskflow } from "./nextjs";
import { vueTaskflow } from "./vue";
import { rustTaskflow } from "./rust";
import { golangTaskflow } from "./golang";
import { javaTaskflow } from "./java";
import { cppTaskflow } from "./cpp";

export const taskflowContent: Record<string, TaskflowContent> = {
  frontend: frontendTaskflow,
  backend: backendTaskflow,
  devops: devopsTaskflow,
  "full-stack": fullStackTaskflow,
  "ai-engineer": aiEngineerTaskflow,
  android: androidTaskflow,
  ios: iosTaskflow,
  devrel: devrelTaskflow,
  "cyber-security": cyberSecurityTaskflow,
  qa: qaTaskflow,
  mlops: mlopsTaskflow,
  "data-analyst": dataAnalystTaskflow,
  "network-engineer": networkEngineerTaskflow,
  javascript: javascriptTaskflow,
  typescript: typescriptTaskflow,
  react: reactTaskflow,
  nodejs: nodejsTaskflow,
  python: pythonTaskflow,
  sql: sqlTaskflow,
  docker: dockerTaskflow,
  kubernetes: kubernetesTaskflow,
  "git-github": gitGithubTaskflow,
  linux: linuxTaskflow,
  aws: awsTaskflow,
  "system-design": systemDesignTaskflow,
  "computer-science": computerScienceTaskflow,
  nextjs: nextjsTaskflow,
  vue: vueTaskflow,
  rust: rustTaskflow,
  golang: golangTaskflow,
  java: javaTaskflow,
  cpp: cppTaskflow,
};
