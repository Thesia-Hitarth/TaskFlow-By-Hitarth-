import { TaskflowContent } from "./types";

export const awsTaskflow: TaskflowContent = {
  slug: "aws",
  title: "AWS",
  nodes: [
    // 1. Foundations
    {
      id: "aws-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Understand user identity permissions, resource deployment zones, and command line tools. AWS foundations secure cloud setups and optimize resource allocation.",
      position: { x: 60, y: 0 }
    },
    {
      id: "aws-iam",
      kind: "subtopic",
      parentId: "aws-foundations",
      label: "IAM",
      description: "Identity and Access Management (IAM) controls user permissions bounds. Study user creation, managing groups, role definitions, writing JSON policy rules, and multi-factor authentication (MFA).",
      links: [{ title: "AWS IAM Documentation", url: "https://docs.aws.amazon.com/iam/" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "aws-regions-azs",
      kind: "subtopic",
      parentId: "aws-foundations",
      label: "Regions & AZs",
      description: "Regions and Availability Zones (AZs) host cloud infrastructures globally. Learn difference between physical regions, AZ datacenters, configuring replication, low-latency scaling, and high-availability.",
      links: [{ title: "AWS Global Infrastructure Guide", url: "https://aws.amazon.com/about-aws/global-infrastructure/" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "aws-cli",
      kind: "subtopic",
      parentId: "aws-foundations",
      label: "AWS CLI",
      description: "The AWS Command Line Interface (CLI) manages cloud operations from terminals. Master credentials configuration, querying resource listings, managing objects uploads, and script automations.",
      links: [{ title: "AWS CLI User Guide", url: "https://docs.aws.amazon.com/cli/" }],
      position: { x: 380, y: 110 }
    },

    // 2. Compute
    {
      id: "aws-compute",
      kind: "milestone",
      label: "Compute",
      description: "Configure server instances, run serverless code functions, and deploy scaling applications stacks.",
      position: { x: 60, y: 220 }
    },
    {
      id: "aws-ec2",
      kind: "subtopic",
      parentId: "aws-compute",
      label: "EC2",
      description: "Elastic Compute Cloud (EC2) runs virtual server instances. Learn selecting instance classes, attaching EBS storage volumes, managing security groups firewall rules, configuring key pairs, and auto-scaling.",
      links: [{ title: "AWS EC2 Documentation", url: "https://docs.aws.amazon.com/ec2/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "aws-lambda",
      kind: "subtopic",
      parentId: "aws-compute",
      label: "Lambda",
      description: "AWS Lambda executes serverless code in response to system event triggers. Learn lambda handlers writing, resource thresholds limits configurations, runtime setups, and mapping triggers (API Gateway, S3).",
      links: [{ title: "AWS Lambda Documentation", url: "https://docs.aws.amazon.com/lambda/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "aws-elastic-beanstalk",
      kind: "subtopic",
      parentId: "aws-compute",
      label: "Elastic Beanstalk",
      description: "Elastic Beanstalk automates web application deployments. Study environment configurations, provisioning servers, load balancers setups, managing auto-scaling, and tracking deployment logs.",
      links: [{ title: "AWS Elastic Beanstalk Docs", url: "https://docs.aws.amazon.com/elasticbeanstalk/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Storage & Databases
    {
      id: "aws-storage-databases",
      kind: "milestone",
      label: "Storage & Databases",
      description: "Store asset files in object buckets, connect relational databases, and query no-sql tables.",
      position: { x: 60, y: 440 }
    },
    {
      id: "aws-s3",
      kind: "subtopic",
      parentId: "aws-storage-databases",
      label: "S3",
      description: "Simple Storage Service (S3) provides object storage buckets. Learn bucket creations, permissions configurations via IAM, lifecycle rules (archiving files), public bucket hosts, and versioning.",
      links: [{ title: "AWS S3 Documentation", url: "https://docs.aws.amazon.com/s3/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "aws-rds",
      kind: "subtopic",
      parentId: "aws-storage-databases",
      label: "RDS",
      description: "Relational Database Service (RDS) runs managed databases (PostgreSQL, MySQL). Study database provisioning, database scaling policies, automated snapshots schedules, multi-AZ deployments, and read replicas.",
      links: [{ title: "AWS RDS Documentation", url: "https://docs.aws.amazon.com/rds/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "aws-dynamodb",
      kind: "subtopic",
      parentId: "aws-storage-databases",
      label: "DynamoDB",
      description: "DynamoDB is a managed NoSQL database engine. Master primary and sort keys design, partition structures, scanning vs querying metrics, indexing (GSI/LSI), and provisioning read/write capacities.",
      links: [{ title: "AWS DynamoDB Documentation", url: "https://docs.aws.amazon.com/dynamodb/" }],
      position: { x: 380, y: 550 }
    },

    // 4. Networking
    {
      id: "aws-networking",
      kind: "milestone",
      label: "Networking",
      description: "Configure isolated cloud networks, manage DNS pathways, and cache content globally near users.",
      position: { x: 60, y: 660 }
    },
    {
      id: "aws-vpc",
      kind: "subtopic",
      parentId: "aws-networking",
      label: "VPC",
      description: "Virtual Private Cloud (VPC) defines isolated private networks. Learn subnets segmentation (public/private), internet gateways routing, NAT gateways setups, routing tables configurations, and network ACLs security rules.",
      links: [{ title: "AWS VPC Documentation", url: "https://docs.aws.amazon.com/vpc/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "aws-route53",
      kind: "subtopic",
      parentId: "aws-networking",
      label: "Route 53",
      description: "Route 53 is AWS's DNS management system. Learn domain names registration, configuring routing options (failover, geolocation), health checks, DNS zone mapping, and alias record creation.",
      links: [{ title: "AWS Route 53 Documentation", url: "https://docs.aws.amazon.com/route53/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "aws-cloudfront",
      kind: "subtopic",
      parentId: "aws-networking",
      label: "CloudFront",
      description: "CloudFront is a Content Delivery Network (CDN). Master caching policies configurations, setting origin access, SSL certificate installations, managing cache invalidations, and Edge location parameters.",
      links: [{ title: "AWS CloudFront Documentation", url: "https://docs.aws.amazon.com/cloudfront/" }],
      position: { x: 380, y: 770 }
    },

    // 5. DevOps Tools
    {
      id: "aws-devops-tools",
      kind: "milestone",
      label: "DevOps Tools",
      description: "Declare infrastructure configurations via code, capture telemetry metrics logs, and run container clusters.",
      position: { x: 60, y: 880 }
    },
    {
      id: "aws-cloudformation",
      kind: "subtopic",
      parentId: "aws-devops-tools",
      label: "CloudFormation",
      description: "CloudFormation templates configure Infrastructure as Code (IaC). Learn YAML template syntax definitions, declaring stack structures, resources outputs propagation, and update execution runs.",
      links: [{ title: "AWS CloudFormation Docs", url: "https://docs.aws.amazon.com/cloudformation/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "aws-cloudwatch",
      kind: "subtopic",
      parentId: "aws-devops-tools",
      label: "CloudWatch",
      description: "CloudWatch monitors systems logs and metrics. Study metric visualizations creation, log collection agents configuration, alarm thresholds, logs queries, and triggering server scaling rules.",
      links: [{ title: "AWS CloudWatch Documentation", url: "https://docs.aws.amazon.com/cloudwatch/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "aws-ecs-eks",
      kind: "subtopic",
      parentId: "aws-devops-tools",
      label: "ECS/EKS",
      description: "ECS and EKS manage container deployments. Learn ECS task definitions, EKS managed Kubernetes nodes settings, Fargate serverless runtimes setups, service scaling, and networking.",
      links: [{ title: "AWS ECS Documentation", url: "https://docs.aws.amazon.com/ecs/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-aws-foundations-aws-compute", source: "aws-foundations", target: "aws-compute" },
    { id: "e-aws-compute-aws-storage-databases", source: "aws-compute", target: "aws-storage-databases" },
    { id: "e-aws-storage-databases-aws-networking", source: "aws-storage-databases", target: "aws-networking" },
    { id: "e-aws-networking-aws-devops-tools", source: "aws-networking", target: "aws-devops-tools" }
  ]
};
