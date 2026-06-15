import { TaskflowContent } from "./types";

export const pythonTaskflow: TaskflowContent = {
  slug: "python",
  title: "Python",
  nodes: [
    // 1. Basics
    {
      id: "py-basics",
      kind: "milestone",
      label: "Basics",
      description: "Write basic Python statements, declare dynamic variables, and control conditional code runs. Python's clear syntax makes it a popular programming language.",
      position: { x: 60, y: 0 }
    },
    {
      id: "py-syntax-variables",
      kind: "subtopic",
      label: "Syntax & Variables",
      description: "Syntax controls variables assignments and interpreter calculations. Study whitespace indentation constraints, commenting models, dynamic variables assignment, and standard identifier conventions.",
      links: [{ title: "Python Tutorial: Informal Introduction", url: "https://docs.python.org/3/tutorial/introduction.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "py-data-types",
      kind: "subtopic",
      label: "Data Types",
      description: "Data types organize data values inside running scripts. Learn primitive types (int, float, bool, str) and built-in sequences like lists, dictionaries, tuples, and sets.",
      links: [{ title: "Python Standard Types", url: "https://docs.python.org/3/library/stdtypes.html" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "py-control-flow",
      kind: "subtopic",
      label: "Control Flow",
      description: "Control flow directs logical branches dynamically. Study conditional triggers (if, elif, else), loop checks (for, while), loop control variables (break, continue), and range functions.",
      links: [{ title: "Python Tutorial: Control Flow Tools", url: "https://docs.python.org/3/tutorial/controlflow.html" }],
      position: { x: 380, y: 110 }
    },

    // 2. Functions & OOP
    {
      id: "py-functions-oop",
      kind: "milestone",
      label: "Functions & OOP",
      description: "Develop reusable logic blocks, construct object hierarchies, and organize script modules.",
      position: { x: 60, y: 220 }
    },
    {
      id: "py-functions",
      kind: "subtopic",
      label: "Functions",
      description: "Functions encapsulate logical routines. Learn function definitions (def), variable scopes, returning multiple outputs, argument parsing configurations (*args, **kwargs), and lambda expressions.",
      links: [{ title: "Python Tutorial: Defining Functions", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "py-classes",
      kind: "subtopic",
      label: "Classes",
      description: "Classes structure objects blueprints for object-oriented designs. Learn Initializer configurations (__init__), class inheritance, instance methods, properties encapsulation, and magic methods.",
      links: [{ title: "Python Tutorial: Classes", url: "https://docs.python.org/3/tutorial/classes.html" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "py-modules-packages",
      kind: "subtopic",
      label: "Modules & Packages",
      description: "Modules separate namespaces across separate files. Study importing package directories, using pip wrappers, configuring paths, and formatting initialization scripts.",
      links: [{ title: "Python Tutorial: Modules", url: "https://docs.python.org/3/tutorial/modules.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. Data Handling
    {
      id: "py-data-handling",
      kind: "milestone",
      label: "Data Handling",
      description: "Access local files, encode data formats, and isolate script dependency versions.",
      position: { x: 60, y: 440 }
    },
    {
      id: "py-file-io",
      kind: "subtopic",
      label: "File I/O",
      description: "File I/O processes disk files streams. Learn file open modes (r, w, a), reading lines, buffering large files, and using context managers (with statements) to release file handles.",
      links: [{ title: "Python Tutorial: Reading and Writing Files", url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "py-json",
      kind: "subtopic",
      label: "JSON",
      description: "JSON APIs parse and format web data packages. Study converting dict structures to JSON strings (dumps), writing files (dump), parsing streams (load), and handling custom classes serialization.",
      links: [{ title: "Python JSON Library", url: "https://docs.python.org/3/library/json.html" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "py-virtual-environments",
      kind: "subtopic",
      label: "Virtual Environments",
      description: "Virtual environments isolate package dependencies versions. Study using venv wrappers to isolate runtimes, installing scripts via pip, and exporting packages lists.",
      links: [{ title: "Python Tutorial: Virtual Environments", url: "https://docs.python.org/3/tutorial/venv.html" }],
      position: { x: 380, y: 550 }
    },

    // 4. Libraries
    {
      id: "py-libraries",
      kind: "milestone",
      label: "Libraries",
      description: "Harness powerful external libraries to process calculations, table data, and HTTP requests.",
      position: { x: 60, y: 660 }
    },
    {
      id: "py-numpy",
      kind: "subtopic",
      label: "NumPy",
      description: "NumPy processes high-performance multidimensional arrays. Master matrix calculations commands, broadcasting rules, vector operations, indexing arrays, and numerical functions.",
      links: [{ title: "NumPy Documentation Guide", url: "https://numpy.org/doc/stable/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "py-pandas",
      kind: "subtopic",
      label: "Pandas",
      description: "Pandas cleans and reorganizes table data. Learn DataFrame configurations, filtering data rows, grouping columns, merging table sheets, and handling missing indexes.",
      links: [{ title: "Pandas Getting Started Guides", url: "https://pandas.pydata.org/docs/getting_started/index.html" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "py-requests",
      kind: "subtopic",
      label: "Requests",
      description: "Requests queries API servers over HTTP layers. Learn configuring get/post parameters, sending request headers, parsing JSON outputs, and managing session cookies.",
      links: [{ title: "Requests Documentation Portal", url: "https://requests.readthedocs.io/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Frameworks
    {
      id: "py-frameworks",
      kind: "milestone",
      label: "Frameworks",
      description: "Build robust web backends and API microservices using Python web frameworks.",
      position: { x: 60, y: 880 }
    },
    {
      id: "py-flask",
      kind: "subtopic",
      label: "Flask",
      description: "Flask is a lightweight micro-framework. Master configuring application routing, handling parameters paths, returning template files, and setting up middleware controls.",
      links: [{ title: "Flask Documentation Portal", url: "https://flask.palletsprojects.com/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "py-django",
      kind: "subtopic",
      label: "Django",
      description: "Django is a batteries-included full-stack framework. Learn configuring ORM databases, managing admin consoles, parsing templates, and integrating REST API frameworks.",
      links: [{ title: "Django Documentation", url: "https://docs.djangoproject.com/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "py-fastapi",
      kind: "subtopic",
      label: "FastAPI",
      description: "FastAPI is a fast web framework utilizing type tags. Learn path validation using Pydantic, rendering OpenAPI documentation automatically, scripting asynchronous handlers, and optimizing endpoints speed.",
      links: [{ title: "FastAPI Documentation Guide", url: "https://fastapi.tiangolo.com/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-py-basics-py-functions-oop", source: "py-basics", target: "py-functions-oop" },
    { id: "e-py-functions-oop-py-data-handling", source: "py-functions-oop", target: "py-data-handling" },
    { id: "e-py-data-handling-py-libraries", source: "py-data-handling", target: "py-libraries" },
    { id: "e-py-libraries-py-frameworks", source: "py-libraries", target: "py-frameworks" }
  ]
};
