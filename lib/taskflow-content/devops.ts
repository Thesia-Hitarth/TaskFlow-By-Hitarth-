import { TaskflowContent } from "./types";

export const devopsTaskflow: TaskflowContent = {
  slug: "devops",
  title: "DevOps",
  nodes: [
    // 1. Operating Systems
    {
      id: "os",
      kind: "milestone",
      label: "Operating Systems",
      description: "Understand basic operating system concepts, process execution cycles, virtual memory architectures, and Linux networking baselines. Strong OS knowledge is required to run and debug production deployments.",
      position: { x: 60, y: 0 }
    },
    {
      id: "os-linux",
      kind: "subtopic",
      parentId: "os",
      label: "Linux Basics",
      description: "Linux is the standard operating system for hosting cloud applications. Master terminal command layouts, user privileges settings (chmod, chown), file system descriptors, and standard bash configuration scripts.",
      links: [{ title: "Linux Foundation Docs", url: "https://www.linuxfoundation.org/" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "os-process",
      kind: "subtopic",
      parentId: "os",
      label: "Process Management",
      description: "Process management tracks program execution threads in memory. Learn process scheduling states, listing active tasks (ps, top), sending signaling flags, and managing background jobs configurations.",
      links: [{ title: "Linux Process Guide", url: "https://tldp.org/LDP/lpg/" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "os-net",
      kind: "subtopic",
      parentId: "os",
      label: "Networking Basics",
      description: "Computer networks connect resources across routing tables. Master standard protocol loops (TCP/UDP), IP address routing boundaries, DNS name server path lookups, and host port allocations.",
      links: [{ title: "Network Troubleshooting Guide", url: "https://www.netacad.com/" }],
      position: { x: 380, y: 110 }
    },

    // 2. Version Control
    {
      id: "vcs",
      kind: "milestone",
      label: "Version Control",
      description: "Manage repository files histories, configure branching permissions, and coordinate teammates code integrations using version control tools.",
      position: { x: 60, y: 220 }
    },
    {
      id: "vcs-git",
      kind: "subtopic",
      parentId: "vcs",
      label: "Git",
      description: "Git is the industry-standard version control tool. Master staging loops (add, commit), branching states checks, merging codes paths, rebasing commits, and resolving merge conflicts.",
      links: [{ title: "Git Docs", url: "https://git-scm.com/doc" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "vcs-trunk",
      kind: "subtopic",
      parentId: "vcs",
      label: "Trunk-Based Development",
      description: "Trunk-Based Development encourages merging small changes frequently into a primary branch. This practice mitigates large code divergence lags and avoids long, painful merge conflict resolutions.",
      links: [{ title: "Trunk Based Development Guide", url: "https://trunkbaseddevelopment.com/" }],
      position: { x: 380, y: 275 }
    },

    // 3. Scripting
    {
      id: "scripting",
      kind: "milestone",
      label: "Scripting",
      description: "Automate server maintenance, backup processes, system configurations, and alert triggers using shell scripts and programming tools.",
      position: { x: 60, y: 440 }
    },
    {
      id: "script-bash",
      kind: "subtopic",
      parentId: "scripting",
      label: "Bash",
      description: "Bash scripts coordinate native OS terminal commands. Learn script logic loops, variables assignments, capturing command execution responses, and parsing file streams.",
      links: [{ title: "GNU Bash manual", url: "https://www.gnu.org/software/bash/manual/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "script-python",
      kind: "subtopic",
      parentId: "scripting",
      label: "Python",
      description: "Python compiles complex automated scripts easily. Master variables scopes, file IO parameters, HTTP requests queries, JSON parsing libraries, and scripting network APIs configurations.",
      links: [{ title: "Python Documentation", url: "https://docs.python.org/3/" }],
      position: { x: 380, y: 495 }
    },

    // 4. CI/CD
    {
      id: "cicd",
      kind: "milestone",
      label: "CI/CD",
      description: "Build, verify, test, and release application packages automatically upon repository update events. Continuous automation prevents regression bugs from reaching production networks.",
      position: { x: 60, y: 660 }
    },
    {
      id: "cicd-gha",
      kind: "subtopic",
      parentId: "cicd",
      label: "GitHub Actions",
      description: "GitHub Actions integrates automation triggers natively with repositories. Master writing YAML configurations, managing workflow triggers, caching dependencies, and deploying images to cloud servers.",
      links: [{ title: "GitHub Actions docs", url: "https://docs.github.com/en/actions" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "cicd-jenkins",
      kind: "subtopic",
      parentId: "cicd",
      label: "Jenkins",
      description: "Jenkins is a highly customizable extensible automation server. Study writing declarative Jenkinsfiles, managing master/slave node configurations, and scripting custom plugin pipelines.",
      links: [{ title: "Jenkins Website", url: "https://www.jenkins.io/" }],
      position: { x: 380, y: 715 }
    },

    // 5. Containers
    {
      id: "containers",
      kind: "milestone",
      label: "Containers",
      description: "Encapsulate codebase files and environmental dependencies into runtime packages that execute identically across any hardware node.",
      position: { x: 60, y: 880 }
    },
    {
      id: "cont-docker",
      kind: "subtopic",
      parentId: "containers",
      label: "Docker",
      description: "Docker isolates development environments using container layers. Learn writing Dockerfiles instructions (FROM, COPY, RUN, CMD), layer caching, configuring networks, and managing volumes.",
      links: [{ title: "Docker Docs", url: "https://docs.docker.com/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "cont-registries",
      kind: "subtopic",
      parentId: "containers",
      label: "Container Registries",
      description: "Registries host and distribute image packages. Learn uploading images to Docker Hub or AWS ECR, managing tags, configuring private repositories access, and automated image builds.",
      links: [{ title: "Docker Hub Website", url: "https://hub.docker.com/" }],
      position: { x: 380, y: 935 }
    },

    // 6. Orchestration
    {
      id: "orchestration",
      kind: "milestone",
      label: "Orchestration",
      description: "Manage container clusters scaling configurations, coordinate load distribution routes, and trace node failures automatically.",
      position: { x: 60, y: 1100 }
    },
    {
      id: "orch-k8s",
      kind: "subtopic",
      parentId: "orchestration",
      label: "Kubernetes",
      description: "Kubernetes automates container orchestration across host clusters. Study pod scheduling, configuring services, ingress network rules, secret parameters configurations, and auditing cluster logs.",
      links: [{ title: "Kubernetes Website", url: "https://kubernetes.io/" }],
      position: { x: 380, y: 1100 }
    },
    {
      id: "orch-helm",
      kind: "subtopic",
      parentId: "orchestration",
      label: "Helm",
      description: "Helm is the package manager for Kubernetes. Master Helm chart layouts, value overrides file parameters, release installations, upgrading stacks, and rolling back release states.",
      links: [{ title: "Helm Website", url: "https://helm.sh/" }],
      position: { x: 380, y: 1155 }
    },

    // 7. Infrastructure as Code
    {
      id: "iac",
      kind: "milestone",
      label: "Infrastructure as Code",
      description: "Declare server layouts and networks properties using version-controlled code files to automate provisioning tasks.",
      position: { x: 60, y: 1320 }
    },
    {
      id: "iac-terraform",
      kind: "subtopic",
      parentId: "iac",
      label: "Terraform",
      description: "Terraform provisions cloud infrastructure using declarative configuration files. Study HCL variables mapping, state tracking directories, module compositions, planning steps, and apply runs.",
      links: [{ title: "Terraform Website", url: "https://www.terraform.io/" }],
      position: { x: 380, y: 1320 }
    },
    {
      id: "iac-ansible",
      kind: "subtopic",
      parentId: "iac",
      label: "Ansible",
      description: "Ansible manages remote configurations agentlessly using YAML playbooks. Study writing playbook tasks, configuring host inventories lists, using variables, and executing playbooks.",
      links: [{ title: "Ansible Website", url: "https://www.ansible.com/" }],
      position: { x: 380, y: 1375 }
    },

    // 8. Monitoring
    {
      id: "monitoring",
      kind: "milestone",
      label: "Monitoring",
      description: "Track system health metrics, analyze log outputs, and trigger alerts threshold to protect system uptime guarantees.",
      position: { x: 60, y: 1540 }
    },
    {
      id: "mon-prometheus",
      kind: "subtopic",
      parentId: "monitoring",
      label: "Prometheus",
      description: "Prometheus gathers telemetry metrics data inside time-series databases. Study query expressions configuration (PromQL), setting scrape rules, and configuring alert thresholds.",
      links: [{ title: "Prometheus Website", url: "https://prometheus.io/" }],
      position: { x: 380, y: 1540 }
    },
    {
      id: "mon-grafana",
      kind: "subtopic",
      parentId: "monitoring",
      label: "Grafana",
      description: "Grafana visualizes system metric databases. Learn configuring data resource queries, mapping charts grids, managing dashboards panels, and configuring custom alerts integrations.",
      links: [{ title: "Grafana Website", url: "https://grafana.com/" }],
      position: { x: 380, y: 1595 }
    }
  ],
  edges: [
    { id: "e-os-vcs", source: "os", target: "vcs" },
    { id: "e-vcs-script", source: "vcs", target: "scripting" },
    { id: "e-script-cicd", source: "scripting", target: "cicd" },
    { id: "e-cicd-cont", source: "cicd", target: "containers" },
    { id: "e-cont-orch", source: "containers", target: "orchestration" },
    { id: "e-orch-iac", source: "orchestration", target: "iac" },
    { id: "e-iac-mon", source: "iac", target: "monitoring" }
  ]
};
