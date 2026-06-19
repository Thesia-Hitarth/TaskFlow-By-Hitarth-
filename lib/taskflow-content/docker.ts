import { TaskflowContent } from "./types";

export const dockerTaskflow: TaskflowContent = {
  slug: "docker",
  title: "Docker",
  nodes: [
    // 1. Basics
    {
      id: "docker-basics",
      kind: "milestone",
      label: "Basics",
      description: "Learn containerization concepts, configure Dockerfiles templates, and execute CLI commands. Container isolation keeps development environments identical across all machines.",
      position: { x: 60, y: 0 }
    },
    {
      id: "docker-images-containers",
      kind: "subtopic",
      parentId: "docker-basics",
      label: "Images & Containers",
      description: "Images act as read-only blueprints while containers run writeable instances. Master difference between static image templates, container runtime layers, copy-on-write mechanisms, and container lifecycles.",
      links: [{ title: "Docker Guides: Get Started", url: "https://docs.docker.com/get-started/docker-concepts/the-basics/" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "docker-dockerfile",
      kind: "subtopic",
      parentId: "docker-basics",
      label: "Dockerfile",
      description: "A Dockerfile compiles image layers. Study key instructions (FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, EXPOSE, ENV), layer caching, build context, and configuring working directories.",
      links: [{ title: "Dockerfile Reference Guide", url: "https://docs.docker.com/reference/dockerfile/" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "docker-cli",
      kind: "subtopic",
      parentId: "docker-basics",
      label: "Docker CLI",
      description: "The Docker CLI manages container tasks. Master essential command loops (docker build, docker run, docker exec, docker ps, docker logs, docker system prune), and port mappings.",
      links: [{ title: "Docker CLI Commands Docs", url: "https://docs.docker.com/reference/cli/docker/" }],
      position: { x: 380, y: 110 }
    },

    // 2. Networking & Storage
    {
      id: "docker-networking-storage",
      kind: "milestone",
      label: "Networking & Storage",
      description: "Configure network links between containers and persist database data across container deletions.",
      position: { x: 60, y: 220 }
    },
    {
      id: "docker-volumes",
      kind: "subtopic",
      parentId: "docker-networking-storage",
      label: "Volumes",
      description: "Volumes persist container data outside container lifecycles. Learn creating volumes, mapping paths, backup routines, sharing volumes, and managing storage drivers.",
      links: [{ title: "Docker Volumes Documentation", url: "https://docs.docker.com/storage/volumes/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "docker-bind-mounts",
      kind: "subtopic",
      parentId: "docker-networking-storage",
      label: "Bind Mounts",
      description: "Bind mounts mount host directories directly into containers. Master differences between volumes and bind mounts, configuring mounts for development code hot-reloads, and managing file permissions.",
      links: [{ title: "Docker Bind Mounts Guide", url: "https://docs.docker.com/storage/bind-mounts/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "docker-networks",
      kind: "subtopic",
      parentId: "docker-networking-storage",
      label: "Docker Networks",
      description: "Networks connect containers together. Study bridge network settings, host networking, overlay configurations, DNS name resolution in custom networks, and managing network ports.",
      links: [{ title: "Docker Network Overview", url: "https://docs.docker.com/network/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Compose
    {
      id: "docker-compose",
      kind: "milestone",
      label: "Compose",
      description: "Orchestrate multi-container applications easily using YAML files. Compose runs multi-container stacks like APIs, databases, and caches together.",
      position: { x: 60, y: 440 }
    },
    {
      id: "docker-compose-yml",
      kind: "subtopic",
      parentId: "docker-compose",
      label: "docker-compose.yml",
      description: "The Compose file defines a service stack configuration. Study yaml syntax, declaring services, configuring networks mappings, mounting volumes, and setting service dependencies (depends_on).",
      links: [{ title: "Docker Compose Specification", url: "https://docs.docker.com/compose/compose-file/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "docker-multi-container",
      kind: "subtopic",
      parentId: "docker-compose",
      label: "Multi-container Apps",
      description: "Multi-container applications connect service nodes. Learn routing database requests, structuring microservices stacks, initializing databases, and orchestration using Compose commands.",
      links: [{ title: "Docker Compose Overview", url: "https://docs.docker.com/compose/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "docker-env-variables",
      kind: "subtopic",
      parentId: "docker-compose",
      label: "Environment Variables",
      description: "Environment variables configure dynamic service values. Study loading .env file records, passing variables parameters, configuring database keys, and structuring dynamic configs.",
      links: [{ title: "Docker Compose Environment Variables", url: "https://docs.docker.com/compose/environment-variables/" }],
      position: { x: 380, y: 550 }
    },

    // 4. Optimization
    {
      id: "docker-optimization",
      kind: "milestone",
      label: "Optimization",
      description: "Shrink compiler image sizes, speed up build times, and configure cache allocations.",
      position: { x: 60, y: 660 }
    },
    {
      id: "docker-multi-stage-builds",
      kind: "subtopic",
      parentId: "docker-optimization",
      label: "Multi-stage Builds",
      description: "Multi-stage builds compile code in temporary builder stages and copy outputs to clean runtimes. Master separating build dependencies from final release images to reduce vulnerabilities.",
      links: [{ title: "Docker Multi-stage Builds Guide", url: "https://docs.docker.com/build/building/multi-stage/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "docker-image-size-reduction",
      kind: "subtopic",
      parentId: "docker-optimization",
      label: "Image Size Reduction",
      description: "Smaller images compile and deploy faster. Study using lightweight base distributions (Alpine, distroless), combining commands to reduce layers, ignoring build files (.dockerignore), and cleaning caches.",
      links: [{ title: "Docker Build Optimization Tips", url: "https://docs.docker.com/build/cache/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "docker-caching-layers",
      kind: "subtopic",
      parentId: "docker-optimization",
      label: "Caching Layers",
      description: "Docker cache speeds up image compilation. Learn to order instructions from least-frequently to most-frequently changed (copying package manifests before code), and configuring caching rules.",
      links: [{ title: "Docker Cache Allocation", url: "https://docs.docker.com/build/cache/garbage-collection/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Production
    {
      id: "docker-production",
      kind: "milestone",
      label: "Production",
      description: "Distribute image packages, write container checks, and scan for security flaws before deployment.",
      position: { x: 60, y: 880 }
    },
    {
      id: "docker-registries",
      kind: "subtopic",
      parentId: "docker-production",
      label: "Docker Registries",
      description: "Registries host and distribute image packages. Learn uploading images to Docker Hub or AWS ECR, managing tags, configuring private repositories access, and automated image builds.",
      links: [{ title: "Docker Hub Registry Docs", url: "https://docs.docker.com/docker-hub/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "docker-health-checks",
      kind: "subtopic",
      parentId: "docker-production",
      label: "Health Checks",
      description: "Container health checks verify if internal applications run correctly. Master writing HEALTHCHECK test parameters in Dockerfiles, monitoring state flags, and configuring retry limits.",
      links: [{ title: "Docker Reference: HEALTHCHECK Instruction", url: "https://docs.docker.com/reference/dockerfile/#healthcheck" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "docker-security-scanning",
      kind: "subtopic",
      parentId: "docker-production",
      label: "Security Scanning",
      description: "Security scanning identifies vulnerabilities within base packages. Study image scanning workflows using Docker Scout, running containers with non-root user permissions, and signing images.",
      links: [{ title: "Docker Scout Overview", url: "https://docs.docker.com/scout/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-docker-basics-docker-networking-storage", source: "docker-basics", target: "docker-networking-storage" },
    { id: "e-docker-networking-storage-docker-compose", source: "docker-networking-storage", target: "docker-compose" },
    { id: "e-docker-compose-docker-optimization", source: "docker-compose", target: "docker-optimization" },
    { id: "e-docker-optimization-docker-production", source: "docker-optimization", target: "docker-production" }
  ]
};
