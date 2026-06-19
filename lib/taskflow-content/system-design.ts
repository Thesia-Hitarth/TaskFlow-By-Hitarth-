import { TaskflowContent } from "./types";

export const systemDesignTaskflow: TaskflowContent = {
  slug: "system-design",
  title: "System Design",
  nodes: [
    // 1. Foundations
    {
      id: "sd-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Learn scaling mechanics, latency boundaries, and distributed database theorems. Foundational design rules guide system optimizations.",
      position: { x: 60, y: 0 }
    },
    {
      id: "sd-scalability-basics",
      kind: "subtopic",
      parentId: "sd-foundations",
      label: "Scalability Basics",
      description: "Scalability models support increasing user queries. Compare vertical scaling (resizing CPU/RAM resources on single hosts) to horizontal scaling (adding host nodes behind traffic directors).",
      links: [{ title: "System Design Primer: Scalability", url: "https://github.com/donnemartin/system-design-primer#index-of-system-design-topics" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "sd-latency-throughput",
      kind: "subtopic",
      parentId: "sd-foundations",
      label: "Latency vs Throughput",
      description: "Latency measures single query durations, while throughput measures database transaction rates. Learn tracking latency percentiles (p95, p99), optimization, and network bounds.",
      links: [{ title: "System Design Primer: Latency vs Throughput", url: "https://github.com/donnemartin/system-design-primer#latency-vs-throughput" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "sd-cap-theorem",
      kind: "subtopic",
      parentId: "sd-foundations",
      label: "CAP Theorem",
      description: "The CAP Theorem states distributed databases can only guarantee two of Consistency, Availability, or Partition Tolerance. Study design trade-offs, PACELC updates, and selecting databases.",
      links: [{ title: "System Design Primer: CAP Theorem", url: "https://github.com/donnemartin/system-design-primer#cap-theorem" }],
      position: { x: 380, y: 110 }
    },

    // 2. Networking Concepts
    {
      id: "sd-networking-concepts",
      kind: "milestone",
      label: "Networking Concepts",
      description: "Distribute client traffic nodes, route domain queries, and serve static assets from global edge server nodes.",
      position: { x: 60, y: 220 }
    },
    {
      id: "sd-load-balancing",
      kind: "subtopic",
      parentId: "sd-networking-concepts",
      label: "Load Balancing",
      description: "Load Balancers distribute queries across server nodes pools. Study algorithms (round robin, least connections, hash), Layer 4 vs Layer 7 routing, and software solutions (NGINX, HAProxy).",
      links: [{ title: "NGINX Load Balancing Guide", url: "https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "sd-cdn",
      kind: "subtopic",
      parentId: "sd-networking-concepts",
      label: "CDN",
      description: "Content Delivery Networks cache static page assets near users globally. Study caching edge rules, pull/push synchronization settings, cache invalidations, and origin server protections.",
      links: [{ title: "Cloudflare CDN Overview", url: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "sd-dns",
      kind: "subtopic",
      parentId: "sd-networking-concepts",
      label: "DNS",
      description: "The Domain Name System translates domains names to IP destinations. Study geolocation record routing, server failovers settings, DNS caching parameters, and load balancing configurations.",
      links: [{ title: "Cloudflare DNS Guide", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Data Storage
    {
      id: "sd-data-storage",
      kind: "milestone",
      label: "Data Storage",
      description: "Select database engines, shard data tables horizontally, and replicate databases across server nodes.",
      position: { x: 60, y: 440 }
    },
    {
      id: "sd-sql-nosql",
      kind: "subtopic",
      parentId: "sd-data-storage",
      label: "SQL vs NoSQL",
      description: "Compare relational schemas to non-relational document or key-value stores. Study ACID transaction guarantees, schema flexibility levels, and scaling constraints.",
      links: [{ title: "AWS Databases Comparison", url: "https://aws.amazon.com/nosql/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "sd-database-sharding",
      kind: "subtopic",
      parentId: "sd-data-storage",
      label: "Database Sharding",
      description: "Sharding partitions large data tables horizontally across multiple database hosts. Learn sharding keys selection, hash-based partitions, directory settings, and managing joins.",
      links: [{ title: "Mongo Sharding Overview", url: "https://www.mongodb.com/docs/manual/sharding/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "sd-replication",
      kind: "subtopic",
      parentId: "sd-data-storage",
      label: "Replication",
      description: "Replication duplicates database changes to replica database nodes. Study leader-follower architectures, synchronous vs asynchronous updates, consistency lags, and managing server failovers.",
      links: [{ title: "PostgreSQL Replication Guide", url: "https://www.postgresql.org/docs/current/warm-standby.html" }],
      position: { x: 380, y: 550 }
    },

    // 4. Caching & Messaging
    {
      id: "sd-caching-messaging",
      kind: "milestone",
      label: "Caching & Messaging",
      description: "Store high-frequency data keys in-memory and decouple services using asynchronous message brokers.",
      position: { x: 60, y: 660 }
    },
    {
      id: "sd-caching-strategies",
      kind: "subtopic",
      parentId: "sd-caching-messaging",
      label: "Caching Strategies",
      description: "Caching preserves high-speed access to frequent query records. Learn cache-aside configurations, write-through rules, cache eviction policies (LRU, LFU), and data synchronization.",
      links: [{ title: "Redis Documentation Portal", url: "https://redis.io/docs/latest/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "sd-message-queues",
      kind: "subtopic",
      parentId: "sd-caching-messaging",
      label: "Message Queues",
      description: "Message queues coordinate work tasks between decoupled services nodes. Study broker pipelines configurations (RabbitMQ), task worker scaling, message acknowledgments, and retry mechanisms.",
      links: [{ title: "RabbitMQ Documentation Guide", url: "https://www.rabbitmq.com/documentation.html" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "sd-pubsub",
      kind: "subtopic",
      parentId: "sd-caching-messaging",
      label: "Pub/Sub",
      description: "Publish-Subscribe systems broadcast event streams to multiple subscriber queues concurrently. Learn log partitioning structures (Apache Kafka), consumer group configurations, and retention rules.",
      links: [{ title: "Apache Kafka Documentation Guide", url: "https://kafka.apache.org/documentation/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Architecture Patterns
    {
      id: "sd-architecture-patterns",
      kind: "milestone",
      label: "Architecture Patterns",
      description: "Decompose application code into modular services, establish unified request portals, and protect systems boundaries.",
      position: { x: 60, y: 880 }
    },
    {
      id: "sd-microservices",
      kind: "subtopic",
      parentId: "sd-architecture-patterns",
      label: "Microservices",
      description: "Microservices segment application logical boundaries into independent network services. Learn decoupling database modules, service discovery patterns, HTTP/gRPC communications, and distributed tracing.",
      links: [{ title: "Microservices.io Architecture Patterns", url: "https://microservices.io/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "sd-api-gateway",
      kind: "subtopic",
      parentId: "sd-architecture-patterns",
      label: "API Gateway",
      description: "API Gateways act as centralized portals directing incoming client traffic. Learn route rewriting rules, auth token verifications, query monitoring, and SSL certificate offloading.",
      links: [{ title: "Kong API Gateway docs", url: "https://docs.konghq.com/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "sd-rate-limiting",
      kind: "subtopic",
      parentId: "sd-architecture-patterns",
      label: "Rate Limiting",
      description: "Rate limiters restrict request counts to protect database systems from traffic surges. Study throttling algorithms (token bucket, leaky bucket), distributed counters, and HTTP headers.",
      links: [{ title: "Cloudflare Rate Limiting Guide", url: "https://www.cloudflare.com/learning/bots/what-is-rate-limiting/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-sd-foundations-sd-networking-concepts", source: "sd-foundations", target: "sd-networking-concepts" },
    { id: "e-sd-networking-concepts-sd-data-storage", source: "sd-networking-concepts", target: "sd-data-storage" },
    { id: "e-sd-data-storage-sd-caching-messaging", source: "sd-data-storage", target: "sd-caching-messaging" },
    { id: "e-sd-caching-messaging-sd-architecture-patterns", source: "sd-caching-messaging", target: "sd-architecture-patterns" }
  ]
};
