import { TaskflowContent } from "./types";

export const kubernetesTaskflow: TaskflowContent = {
  slug: "kubernetes",
  title: "Kubernetes",
  nodes: [
    // 1. Basics
    {
      id: "k8s-basics",
      kind: "milestone",
      label: "Basics",
      description: "Learn core components, control plane operations, and basic resource units. Kubernetes automates container orchestrations across virtual host fleets.",
      position: { x: 60, y: 0 }
    },
    {
      id: "k8s-pods",
      kind: "subtopic",
      label: "Pods",
      description: "Pods are the smallest deployable units in Kubernetes. Study pod definitions, multi-container configurations (sidecars), mapping ports, container log streams, and lifecycle event callbacks.",
      links: [{ title: "Kubernetes Pods Documentation", url: "https://kubernetes.io/docs/concepts/workloads/pods/" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "k8s-nodes",
      kind: "subtopic",
      label: "Nodes",
      description: "Nodes represent physical or virtual worker hosts within clusters. Learn worker node processes (kubelet, kube-proxy, runtime), node resources metrics, scheduling allocations, and managing node failures.",
      links: [{ title: "Kubernetes Nodes Documentation", url: "https://kubernetes.io/docs/concepts/architecture/nodes/" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "k8s-cluster-architecture",
      kind: "subtopic",
      label: "Cluster Architecture",
      description: "Cluster architecture links control plane nodes to worker hosts. Master API server operations, database logs coordination via etcd, scheduler bindings, controller managers loops, and node networking.",
      links: [{ title: "Kubernetes Architecture", url: "https://kubernetes.io/docs/concepts/architecture/" }],
      position: { x: 380, y: 110 }
    },

    // 2. Workloads
    {
      id: "k8s-workloads",
      kind: "milestone",
      label: "Workloads",
      description: "Deploy stateless or stateful applications and manage pod scale adjustments. Workload controllers supervise pod execution to prevent downtime.",
      position: { x: 60, y: 220 }
    },
    {
      id: "k8s-deployments",
      kind: "subtopic",
      label: "Deployments",
      description: "Deployments manage stateless container updates declaratively. Learn rolling updates configurations, fallback histories tracking, pod scaling limits, and target replica sets management.",
      links: [{ title: "Kubernetes Deployments Docs", url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "k8s-replicasets",
      kind: "subtopic",
      label: "ReplicaSets",
      description: "ReplicaSets guarantee a specified number of replica pods run at all times. Study pod selector filters, matching labels configurations, scaling triggers, and node scheduling rules.",
      links: [{ title: "Kubernetes ReplicaSets Docs", url: "https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "k8s-statefulsets",
      kind: "subtopic",
      label: "StatefulSets",
      description: "StatefulSets manage workloads that require persistent identities and data storage. Learn ordered deployment steps, unique network identifiers (headless services), and persistent volume template mappings.",
      links: [{ title: "Kubernetes StatefulSets Docs", url: "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Networking
    {
      id: "k8s-networking",
      kind: "milestone",
      label: "Networking",
      description: "Expose container ports, route external DNS queries, and distribute environment configuration maps securely.",
      position: { x: 60, y: 440 }
    },
    {
      id: "k8s-services",
      kind: "subtopic",
      label: "Services",
      description: "Services route network traffic to ephemeral pod IPs. Study service types (ClusterIP, NodePort, LoadBalancer), selector parameters, service DNS resolution, and endpoint configurations.",
      links: [{ title: "Kubernetes Services Docs", url: "https://kubernetes.io/docs/concepts/services-networking/service/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "k8s-ingress",
      kind: "subtopic",
      label: "Ingress",
      description: "Ingress routes external HTTP/S requests to cluster services. Learn ingress controller setups (NGINX), path rules configurations, TLS certificate installations, and SSL termination.",
      links: [{ title: "Kubernetes Ingress Docs", url: "https://kubernetes.io/docs/concepts/services-networking/ingress/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "k8s-configmaps-secrets",
      kind: "subtopic",
      label: "ConfigMaps & Secrets",
      description: "ConfigMaps and Secrets separate configurations from code templates. Learn storing config files, mounting secret folders, encoding keys in base64, and injection via environment variables.",
      links: [{ title: "Kubernetes ConfigMaps Guide", url: "https://kubernetes.io/docs/concepts/configuration/configmap/" }],
      position: { x: 380, y: 550 }
    },

    // 4. Storage
    {
      id: "k8s-storage",
      kind: "milestone",
      label: "Storage",
      description: "Bind persistent network storage partitions to applications, mapping sizes dynamically.",
      position: { x: 60, y: 660 }
    },
    {
      id: "k8s-persistent-volumes",
      kind: "subtopic",
      label: "Persistent Volumes",
      description: "Persistent Volumes (PVs) represent physical disks provisioned by cluster administrators. Learn PV configuration settings, storage capacity boundaries, access types (ReadWriteOnce, ReadWriteMany), and volume reclaim rules.",
      links: [{ title: "Kubernetes Persistent Volumes Docs", url: "https://kubernetes.io/docs/concepts/storage/persistent-volumes/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "k8s-pvc",
      kind: "subtopic",
      label: "Persistent Volume Claims",
      description: "Persistent Volume Claims (PVCs) request storage allocations from PV resources. Study PVC resource requests, access modes selectors, mapping claims to Pod specifications, and monitoring disk usage.",
      links: [{ title: "Kubernetes Storage Claims Guide", url: "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "k8s-storage-classes",
      kind: "subtopic",
      label: "Storage Classes",
      description: "Storage Classes enable dynamic provision of cloud disk storage on-demand. Master storage provisioner plugins settings, reclaim policy rules, mount configurations, and dynamic PVC bindings.",
      links: [{ title: "Kubernetes Storage Classes Guide", url: "https://kubernetes.io/docs/concepts/storage/storage-classes/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Operations
    {
      id: "k8s-operations",
      kind: "milestone",
      label: "Operations",
      description: "Package application manifests using charts, inspect cluster resources via command lines, and set up telemetry metric feeds.",
      position: { x: 60, y: 880 }
    },
    {
      id: "k8s-helm",
      kind: "subtopic",
      label: "Helm",
      description: "Helm is the package manager for Kubernetes. Master Helm chart layouts, value overrides file parameters, release installations, upgrading stacks, and rolling back release states.",
      links: [{ title: "Helm Documentation", url: "https://helm.sh/docs/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "k8s-kubectl",
      kind: "subtopic",
      label: "kubectl",
      description: "kubectl is the command line tool to control clusters. Learn command options (get, describe, logs, exec, apply, delete), formatting console outputs, and querying resource metrics.",
      links: [{ title: "kubectl Reference Manual", url: "https://kubernetes.io/docs/reference/kubectl/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "k8s-monitoring-logging",
      kind: "subtopic",
      label: "Monitoring & Logging",
      description: "Monitoring track resource bounds. Learn scraping metrics using Prometheus, building dashboards with Grafana, exporting container logs, and diagnosing system faults.",
      links: [{ title: "Kubernetes Logging Architecture", url: "https://kubernetes.io/docs/concepts/cluster-administration/logging/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-k8s-basics-k8s-workloads", source: "k8s-basics", target: "k8s-workloads" },
    { id: "e-k8s-workloads-k8s-networking", source: "k8s-workloads", target: "k8s-networking" },
    { id: "e-k8s-networking-k8s-storage", source: "k8s-networking", target: "k8s-storage" },
    { id: "e-k8s-storage-k8s-operations", source: "k8s-storage", target: "k8s-operations" }
  ]
};
