import { TaskflowContent } from "./types";

export const sqlTaskflow: TaskflowContent = {
  slug: "sql",
  title: "SQL",
  nodes: [
    // 1. Basics
    {
      id: "sql-basics",
      kind: "milestone",
      label: "Basics",
      description: "Understand basic query statements, table projections, and data filtering commands. Structured Query Language coordinates data extraction across all database platforms.",
      position: { x: 60, y: 0 }
    },
    {
      id: "sql-select",
      kind: "subtopic",
      label: "SELECT Statements",
      description: "SELECT statements project specific table fields or computed values. Learn querying columns lists, renaming outputs via aliases (AS), removing duplicates via DISTINCT, and performing basic math calculations.",
      links: [{ title: "PostgreSQL SELECT Docs", url: "https://www.postgresql.org/docs/current/sql-select.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "sql-where-filtering",
      kind: "subtopic",
      label: "WHERE & Filtering",
      description: "WHERE clauses filter records matching logical criteria. Master using comparison operators, combining conditions (AND, OR, NOT), wildcard string searches (LIKE, ILIKE), range queries (BETWEEN), and checking null options.",
      links: [{ title: "PostgreSQL WHERE Clause", url: "https://www.postgresql.org/docs/current/queries-tableexpressions.html#QUERIES-WHERE" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "sql-sorting-limiting",
      kind: "subtopic",
      label: "Sorting & Limiting",
      description: "ORDER BY and LIMIT clauses organize and slice result sets. Learn sorting records ascending/descending, sorting by multiple columns, limiting return rows count, and configuring offset parameters (OFFSET) for page pagination.",
      links: [{ title: "PostgreSQL LIMIT and OFFSET", url: "https://www.postgresql.org/docs/current/queries-limit.html" }],
      position: { x: 380, y: 110 }
    },

    // 2. Joins & Relationships
    {
      id: "sql-joins-relationships",
      kind: "milestone",
      label: "Joins & Relationships",
      description: "Link tables across primary and foreign key constraints and execute nested queries. Database relationships merge distinct data collections systematically.",
      position: { x: 60, y: 220 }
    },
    {
      id: "sql-inner-outer-joins",
      kind: "subtopic",
      label: "Inner/Outer Joins",
      description: "Joins combine fields from multiple tables based on relational fields. Master INNER JOIN intersection matches, LEFT/RIGHT outer joins, FULL outer joins, self joins, and cross joins mappings.",
      links: [{ title: "PostgreSQL Joins Guide", url: "https://www.postgresql.org/docs/current/tutorial-join.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "sql-foreign-keys",
      kind: "subtopic",
      label: "Foreign Keys",
      description: "Foreign keys validate referential integrity between tables. Study primary-to-foreign mappings, setting delete cascades (ON DELETE CASCADE), restrict constraints, and maintaining data synchronization.",
      links: [{ title: "PostgreSQL Foreign Keys", url: "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "sql-subqueries",
      kind: "subtopic",
      label: "Subqueries",
      description: "Subqueries are queries nested inside SELECT, FROM, or WHERE loops. Master using subqueries within comparison checks, checking lists (IN, ANY, ALL), using correlated subqueries, and checking existence (EXISTS).",
      links: [{ title: "PostgreSQL Subqueries", url: "https://www.postgresql.org/docs/current/functions-subquery.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. Aggregation
    {
      id: "sql-aggregation",
      kind: "milestone",
      label: "Aggregation",
      description: "Summarize records groups, execute mathematical calculations, and filter aggregated results.",
      position: { x: 60, y: 440 }
    },
    {
      id: "sql-groupby",
      kind: "subtopic",
      label: "GROUP BY",
      description: "GROUP BY partitions query records into groups matching shared column values. Study grouping keys, sorting grouped outputs, grouping by multiple columns, and handling database schema rules.",
      links: [{ title: "PostgreSQL GROUP BY Clause", url: "https://www.postgresql.org/docs/current/queries-tableexpressions.html#QUERIES-GROUP" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "sql-aggregate-functions",
      kind: "subtopic",
      label: "Aggregate Functions",
      description: "Aggregate functions compute single summary values from groups of table records. Master calculating sums (SUM), averages (AVG), records counts (COUNT), range bounds (MIN, MAX), and handling null fields.",
      links: [{ title: "PostgreSQL Aggregate Functions", url: "https://www.postgresql.org/docs/current/functions-aggregate.html" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "sql-having",
      kind: "subtopic",
      label: "HAVING",
      description: "HAVING clauses filter aggregated results after GROUP BY calculations have completed. Learn difference between pre-filtering rows (WHERE) and post-filtering groups (HAVING) matching conditions.",
      links: [{ title: "PostgreSQL HAVING Clause", url: "https://www.postgresql.org/docs/current/queries-tableexpressions.html#QUERIES-HAVING" }],
      position: { x: 380, y: 550 }
    },

    // 4. Advanced
    {
      id: "sql-advanced",
      kind: "milestone",
      label: "Advanced",
      description: "Optimize query response latencies, write virtual schema definitions, and manage transaction operations safety.",
      position: { x: 60, y: 660 }
    },
    {
      id: "sql-indexes",
      kind: "subtopic",
      label: "Indexes",
      description: "Indexes accelerate query lookups on table rows. Study index creation (CREATE INDEX), B-Tree structures, unique index properties, multi-column indexes, and examining query execution plans (EXPLAIN).",
      links: [{ title: "PostgreSQL Indexes Guide", url: "https://www.postgresql.org/docs/current/indexes.html" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "sql-views",
      kind: "subtopic",
      label: "Views",
      description: "Views are virtual schemas saved from query outputs. Learn creating view definitions, writing queries referencing views, managing materialized views, and updating schema records.",
      links: [{ title: "PostgreSQL CREATE VIEW", url: "https://www.postgresql.org/docs/current/sql-createview.html" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "sql-transactions",
      kind: "subtopic",
      label: "Transactions",
      description: "Transactions run groups of updates atomically to satisfy ACID principles. Master transaction commands (BEGIN, COMMIT, ROLLBACK), setting savepoints, and managing isolation levels.",
      links: [{ title: "PostgreSQL Transactions", url: "https://www.postgresql.org/docs/current/tutorial-transactions.html" }],
      position: { x: 380, y: 770 }
    },

    // 5. Database Systems
    {
      id: "sql-database-systems",
      kind: "milestone",
      label: "Database Systems",
      description: "Compare relational engines to select optimal database platforms based on speed, scaling, and support requirements.",
      position: { x: 60, y: 880 }
    },
    {
      id: "sql-postgresql",
      kind: "subtopic",
      label: "PostgreSQL",
      description: "PostgreSQL is an advanced, highly reliable open-source object-relational database. Learn its compliance with standard SQL, support for JSON data types, custom triggers execution, and replication models.",
      links: [{ title: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "sql-mysql",
      kind: "subtopic",
      label: "MySQL",
      description: "MySQL is a popular open-source relational database management system. Study its storage engines (InnoDB, MyISAM), replication configurations, indexing strategies, and configurations within web environments.",
      links: [{ title: "MySQL Reference Manual", url: "https://dev.mysql.com/doc/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "sql-sqlite",
      kind: "subtopic",
      label: "SQLite",
      description: "SQLite is a lightweight, serverless database engine contained within a single file. Learn its zero-configuration setup, local storage usage on mobile and testing environments, and limitations.",
      links: [{ title: "SQLite Documentation Portal", url: "https://www.sqlite.org/docs.html" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-sql-basics-sql-joins-relationships", source: "sql-basics", target: "sql-joins-relationships" },
    { id: "e-sql-joins-relationships-sql-aggregation", source: "sql-joins-relationships", target: "sql-aggregation" },
    { id: "e-sql-aggregation-sql-advanced", source: "sql-aggregation", target: "sql-advanced" },
    { id: "e-sql-advanced-sql-database-systems", source: "sql-advanced", target: "sql-database-systems" }
  ]
};
