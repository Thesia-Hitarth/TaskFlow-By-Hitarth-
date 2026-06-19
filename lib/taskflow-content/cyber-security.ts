import { TaskflowContent } from "./types";

export const cyberSecurityTaskflow: TaskflowContent = {
  slug: "cyber-security",
  title: "Cyber Security",
  nodes: [
    // 1. Foundations
    {
      id: "cs-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Learn the core systems administration and networking fundamentals before exploring security tools. Understanding how packets travel, how OS kernels route tasks, and Linux permissions forms the basis of all defensive and offensive security.",
      position: { x: 60, y: 0 }
    },
    {
      id: "cs-networking-basics",
      kind: "subtopic",
      parentId: "cs-foundations",
      label: "Networking Basics",
      description: "Computer networks connect resources using complex routing configurations. Master the OSI model layers, TCP/UDP packet transport handshakes, IP addressing subnet masks, DNS queries, routing protocols, and standard firewall port mappings.",
      links: [{ title: "Cisco Networking Basics", url: "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/networking-basics.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "cs-operating-systems",
      kind: "subtopic",
      parentId: "cs-foundations",
      label: "Operating Systems",
      description: "Operating Systems coordinate memory, hardware inputs, and software processes execution. Study kernel architectures, memory allocations schemes, process scheduling algorithms, standard file subsystems structures, and OS configurations.",
      links: [{ title: "OS Course Notes", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "cs-linux",
      kind: "subtopic",
      parentId: "cs-foundations",
      label: "Linux",
      description: "Linux is the standard operating system for security engineering and hosting. Master terminal shell navigation commands, user permissions ownership configurations (chmod, chown), script variables, process management, and networking configurations.",
      links: [{ title: "Linux Documentation", url: "https://www.kernel.org/doc/html/latest/" }],
      position: { x: 380, y: 110 }
    },

    // 2. Security Concepts
    {
      id: "cs-security-concepts",
      kind: "milestone",
      label: "Security Concepts",
      description: "Analyze baseline security principles, cryptographic algorithms, and attack methodologies. Understanding these threat models is essential to identify vulnerabilities and design robust defenses.",
      position: { x: 60, y: 220 }
    },
    {
      id: "cs-cia-triad",
      kind: "subtopic",
      parentId: "cs-security-concepts",
      label: "CIA Triad",
      description: "The CIA Triad dictates system defense boundaries. Master Confidentiality controls (encryption, permissions), Integrity verifications (hashing algorithms, audit logs), and Availability rules (redundancy structures, failover scaling).",
      links: [{ title: "NIST Security Principles", url: "https://csrc.nist.gov/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "cs-cryptography-basics",
      kind: "subtopic",
      parentId: "cs-security-concepts",
      label: "Cryptography Basics",
      description: "Cryptography secures data payloads in transit and at rest. Study symmetric encryption (AES), asymmetric algorithms (RSA, ECC), secure hashing algorithms (SHA-256), SSL/TLS handshake configurations, and certificate authorities.",
      links: [{ title: "OpenSSL Documentation", url: "https://www.openssl.org/docs/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "cs-common-attack-types",
      kind: "subtopic",
      parentId: "cs-security-concepts",
      label: "Common Attack Types",
      description: "Common attacks exploit network, OS, or application gaps. Identify phishing vectors, Man-in-the-Middle (MitM) captures, Distributed Denial of Service (DDoS) traffic flood configurations, SQL injection parameters, and buffer overflows.",
      links: [{ title: "MITRE ATT&CK Matrix", url: "https://attack.mitre.org/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Tools
    {
      id: "cs-tools",
      kind: "milestone",
      label: "Tools",
      description: "Master using standard industry tools to audit networks, inspect packet streams, and test web application parameters. Utilizing these utilities allows developers to identify exposures before malicious actors do.",
      position: { x: 60, y: 440 }
    },
    {
      id: "cs-wireshark",
      kind: "subtopic",
      parentId: "cs-tools",
      label: "Wireshark",
      description: "Wireshark captures and inspects real-time network packets. Master packet filters writing, capturing HTTP/S TCP handshakes, tracing streams, diagnosing packet loss, and parsing network protocol data packets.",
      links: [{ title: "Wireshark User Guide", url: "https://www.wireshark.org/docs/wsug_html_chunked/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "cs-nmap",
      kind: "subtopic",
      parentId: "cs-tools",
      label: "Nmap",
      description: "Nmap maps network nodes and audits open ports. Master host discovery commands, port state identification (-sS, -sT), OS detection parameters, banner grabbing scripts, and exporting scan configurations.",
      links: [{ title: "Nmap Reference Guide", url: "https://nmap.org/book/man.html" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "cs-burpsuite",
      kind: "subtopic",
      parentId: "cs-tools",
      label: "Burp Suite",
      description: "Burp Suite is a proxy tool used to analyze web application security. Master HTTP requests interception, testing input parameters in Repeater, custom dictionary payloads in Intruder, and verifying session cookie safety.",
      links: [{ title: "Burp Suite Docs", url: "https://portswigger.net/burp/documentation" }],
      position: { x: 380, y: 550 }
    },

    // 4. Application Security
    {
      id: "cs-app-security",
      kind: "milestone",
      label: "Application Security",
      description: "Secure web application source code, configure server frameworks, and run penetration testing procedures. This phase focuses on software logic validation and input sanitization.",
      position: { x: 60, y: 660 }
    },
    {
      id: "cs-owasp-top-10",
      kind: "subtopic",
      parentId: "cs-app-security",
      label: "OWASP Top 10",
      description: "The OWASP Top 10 is the standard awareness guide outlining critical web vulnerabilities. Master mitigating SQL injection, Cross-Site Scripting (XSS), Broken Object-Level Authorization (BOLA), and security misconfigurations.",
      links: [{ title: "OWASP Top 10 Project", url: "https://owasp.org/www-project-top-ten/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "cs-secure-coding",
      kind: "subtopic",
      parentId: "cs-app-security",
      label: "Secure Coding",
      description: "Secure coding prevents security flaws by applying defensive practices. Study data input sanitization, encoding outputs, secure storage of credentials, parameterized SQL statements, and memory boundaries checking.",
      links: [{ title: "SEI CERT Coding Standards", url: "https://www.securecoding.cert.org/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "cs-penetration-testing",
      kind: "subtopic",
      parentId: "cs-app-security",
      label: "Penetration Testing",
      description: "Penetration testing audits software security via simulated attacks. Master reconnaissance steps, vulnerability mappings, exploit execution setups, privilege escalation, and writing technical remediation reports.",
      links: [{ title: "OSCP Guidelines", url: "https://www.offsec.com/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Certifications & Practice
    {
      id: "cs-certifications-practice",
      kind: "milestone",
      label: "Certifications & Practice",
      description: "Validate security engineering capabilities using standardized professional certifications and practice offensive and defensive techniques inside Capture The Flag (CTF) environments.",
      position: { x: 60, y: 880 }
    },
    {
      id: "cs-comptia-security-plus",
      kind: "subtopic",
      parentId: "cs-certifications-practice",
      label: "CompTIA Security+",
      description: "CompTIA Security+ validates baseline security principles. Study corporate risk management rules, network infrastructure, identity controls architectures, threat signatures, and basic compliance regulations.",
      links: [{ title: "CompTIA Security+ Certification", url: "https://www.comptia.org/certifications/security" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "cs-ctf-practice",
      kind: "subtopic",
      parentId: "cs-certifications-practice",
      label: "CTF Practice",
      description: "CTFs provide gamified environments to practice security exploits. Solve binary analysis challenges, reverse engineer code, exploit web forms, decode crypto inputs, and search for flags inside mock servers.",
      links: [{ title: "CTFTime Platform", url: "https://ctftime.org/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "cs-ceh",
      kind: "subtopic",
      parentId: "cs-certifications-practice",
      label: "CEH",
      description: "Certified Ethical Hacker outlines formal footprinting methodologies. Learn scanning network topologies rules, Trojan threat analysis, SQL injection exploits frameworks, and using security scanner suites.",
      links: [{ title: "EC-Council CEH", url: "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-cs-foundations-cs-security-concepts", source: "cs-foundations", target: "cs-security-concepts" },
    { id: "e-cs-security-concepts-cs-tools", source: "cs-security-concepts", target: "cs-tools" },
    { id: "e-cs-tools-cs-app-security", source: "cs-tools", target: "cs-app-security" },
    { id: "e-cs-app-security-cs-certifications-practice", source: "cs-app-security", target: "cs-certifications-practice" }
  ]
};
