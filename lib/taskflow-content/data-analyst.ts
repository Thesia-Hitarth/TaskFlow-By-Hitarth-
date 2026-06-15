import { TaskflowContent } from "./types";

export const dataAnalystTaskflow: TaskflowContent = {
  slug: "data-analyst",
  title: "Data Analyst",
  nodes: [
    // 1. Foundations
    {
      id: "da-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Learn calculations spreadsheets, basic statistics principles, and relational database queries. Foundational analytics tools help filter records and compute simple metrics.",
      position: { x: 60, y: 0 }
    },
    {
      id: "da-excel",
      kind: "subtopic",
      label: "Excel",
      description: "Excel organizes and handles business data workbook files. Master writing lookup functions (VLOOKUP, XLOOKUP), designing pivot tables, scripting macros, and formatting dataset trends.",
      links: [{ title: "Microsoft Excel Support", url: "https://support.microsoft.com/en-us/excel" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "da-statistics-basics",
      kind: "subtopic",
      label: "Statistics Basics",
      description: "Statistics help analyze data distribution metrics and run estimations. Study variance calculations, normal curves rules, sampling metrics, confidence intervals, and hypothesis tests parameters.",
      links: [{ title: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "da-sql",
      kind: "subtopic",
      label: "SQL",
      description: "SQL is the universal language for querying relational databases. Master table filters (WHERE), groupings parameters (GROUP BY), aggregate functions (SUM, AVG), subqueries structures, and joins configurations.",
      links: [{ title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/" }],
      position: { x: 380, y: 110 }
    },

    // 2. Data Manipulation
    {
      id: "da-data-manipulation",
      kind: "milestone",
      label: "Data Manipulation",
      description: "Process, clean, and structure raw data files programmatically. Data analysts clean outliers and prepare databases to run reporting metrics.",
      position: { x: 60, y: 220 }
    },
    {
      id: "da-python-pandas",
      kind: "subtopic",
      label: "Python (Pandas)",
      description: "Pandas processes structured datasets inside Python scripts. Learn DataFrame data structures, filtering data values, grouping columns, merging table sets, and restructuring datasets indices.",
      links: [{ title: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "da-data-cleaning",
      kind: "subtopic",
      label: "Data Cleaning",
      description: "Data cleaning resolves anomalies inside raw files. Learn handling missing values (NaN), parsing date strings formats, dropping duplicate data rows, and identifying outlying values.",
      links: [{ title: "Pandas Cleaning Guide", url: "https://pandas.pydata.org/docs/user_guide/index.html" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "da-etl-basics",
      kind: "subtopic",
      label: "ETL Basics",
      description: "Extract, Transform, and Load (ETL) pipelines ingest raw files and write to database servers. Study pipeline stages, configuring scheduler runs, and managing data schema changes.",
      links: [{ title: "AWS ETL Concept Guide", url: "https://aws.amazon.com/what-is/etl/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Visualization
    {
      id: "da-visualization",
      kind: "milestone",
      label: "Visualization",
      description: "Translate complex numeric datasets into interactive dashboard reports. Visual graphics make metrics easy to read for business stakeholder teams.",
      position: { x: 60, y: 440 }
    },
    {
      id: "da-tableau",
      kind: "subtopic",
      label: "Tableau",
      description: "Tableau designs interactive business intelligence dashboards. Master connecting data resources, configuring data fields, mapping locations, designing charts, and setting up dashboard filters.",
      links: [{ title: "Tableau Help Center", url: "https://help.tableau.com/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "da-power-bi",
      kind: "subtopic",
      label: "Power BI",
      description: "Microsoft Power BI integrates enterprise data sources into visual reports. Learn creating data relationships, writing DAX expressions, configuring report views, and publishing dashboards.",
      links: [{ title: "Microsoft Power BI Docs", url: "https://learn.microsoft.com/en-us/power-bi/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "da-matplotlib-seaborn",
      kind: "subtopic",
      label: "Matplotlib/Seaborn",
      description: "Matplotlib and Seaborn render data charts programmatically inside Python. Study line plots configurations, distribution histograms, correlation heatmaps, scatter plots, and exporting charts formats.",
      links: [{ title: "Seaborn Documentation", url: "https://seaborn.pydata.org/" }],
      position: { x: 380, y: 550 }
    },

    // 4. Analysis Techniques
    {
      id: "da-analysis-techniques",
      kind: "milestone",
      label: "Analysis Techniques",
      description: "Apply scientific testing methods and forecasting models to identify trends. Advanced analysis determines if user metrics changes are statistically significant.",
      position: { x: 60, y: 660 }
    },
    {
      id: "da-ab-testing",
      kind: "subtopic",
      label: "A/B Testing",
      description: "A/B testing checks product changes variations against controls. Study target metrics selection rules, calculating sample sizes, determining significance thresholds (p-values), and running tests.",
      links: [{ title: "Harvard A/B Testing Guide", url: "https://hbr.org/2017/06/a-refresher-on-ab-testing" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "da-regression-analysis",
      kind: "subtopic",
      label: "Regression Analysis",
      description: "Regression models predict linear trends based on data variables. Learn fitting regression lines, calculating residuals, evaluating model error, and interpreting coefficients outputs.",
      links: [{ title: "Scikit-Learn Linear Models", url: "https://scikit-learn.org/stable/modules/linear_model.html" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "da-cohort-analysis",
      kind: "subtopic",
      label: "Cohort Analysis",
      description: "Cohort analysis checks retention behaviors of specific groups over time. Learn user cohort groupings, retention grid matrices, tracking lifecycle metrics, and interpreting retention drop-offs.",
      links: [{ title: "Optimizely Cohort Guide", url: "https://www.optimizely.com/optimization-glossary/cohort-analysis/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Communication
    {
      id: "da-communication",
      kind: "milestone",
      label: "Communication",
      description: "Translate complex database findings into clear reporting presentations and actionable recommendations for management.",
      position: { x: 60, y: 880 }
    },
    {
      id: "da-dashboards",
      kind: "subtopic",
      label: "Dashboards",
      description: "Dashboard interfaces display business metrics in real-time. Learn configuring data schedules, selecting key metrics (KPIs), designing clean grid layouts, and managing viewer credentials.",
      links: [{ title: "Google Looker Studio", url: "https://lookerstudio.google.com/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "da-storytelling",
      kind: "subtopic",
      label: "Storytelling with Data",
      description: "Data storytelling explains context trends clearly using visual tools. Master crafting narratives, removing visual clutter from slides, and highlighting evidence paths clearly.",
      links: [{ title: "Storytelling with Data Book", url: "https://www.storytellingwithdata.com/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "da-reporting",
      kind: "subtopic",
      label: "Reporting",
      description: "Reporting translates metrics into summaries. Learn writing briefs, organizing reports, suggesting test plans, and detailing metric changes impacts.",
      links: [{ title: "Harvard Business Writing", url: "https://hbr.org/topic/business-writing" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-da-foundations-da-data-manipulation", source: "da-foundations", target: "da-data-manipulation" },
    { id: "e-da-data-manipulation-da-visualization", source: "da-data-manipulation", target: "da-visualization" },
    { id: "e-da-visualization-da-analysis-techniques", source: "da-visualization", target: "da-analysis-techniques" },
    { id: "e-da-analysis-techniques-da-communication", source: "da-analysis-techniques", target: "da-communication" }
  ]
};
