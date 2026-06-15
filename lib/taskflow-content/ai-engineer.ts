import { TaskflowContent } from "./types";

export const aiEngineerTaskflow: TaskflowContent = {
  slug: "ai-engineer",
  title: "AI Engineer",
  nodes: [
    // 1. Foundations
    {
      id: "ai-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Master the mathematical, statistical, and programming building blocks of AI. Machine learning models run on vector operations, matrix transforms, and probability distributions calculated using code libraries.",
      position: { x: 60, y: 0 }
    },
    {
      id: "ai-python",
      kind: "subtopic",
      label: "Python",
      description: "Python is the core programming language for artificial intelligence. Master object definitions, virtual environments, data formatting operations, and essential data libraries (NumPy, Pandas, SciPy) to clean, analyze, and shape dataset structures.",
      links: [{ title: "Python Documentation", url: "https://docs.python.org/3/" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "ai-linear-algebra",
      kind: "subtopic",
      label: "Linear Algebra",
      description: "Linear Algebra represents datasets as multidimensional spaces. Study vector dot products, matrix multiplication, systems of equations, eigenvalues, and dimensional reduction techniques like Principal Component Analysis (PCA) to manipulate model inputs.",
      links: [{ title: "MIT Linear Algebra Course", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "ai-probability-stats",
      kind: "subtopic",
      label: "Probability & Statistics",
      description: "Probability and Statistics shape how models calculate outputs. Study probability distributions, hypothesis checking, Bayes' theorem, regression estimators, statistical significance testing, and sample classifications to analyze data distributions.",
      links: [{ title: "Khan Academy Statistics and Probability", url: "https://www.khanacademy.org/math/statistics-probability" }],
      position: { x: 380, y: 110 }
    },

    // 2. Machine Learning Basics
    {
      id: "ml-basics",
      kind: "milestone",
      label: "Machine Learning Basics",
      description: "Understand supervised learning structures, unsupervised grouping algorithms, and dataset validation steps. Developers use classic machine learning frameworks like Scikit-Learn to model trends.",
      position: { x: 60, y: 220 }
    },
    {
      id: "ai-supervised-learning",
      kind: "subtopic",
      label: "Supervised Learning",
      description: "Supervised learning models make predictions from labeled training inputs. Master regression equations (Linear/Logistic), decision trees, ensemble configurations (Random Forests, Gradient Boosting), and classification margins (Support Vector Machines).",
      links: [{ title: "Scikit-Learn Supervised Learning docs", url: "https://scikit-learn.org/stable/supervised_learning.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "ai-unsupervised-learning",
      kind: "subtopic",
      label: "Unsupervised Learning",
      description: "Unsupervised learning groups unlabeled dataset structures automatically. Study clustering techniques (K-Means, Hierarchical), density estimations, association rule discovery, and data dimensionality reduction algorithms.",
      links: [{ title: "Scikit-Learn Unsupervised Learning docs", url: "https://scikit-learn.org/stable/unsupervised_learning.html" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "ai-model-evaluation",
      kind: "subtopic",
      label: "Model Evaluation",
      description: "Model Evaluation inspects predictive models accuracy, precision, recall, and bias metrics. Learn cross-validation techniques, confusion matrices, ROC/AUC curve charts, and parameter tuning strategies.",
      links: [{ title: "Scikit-Learn Model Evaluation docs", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. Deep Learning
    {
      id: "deep-learning",
      kind: "milestone",
      label: "Deep Learning",
      description: "Deep learning models simulate neural connections to process unstructured inputs like text, images, and audio. Study tensor operations, backpropagation equations, and custom neural network topologies.",
      position: { x: 60, y: 440 }
    },
    {
      id: "ai-neural-networks",
      kind: "subtopic",
      label: "Neural Networks",
      description: "Neural Networks chain layers of activation functions to approximate complex transformations. Master gradient descent formulas, feedforward layers, loss functions, activation curves (ReLU, Sigmoid), and weights updates rules.",
      links: [{ title: "Deep Learning Book", url: "https://www.deeplearningbook.org/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "ai-pytorch",
      kind: "subtopic",
      label: "PyTorch",
      description: "PyTorch is an open-source machine learning framework emphasizing dynamic tensor structures. Master tensor manipulation APIs, automatic gradients computation, compiling neural layers, loading dataset batches, and GPU execution parameters.",
      links: [{ title: "PyTorch Documentation Guide", url: "https://pytorch.org/docs/stable/index.html" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "ai-tensorflow",
      kind: "subtopic",
      label: "TensorFlow",
      description: "TensorFlow is a robust ecosystem for machine learning models pipelines compilation. Master Keras layers configurations, computation graph optimization, saving model states, and compiling runtime targets for web or mobile devices.",
      links: [{ title: "TensorFlow Documentation Guide", url: "https://www.tensorflow.org/api_docs" }],
      position: { x: 380, y: 550 }
    },

    // 4. LLMs & Prompting
    {
      id: "llms-prompting",
      kind: "milestone",
      label: "LLMs & Prompting",
      description: "Leverage Large Language Models (LLMs), write system prompts, and configure model fine-tuning variables. This stage interfaces neural generators with custom logic frameworks.",
      position: { x: 60, y: 660 }
    },
    {
      id: "ai-transformers",
      kind: "subtopic",
      label: "Transformers",
      description: "Transformers utilize self-attention mechanisms to analyze sequential data sequences. Study encoder-decoder configurations, tokenization algorithms, attention calculation matrices, and LLM model architectures like GPT and BERT.",
      links: [{ title: "Hugging Face Transformers Docs", url: "https://huggingface.co/docs/transformers/index" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "ai-prompt-engineering",
      kind: "subtopic",
      label: "Prompt Engineering",
      description: "Prompt Engineering structures query context to extract precise model answers. Learn context construction strategies, few-shot prompting patterns, Chain-of-Thought (CoT) reasoning, system instruction blocks, and output formatting variables.",
      links: [{ title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "ai-fine-tuning",
      kind: "subtopic",
      label: "Fine-tuning",
      description: "Fine-tuning optimizes pre-trained models weights targeting specific data domains. Master parameter-efficient methods (LoRA, QLoRA), data pre-processing steps, training validation loops, and checking tuned models metrics.",
      links: [{ title: "Hugging Face Fine-tuning Guide", url: "https://huggingface.co/docs/transformers/training" }],
      position: { x: 380, y: 770 }
    },

    // 5. Deployment & Tools
    {
      id: "ai-deployment-tools",
      kind: "milestone",
      label: "Deployment & Tools",
      description: "Serve AI models through low-latency endpoints, link models to vector indexes, and manage pipelines setups. This stage connects raw models to real-world software applications.",
      position: { x: 60, y: 880 }
    },
    {
      id: "ai-vector-databases",
      kind: "subtopic",
      label: "Vector Databases",
      description: "Vector Databases catalog high-dimensional semantic embeddings for fast retrieval. Master database setups (Pinecone, Chroma, Milvus), indexing similarity algorithms (Cosine, Euclidean), storing embeddings, and managing real-time lookups.",
      links: [{ title: "Pinecone Documentation", url: "https://docs.pinecone.io/home" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "ai-langchain",
      kind: "subtopic",
      label: "LangChain",
      description: "LangChain orchestrates modular workflows combining LLM models, vector datasets, and client interfaces. Learn how to script memory sequences, construct Retrieval-Augmented Generation (RAG) loops, design modular agent structures, and execute external tools.",
      links: [{ title: "LangChain Documentation Portal", url: "https://python.langchain.com/docs/introduction/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "ai-mlops-basics",
      kind: "subtopic",
      label: "MLOps Basics",
      description: "MLOps manages models releases, tracking, versioning, and endpoint latency monitoring. Study pipeline orchestrations, model tracking databases (MLflow), automated deploy runs, and telemetry diagnostics.",
      links: [{ title: "MLflow Documentation Guide", url: "https://mlflow.org/docs/latest/index.html" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-ai-foundations-ml-basics", source: "ai-foundations", target: "ml-basics" },
    { id: "e-ml-basics-deep-learning", source: "ml-basics", target: "deep-learning" },
    { id: "e-deep-learning-llms-prompting", source: "deep-learning", target: "llms-prompting" },
    { id: "e-llms-prompting-ai-deployment-tools", source: "llms-prompting", target: "ai-deployment-tools" }
  ]
};
