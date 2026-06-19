import { TaskflowContent } from "./types";

export const gitGithubTaskflow: TaskflowContent = {
  slug: "git-github",
  title: "Git and GitHub",
  nodes: [
    // 1. Git Basics
    {
      id: "git-basics",
      kind: "milestone",
      label: "Git Basics",
      description: "Initialize local repositories, track changes, and audit change logs. Version control tracks code history to prevent data loss.",
      position: { x: 60, y: 0 }
    },
    {
      id: "git-init",
      kind: "subtopic",
      parentId: "git-basics",
      label: "Init",
      description: "git init creates a new local repository folder. Master repository structures, configuring user keys, cloning remote directories (git clone), and configuring tracking targets.",
      links: [{ title: "Git Reference: git init", url: "https://git-scm.com/docs/git-init" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "git-add-commit",
      kind: "subtopic",
      parentId: "git-basics",
      label: "Add & Commit",
      description: "git add stages files, and git commit saves a snapshot. Learn how staging areas work, writing descriptive commit messages, and committing changed lines.",
      links: [{ title: "Git Reference: git commit", url: "https://git-scm.com/docs/git-commit" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "git-status-log",
      kind: "subtopic",
      parentId: "git-basics",
      label: "Status & Log",
      description: "git status reports uncommitted files, while git log audits repository history. Master reading file status flags, viewing log graphs, and filtering history logs.",
      links: [{ title: "Git Reference: git log", url: "https://git-scm.com/docs/git-log" }],
      position: { x: 380, y: 110 }
    },

    // 2. Branching
    {
      id: "git-branching",
      kind: "milestone",
      label: "Branching",
      description: "Isolate feature developments, merge changes, and re-apply histories. Branching enables developers to work on changes without impacting main paths.",
      position: { x: 60, y: 220 }
    },
    {
      id: "git-branches",
      kind: "subtopic",
      parentId: "git-branching",
      label: "Branches",
      description: "Branches are pointer lines referencing code commits. Study branch creation (git branch), switching workspaces (git checkout, git switch), list branches, and deleting branches.",
      links: [{ title: "Git Reference: git branch", url: "https://git-scm.com/docs/git-branch" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "git-merging",
      kind: "subtopic",
      parentId: "git-branching",
      label: "Merging",
      description: "git merge combines code branches history records. Master fast-forward merge paths, creating merge commits, choosing target branches, and keeping branch structures clean.",
      links: [{ title: "Git Reference: git merge", url: "https://git-scm.com/docs/git-merge" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "git-rebasing",
      kind: "subtopic",
      parentId: "git-branching",
      label: "Rebasing",
      description: "git rebase re-applies commits from one branch on top of another base tip. Learn clean commit history generation, interactive rebasing, and avoiding rebase runs on public branches.",
      links: [{ title: "Git Reference: git rebase", url: "https://git-scm.com/docs/git-rebase" }],
      position: { x: 380, y: 330 }
    },

    // 3. Collaboration
    {
      id: "git-collaboration",
      kind: "milestone",
      label: "Collaboration",
      description: "Propose modifications, review teammate code, and copy repositories on code hosting platforms.",
      position: { x: 60, y: 440 }
    },
    {
      id: "git-pull-requests",
      kind: "subtopic",
      parentId: "git-collaboration",
      label: "Pull Requests",
      description: "Pull Requests (PRs) submit branch changes for team review. Master writing descriptive descriptions, configuring reviewers, resolving review comments, and merging commits.",
      links: [{ title: "GitHub Docs: Pull Requests", url: "https://docs.github.com/en/pull-requests" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "git-code-review",
      kind: "subtopic",
      parentId: "git-collaboration",
      label: "Code Review",
      description: "Code reviews audit code changes before integration. Study reviewing line differences (diffs), suggesting changes directly, configuring approvals rules, and checking build statuses.",
      links: [{ title: "GitHub Docs: Reviewing PRs", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "git-forking",
      kind: "subtopic",
      parentId: "git-collaboration",
      label: "Forking",
      description: "Forking duplicates a remote repository to submit pull requests externally. Learn configuring upstream remote targets, synchronizing forks, and managing permissions.",
      links: [{ title: "GitHub Docs: Fork a Repo", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks" }],
      position: { x: 380, y: 550 }
    },

    // 4. GitHub Features
    {
      id: "git-github-features",
      kind: "milestone",
      label: "GitHub Features",
      description: "Track issues, configure build pipelines, and host static web files using GitHub features.",
      position: { x: 60, y: 660 }
    },
    {
      id: "git-issues",
      kind: "subtopic",
      parentId: "git-github-features",
      label: "Issues",
      description: "GitHub Issues tracks tasks and project planning. Learn templates setup, assigning label flags, linking issues to code commits, and project boards configurations.",
      links: [{ title: "GitHub Docs: Issues Management", url: "https://docs.github.com/en/issues" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "git-actions",
      kind: "subtopic",
      parentId: "git-github-features",
      label: "Actions",
      description: "GitHub Actions automates workflow tasks (CI/CD). Study yaml workflow designs, triggers settings (push, pull_request), checkout actions configurations, caching settings, and deployment runs.",
      links: [{ title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "git-pages",
      kind: "subtopic",
      parentId: "git-github-features",
      label: "GitHub Pages",
      description: "GitHub Pages hosts static html websites from repository branches. Learn custom domain name mapping, configuring static build files, and deployment rules.",
      links: [{ title: "GitHub Pages Documentation", url: "https://pages.github.com/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Advanced
    {
      id: "git-advanced",
      kind: "milestone",
      label: "Advanced",
      description: "Temporarily shelter file changes, copy specific commits, and resolve merge conflicts.",
      position: { x: 60, y: 880 }
    },
    {
      id: "git-stash",
      kind: "subtopic",
      parentId: "git-advanced",
      label: "Git Stash",
      description: "git stash saves uncommitted modifications to clear the working directory. Learn stashing files (git stash push), listing stashes, re-applying changes (git stash pop), and branch creation.",
      links: [{ title: "Git Reference: git stash", url: "https://git-scm.com/docs/git-stash" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "git-cherry-pick",
      kind: "subtopic",
      parentId: "git-advanced",
      label: "Cherry-pick",
      description: "git cherry-pick copies specific commits from one branch to another. Master commit hash selections, resolving copy conflicts, and maintaining branch sanity.",
      links: [{ title: "Git Reference: git cherry-pick", url: "https://git-scm.com/docs/git-cherry-pick" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "git-resolving-conflicts",
      kind: "subtopic",
      parentId: "git-advanced",
      label: "Resolving Conflicts",
      description: "Merge conflicts occur when overlapping code lines are modified. Master conflict markers identification (<<<<<<<, =======, >>>>>>>), selecting changes, and completing merge runs.",
      links: [{ title: "GitHub Docs: Merge Conflicts", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-git-basics-git-branching", source: "git-basics", target: "git-branching" },
    { id: "e-git-branching-git-collaboration", source: "git-branching", target: "git-collaboration" },
    { id: "e-git-collaboration-git-github-features", source: "git-collaboration", target: "git-github-features" },
    { id: "e-git-github-features-git-advanced", source: "git-github-features", target: "git-advanced" }
  ]
};
