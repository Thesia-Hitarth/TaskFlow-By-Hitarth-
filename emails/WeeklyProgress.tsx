import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
  Section,
} from "@react-email/components";

interface WeeklyProgressEmailProps {
  name: string;
  streakDays: number;
  nodesCompletedLastWeek: number;
  topRoadmap: string;
  topRoadmapPercent: number;
  nextNodeLabel: string;
  nextNodeRoadmap: string;
}

export function WeeklyProgressEmail({
  name,
  streakDays,
  nodesCompletedLastWeek,
  topRoadmap,
  topRoadmapPercent,
  nextNodeLabel,
  nextNodeRoadmap,
}: WeeklyProgressEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>
            Your week in review, {name} 👋
          </Heading>

          <Section style={bannerSectionStyle}>
            <Text style={bannerSublabelStyle}>Last week you completed</Text>
            <Text style={bannerCountStyle}>
              {nodesCompletedLastWeek} {nodesCompletedLastWeek === 1 ? "node" : "nodes"}
            </Text>
            {streakDays > 0 && (
              <Text style={streakTextStyle}>
                🔥 {streakDays}-day streak — keep it going!
              </Text>
            )}
          </Section>

          <Text style={bodyTextStyle}>
            Your most active path was <strong style={{ textTransform: "capitalize" }}>{topRoadmap}</strong> — you&apos;re now at{" "}
            <strong>{topRoadmapPercent}%</strong> completion.
          </Text>

          <Text style={bodyTextStyle}>
            Pick up where you left off with{" "}
            <strong>{nextNodeLabel}</strong> on the {nextNodeRoadmap} path.
          </Text>

          <Button
            href={`https://task-flow-by-hitarth.vercel.app/${nextNodeRoadmap.toLowerCase()}`}
            style={buttonStyle}
          >
            Continue Learning →
          </Button>

          <Hr style={dividerStyle} />
          <Text style={footerTextStyle}>
            TaskFlow · You&apos;re receiving this because you have an active account.<br />
            <a href="https://task-flow-by-hitarth.vercel.app/dashboard" style={{ color: "#94a3b8" }}>
              Unsubscribe / Dashboard
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Inline styles for email compatibility
const mainStyle: React.CSSProperties = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  backgroundColor: "#f8fafc",
  margin: "0",
  padding: "0",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "520px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  border: "1px border #e2e8f0",
};

const headingStyle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#1e293b",
  letterSpacing: "-0.025em",
  margin: "0 0 20px",
};

const bannerSectionStyle: React.CSSProperties = {
  backgroundColor: "#fef3c7", // amber-100
  borderRadius: "12px",
  padding: "20px",
  margin: "20px 0",
  border: "1px solid #fde68a",
};

const bannerSublabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  fontWeight: "700",
  color: "#b45309",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const bannerCountStyle: React.CSSProperties = {
  margin: "4px 0 0",
  fontSize: "32px",
  fontWeight: "900",
  color: "#d97706",
};

const streakTextStyle: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: "13px",
  fontWeight: "700",
  color: "#b45309",
};

const bodyTextStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#475569",
  margin: "16px 0",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#f59e0b", // amber-500 brand
  color: "#000000",
  padding: "12px 24px",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "700",
  display: "inline-block",
  textDecoration: "none",
  marginTop: "16px",
  textAlign: "center",
};

const dividerStyle: React.CSSProperties = {
  margin: "32px 0",
  borderColor: "#e2e8f0",
};

const footerTextStyle: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#94a3b8",
  textAlign: "center",
};
