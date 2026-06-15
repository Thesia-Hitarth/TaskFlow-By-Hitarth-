import { TaskflowContent } from "./types";

export const networkEngineerTaskflow: TaskflowContent = {
  slug: "network-engineer",
  title: "Network Engineer",
  nodes: [
    // 1. Foundations
    {
      id: "ne-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Understand the core models of communication, address routing models, and subnetting boundaries calculations. Strong networking fundamentals form the basis of system infrastructure configurations.",
      position: { x: 60, y: 0 }
    },
    {
      id: "ne-osi-model",
      kind: "subtopic",
      label: "OSI Model",
      description: "The OSI model deconstructs networking functions into 7 layers. Study Layer 1 (Physical links) up to Layer 7 (Application requests), mapping data frames, segments, and packets transformations.",
      links: [{ title: "ISO OSI Model Specification", url: "https://www.iso.org/standard/20269.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "ne-tcp-ip",
      kind: "subtopic",
      label: "TCP/IP",
      description: "TCP/IP controls host communications over networks. Study TCP three-way handshake loops, sequence verification mechanisms, UDP lightweight transport, packet structures, and routing configurations.",
      links: [{ title: "IETF RFC 793 (TCP)", url: "https://datatracker.ietf.org/doc/html/rfc793" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "ne-subnetting",
      kind: "subtopic",
      label: "Subnetting",
      description: "Subnetting segments networks into logical subnets. Master CIDR notation parameters, calculating network/broadcast addresses, defining host limits, and configuring subnets.",
      links: [{ title: "Cisco Subnetting Guide", url: "https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html" }],
      position: { x: 380, y: 110 }
    },

    // 2. Networking Devices
    {
      id: "ne-devices",
      kind: "milestone",
      label: "Networking Devices",
      description: "Master hardware systems configurations to route, switch, and secure network traffic flows. Managing hardware devices handles local and wide area network loops.",
      position: { x: 60, y: 220 }
    },
    {
      id: "ne-routers",
      kind: "subtopic",
      label: "Routers",
      description: "Routers direct traffic packets between distinct network networks. Study dynamic routing tables configurations (OSPF, BGP), interface parameters, and gateway configurations.",
      links: [{ title: "Cisco Routing Solutions", url: "https://www.cisco.com/c/en/us/products/routers/index.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "ne-switches",
      kind: "subtopic",
      label: "Switches",
      description: "Switches direct frames within local area network (LAN) segments. Learn MAC address table lookups, configuring Virtual Local Area Networks (VLANs), Spanning Tree Protocol (STP), and trunking.",
      links: [{ title: "Cisco Switching Solutions", url: "https://www.cisco.com/c/en/us/products/switches/index.html" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "ne-firewalls",
      kind: "subtopic",
      label: "Firewalls",
      description: "Firewalls filter network traffic based on configured security rule parameters. Study stateful packet inspections, zone architectures, configuring security logs, and managing blocklists.",
      links: [{ title: "Palo Alto Firewalls Guide", url: "https://www.paloaltonetworks.com/cyberpedia/what-is-a-firewall" }],
      position: { x: 380, y: 330 }
    },

    // 3. Protocols
    {
      id: "ne-protocols",
      kind: "milestone",
      label: "Protocols",
      description: "Implement standard application-level and transport-level network protocols. These standard rules resolve domains names, assign addresses, and secure connections tunnels.",
      position: { x: 60, y: 440 }
    },
    {
      id: "ne-dns",
      kind: "subtopic",
      label: "DNS",
      description: "The Domain Name System (DNS) resolves domains names to IP addresses. Study DNS record classifications (A, AAAA, CNAME, MX), recursive resolution paths, caching rules, and server configurations.",
      links: [{ title: "IETF RFC 1035 (DNS)", url: "https://datatracker.ietf.org/doc/html/rfc1035" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "ne-dhcp",
      kind: "subtopic",
      label: "DHCP",
      description: "DHCP assigns network configurations to clients dynamically. Learn DORA IP allocation steps, lease duration configurations, gateway parameters distribution, and DHCP relay configurations.",
      links: [{ title: "IETF RFC 2131 (DHCP)", url: "https://datatracker.ietf.org/doc/html/rfc2131" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "ne-vpn",
      kind: "subtopic",
      label: "VPN",
      description: "VPN tunnels connect networks securely over public networks. Study IPSec encryption configurations, OpenVPN parameters, encapsulation protocols, tunnel metrics, and access controls.",
      links: [{ title: "OpenVPN Documentation", url: "https://openvpn.net/community-resources/" }],
      position: { x: 380, y: 550 }
    },

    // 4. Network Security
    {
      id: "ne-network-security",
      kind: "milestone",
      label: "Network Security",
      description: "Configure network security policies, address translation boundaries, and monitoring defenses. Securing networks protects internal systems from unauthorized outside connections.",
      position: { x: 60, y: 660 }
    },
    {
      id: "ne-acls",
      kind: "subtopic",
      label: "ACLs",
      description: "Access Control Lists filter traffic based on configured source and port ranges. Learn standard and extended ACL configurations, wildcard mask metrics, and assigning filter rules.",
      links: [{ title: "Cisco ACL Configurations", url: "https://www.cisco.com/c/en/us/support/docs/ip/access-lists/26448-10.html" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "ne-nat",
      kind: "subtopic",
      label: "NAT",
      description: "Network Address Translation maps private local subnets to public IPs. Learn static/dynamic NAT mappings, Port Address Translation (PAT) settings, and configuring translation rules.",
      links: [{ title: "IETF RFC 3022 (NAT)", url: "https://datatracker.ietf.org/doc/html/rfc3022" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "ne-ids-ips",
      kind: "subtopic",
      label: "IDS/IPS",
      description: "Intrusion Detection and Prevention Systems analyze packet payloads for threat patterns. Study signature scanning, traffic parsing steps, alert configurations, and mitigation rules using Snort.",
      links: [{ title: "Snort IDS Website", url: "https://www.snort.org/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Tools & Certs
    {
      id: "ne-tools-certs",
      kind: "milestone",
      label: "Tools & Certs",
      description: "Audit network packet streams and prepare for industry certification sweeps. Practicing network auditing builds troubleshooting capabilities.",
      position: { x: 60, y: 880 }
    },
    {
      id: "ne-wireshark",
      kind: "subtopic",
      label: "Wireshark",
      description: "Wireshark captures and inspects real-time network packets. Master packet filters writing, capturing HTTP/S TCP handshakes, tracing streams, diagnosing packet loss, and parsing network protocol data packets.",
      links: [{ title: "Wireshark Q&A Wiki", url: "https://wiki.wireshark.org/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "ne-cisco-ccna",
      kind: "subtopic",
      label: "Cisco CCNA",
      description: "Cisco Certified Network Associate validates foundational network skills. Study CCNA test objectives, routing configurations, VLAN configurations, subnet calculations, and basic device commands.",
      links: [{ title: "Cisco CCNA Overview", url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "ne-network-monitoring",
      kind: "subtopic",
      label: "Network Monitoring",
      description: "Monitoring systems collect network device health metrics. Study SNMP configuration rules, tracking link bandwidth, graphing packet drops, and managing alert thresholds.",
      links: [{ title: "Zabbix Monitoring System", url: "https://www.zabbix.com/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-ne-foundations-ne-devices", source: "ne-foundations", target: "ne-devices" },
    { id: "e-ne-devices-ne-protocols", source: "ne-devices", target: "ne-protocols" },
    { id: "e-ne-protocols-ne-network-security", source: "ne-protocols", target: "ne-network-security" },
    { id: "e-ne-network-security-ne-tools-certs", source: "ne-network-security", target: "ne-tools-certs" }
  ]
};
