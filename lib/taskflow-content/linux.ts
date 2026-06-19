import { TaskflowContent } from "./types";

export const linuxTaskflow: TaskflowContent = {
  slug: "linux",
  title: "Linux",
  nodes: [
    // 1. Basics
    {
      id: "linux-basics",
      kind: "milestone",
      label: "Basics",
      description: "Navigate directory layouts, execute basic commands, and configure file permissions. Linux is the standard operating system for hosting backend applications and security tools.",
      position: { x: 60, y: 0 }
    },
    {
      id: "linux-fs-hierarchy",
      kind: "subtopic",
      parentId: "linux-basics",
      label: "File System Hierarchy",
      description: "The Filesystem Hierarchy Standard (FHS) specifies directory layouts in Linux. Study path usage like config files in /etc, logs in /var, binaries in /bin and /usr/bin, home folders in /home, and device nodes in /dev.",
      links: [{ title: "FHS Specification", url: "https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "linux-basic-commands",
      kind: "subtopic",
      parentId: "linux-basics",
      label: "Basic Commands",
      description: "Basic commands navigate directories and manipulate file systems. Learn directory changing (cd), listing contents (ls), creating folders (mkdir), copying (cp), moving (mv), deleting files (rm), and search files (find, grep).",
      links: [{ title: "GNU Coreutils Manual", url: "https://www.gnu.org/software/coreutils/manual/coreutils.html" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "linux-permissions",
      kind: "subtopic",
      parentId: "linux-basics",
      label: "Permissions",
      description: "Permissions secure directory access across users and groups. Master binary representation models (rwx), changing user privileges using chmod, modifying file ownership via chown, and managing sudo privileges.",
      links: [{ title: "GNU chmod Reference", url: "https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html" }],
      position: { x: 380, y: 110 }
    },

    // 2. Shell
    {
      id: "linux-shell",
      kind: "milestone",
      label: "Shell",
      description: "Write automated scripts, configure environment variables, and chain program outputs using pipes and redirection.",
      position: { x: 60, y: 220 }
    },
    {
      id: "linux-bash-scripting",
      kind: "subtopic",
      parentId: "linux-shell",
      label: "Bash Scripting",
      description: "Bash scripting automates tasks. Master variables assignment, conditional checks (if/else), loop routines (for, while), script arguments input, and tracking exit codes values.",
      links: [{ title: "GNU Bash Reference Manual", url: "https://www.gnu.org/software/bash/manual/bash.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "linux-env-variables",
      kind: "subtopic",
      parentId: "linux-shell",
      label: "Environment Variables",
      description: "Environment variables configure dynamic settings globally. Study shell profile startup files (.bashrc, .bash_profile), export keyword configurations, PATH definitions, and reading configurations.",
      links: [{ title: "Bash Startup Files Guide", url: "https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "linux-pipes-redirection",
      kind: "subtopic",
      parentId: "linux-shell",
      label: "Pipes & Redirection",
      description: "Pipes and redirections link program input and output. Master redirecting data outputs (stdout via >, stderr via 2>), appending outputs (>>), routing file inputs (<), and chaining commands outputs via pipes (|).",
      links: [{ title: "GNU Bash Redirection", url: "https://www.gnu.org/software/bash/manual/html_node/Redirections.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. Process Management
    {
      id: "linux-process-management",
      kind: "milestone",
      label: "Process Management",
      description: "Monitor executing programs, manage server daemons, and control command jobs.",
      position: { x: 60, y: 440 }
    },
    {
      id: "linux-ps-top",
      kind: "subtopic",
      parentId: "linux-process-management",
      label: "ps & top",
      description: "ps and top audit running processes details. Learn listing process ids (PID), CPU/memory bounds tracking, sending kill signals (kill, killall), and tracing system resource limits.",
      links: [{ title: "procps-ng Utilities docs", url: "https://gitlab.com/procps-ng/procps" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "linux-systemd",
      kind: "subtopic",
      parentId: "linux-process-management",
      label: "systemd",
      description: "systemd manages system services and initialization. Study writing custom service configurations, reloading service daemons (systemctl), managing boot startup settings, and reading logs via journalctl.",
      links: [{ title: "systemd Documentation System", url: "https://systemd.io/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "linux-job-control",
      kind: "subtopic",
      parentId: "linux-process-management",
      label: "Job Control",
      description: "Job control manages foreground and background shell commands. Learn putting commands in the background (&), pausing jobs (Ctrl+Z), resuming processes (bg, fg), and listing jobs status (jobs).",
      links: [{ title: "GNU Bash Job Control", url: "https://www.gnu.org/software/bash/manual/html_node/Job-Control-Basics.html" }],
      position: { x: 380, y: 550 }
    },

    // 4. Networking
    {
      id: "linux-networking",
      kind: "milestone",
      label: "Networking",
      description: "Connect safely to remote servers, query network endpoints, and manage firewall barriers.",
      position: { x: 60, y: 660 }
    },
    {
      id: "linux-ssh",
      kind: "subtopic",
      parentId: "linux-networking",
      label: "SSH",
      description: "SSH enables secure shell terminal access. Study key generation commands (ssh-keygen), copying keys to hosts, configuring ssh/sshd configuration parameters, port forwarding, and configuring host profiles.",
      links: [{ title: "OpenSSH Documentation", url: "https://www.openssh.com/manual.html" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "linux-curl-wget",
      kind: "subtopic",
      parentId: "linux-networking",
      label: "curl/wget",
      description: "curl and wget fetch web resources from terminals. Master setting HTTP request header parameters, saving output files, passing payload arguments, and diagnosing endpoint responses.",
      links: [{ title: "curl Documentation Guide", url: "https://curl.se/docs/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "linux-firewall",
      kind: "subtopic",
      parentId: "linux-networking",
      label: "Firewall (ufw/iptables)",
      description: "Firewalls block incoming ports and route networks interface traffic. Study ufw commands (allow, deny, status), raw iptables chains configuration, NAT rules, and auditing active connections.",
      links: [{ title: "Ubuntu UFW Documentation", url: "https://help.ubuntu.com/community/UFW" }],
      position: { x: 380, y: 770 }
    },

    // 5. Package Management
    {
      id: "linux-package-management",
      kind: "milestone",
      label: "Package Management",
      description: "Install pre-compiled binary packages, build programs from source code, and update repository repositories.",
      position: { x: 60, y: 880 }
    },
    {
      id: "linux-package-managers",
      kind: "subtopic",
      parentId: "linux-package-management",
      label: "apt/yum",
      description: "apt and yum automate package management in Debian and RedHat distributions. Study updating package indexes, upgrading dependencies packages, installing binaries, and purging files.",
      links: [{ title: "Debian APT Documentation", url: "https://wiki.debian.org/Apt" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "linux-compiling-source",
      kind: "subtopic",
      parentId: "linux-package-management",
      label: "Compiling from Source",
      description: "Compiling source code builds packages manually from raw files. Master dependency checks, running configure scripts, generating compile setups via make, and installing binaries via make install.",
      links: [{ title: "GNU Make Reference", url: "https://www.gnu.org/software/make/manual/make.html" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "linux-package-repositories",
      kind: "subtopic",
      parentId: "linux-package-management",
      label: "Package Repositories",
      description: "Package repositories reference target servers hosting packages. Study configuring sources.list definitions, adding custom PPA paths, importing pgp signing keys, and auditing repositories.",
      links: [{ title: "Debian SourcesList Wiki", url: "https://wiki.debian.org/SourcesList" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-linux-basics-linux-shell", source: "linux-basics", target: "linux-shell" },
    { id: "e-linux-shell-linux-process-management", source: "linux-shell", target: "linux-process-management" },
    { id: "e-linux-process-management-linux-networking", source: "linux-process-management", target: "linux-networking" },
    { id: "e-linux-networking-linux-package-management", source: "linux-networking", target: "linux-package-management" }
  ]
};
