import { TaskflowContent } from "./types";

export const mlopsTaskflow: TaskflowContent = {
  slug: "mlops",
  title: "MLOps",
  nodes: [
    // 1. Foundations
    {
      id: "mlops-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Establish foundational skills in software engineering, ML lifecycles, and version control. MLOps developers automate model lifecycle pipelines, requiring dynamic scripting and git collaboration.",
      position: { x: 60, y: 0 }
    },
    {
      id: "mlops-python",
      kind: "subtopic",
      parentId: "mlops-foundations",
      label: "Python",
      description: "Python is the core scripting language of machine learning infrastructure. Study dynamic scripting, package packaging pipelines, virtual environments isolation, and data analysis packages (NumPy, Pandas).",
      links: [{ title: "Python Documentation", url: "https://docs.python.org/3/" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "mlops-lifecycle",
      kind: "subtopic",
      parentId: "mlops-foundations",
      label: "ML Lifecycle",
      description: "The machine learning lifecycle tracks model versions from design to feedback loops. Learn validation dataset design, hyperparameter optimization steps, feature creation, and data compliance standards.",
      links: [{ title: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "mlops-git",
      kind: "subtopic",
      parentId: "mlops-foundations",
      label: "Git",
      description: "Git tracks model definitions and code base repository histories. Learn branch collaboration, pull request flows, code reviews, and resolving conflicts to build collaborative setups.",
      links: [{ title: "Git Documentation", url: "https://git-scm.com/doc" }],
      position: { x: 380, y: 110 }
    },

    // 2. Experiment Tracking
    {
      id: "mlops-experiment-tracking",
      kind: "milestone",
      label: "Experiment Tracking",
      description: "Track hyperparameter parameters, monitor training iterations, and organize model registries. Keeping detailed records allows teams to replicate model weights and trace regressions.",
      position: { x: 60, y: 220 }
    },
    {
      id: "mlops-mlflow",
      kind: "subtopic",
      parentId: "mlops-experiment-tracking",
      label: "MLflow",
      description: "MLflow manages experiments logs and model packaging configurations. Master logging hyperparameter inputs, tracking metric parameters, registering models, and serving artifact bundles.",
      links: [{ title: "MLflow Documentation", url: "https://mlflow.org/docs/latest/index.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "mlops-wandb",
      kind: "subtopic",
      parentId: "mlops-experiment-tracking",
      label: "Weights & Biases",
      description: "Weights & Biases visualizes training runs and aggregates metrics dashboards. Learn to log neural gradients, compare training parameters, generate visualizations, and version assets.",
      links: [{ title: "Weights & Biases Docs", url: "https://docs.wandb.ai/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "mlops-dvc",
      kind: "subtopic",
      parentId: "mlops-experiment-tracking",
      label: "DVC",
      description: "Data Version Control (DVC) versions datasets and model binaries. Master hash index mappings, caching large datasets, tracking storage repositories (S3, GCP), and orchestrating data runs.",
      links: [{ title: "DVC Documentation", url: "https://dvc.org/doc" }],
      position: { x: 380, y: 330 }
    },

    // 3. Pipelines
    {
      id: "mlops-pipelines",
      kind: "milestone",
      label: "Pipelines",
      description: "Orchestrate complex data workflows and run training schedules automatically. Pipelines chain data ingestion, pre-processing, training, and registry updates systematically.",
      position: { x: 60, y: 440 }
    },
    {
      id: "mlops-airflow",
      kind: "subtopic",
      parentId: "mlops-pipelines",
      label: "Airflow",
      description: "Apache Airflow schedules complex data workflows using Directed Acyclic Graphs (DAGs). Learn task relations mapping, scheduling options, tracking task logs, and configuring worker task managers.",
      links: [{ title: "Apache Airflow Docs", url: "https://airflow.apache.org/docs/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "mlops-kubeflow",
      kind: "subtopic",
      parentId: "mlops-pipelines",
      label: "Kubeflow",
      description: "Kubeflow orchestrates containerized machine learning pipelines on top of Kubernetes. Master designing pipeline tasks, managing storage mounts, and tracking execution runs metrics.",
      links: [{ title: "Kubeflow Documentation", url: "https://www.kubeflow.org/docs/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "mlops-feature-stores",
      kind: "subtopic",
      parentId: "mlops-pipelines",
      label: "Feature Stores",
      description: "Feature stores distribute features consistently across training and real-time inference layers. Study feature ingestion, low-latency key lookups, and tracking features definitions using Feast.",
      links: [{ title: "Feast Feature Store", url: "https://docs.feast.dev/" }],
      position: { x: 380, y: 550 }
    },

    // 4. Deployment
    {
      id: "mlops-deployment",
      kind: "milestone",
      label: "Deployment",
      description: "Host model prediction endpoints and manage container scaling configurations. Serving models reliably ensures client apps fetch predictions with low latencies.",
      position: { x: 60, y: 660 }
    },
    {
      id: "mlops-docker",
      kind: "subtopic",
      parentId: "mlops-deployment",
      label: "Docker",
      description: "Docker packages training runtimes and web dependencies into container packages. Master multi-stage Dockerfiles writing, port configuration, container volumes, and Compose setups.",
      links: [{ title: "Docker Docs", url: "https://docs.docker.com/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "mlops-kubernetes",
      kind: "subtopic",
      parentId: "mlops-deployment",
      label: "Kubernetes",
      description: "Kubernetes automates container operations. Learn pod scheduling, configuring ingress endpoints, managing scaling policies, distributing secret variables, and auditing cluster logs.",
      links: [{ title: "Kubernetes Documentation", url: "https://kubernetes.io/docs/home/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "mlops-model-serving",
      kind: "subtopic",
      parentId: "mlops-deployment",
      label: "Model Serving",
      description: "Model serving platforms expose model predictions via endpoints. Study inference systems (Triton, Seldon, FastAPI), load optimization, batch requests, and scaling predictions.",
      links: [{ title: "Triton Inference Server", url: "https://github.com/triton-inference-server/server" }],
      position: { x: 380, y: 770 }
    },

    // 5. Monitoring
    {
      id: "mlops-monitoring",
      kind: "milestone",
      label: "Monitoring",
      description: "Track endpoint metrics, log system bugs, and identify shifts in model output accuracy. Monitoring systems keep data quality high after model release.",
      position: { x: 60, y: 880 }
    },
    {
      id: "mlops-drift-detection",
      kind: "subtopic",
      parentId: "mlops-monitoring",
      label: "Model Drift Detection",
      description: "Model drift degrades prediction accuracy as real-world distributions shift. Learn data drift verification, tracking concept shifts, logging input metrics, and setting alert triggers.",
      links: [{ title: "Evidently AI Docs", url: "https://docs.evidentlyai.com/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "mlops-prometheus",
      kind: "subtopic",
      parentId: "mlops-monitoring",
      label: "Prometheus",
      description: "Prometheus collects container system metrics. Master data scraping, configuring alert metrics rules, monitoring latency metrics, and building Grafana analytics dashboard grids.",
      links: [{ title: "Prometheus Documentation", url: "https://prometheus.io/docs/introduction/overview/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "mlops-logging",
      kind: "subtopic",
      parentId: "mlops-monitoring",
      label: "Logging",
      description: "Logging aggregates execution traces to debug runtime failures. Study log rotation settings, log aggregation formats, trace correlation, and handling debug outputs safely.",
      links: [{ title: "Python Logging Library", url: "https://docs.python.org/3/library/logging.html" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-mlops-foundations-mlops-experiment-tracking", source: "mlops-foundations", target: "mlops-experiment-tracking" },
    { id: "e-mlops-experiment-tracking-mlops-pipelines", source: "mlops-experiment-tracking", target: "mlops-pipelines" },
    { id: "e-mlops-pipelines-mlops-deployment", source: "mlops-pipelines", target: "mlops-deployment" },
    { id: "e-mlops-deployment-mlops-monitoring", source: "mlops-deployment", target: "mlops-monitoring" }
  ]
};
