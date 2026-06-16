import Link from "next/link";
import { Globe } from "lucide-react";

// Inline definitions for brand icons to bypass lucide-react version mismatches
function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hitarth-thesia-2043b0170/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/Thesia-Hitarth",
    icon: Github,
  },
  {
    label: "Portfolio",
    href: "https://hitarththesia.vercel.app/",
    icon: Globe,
  },
];

const footerNavLinks = [
  { label: "Taskflows", href: "/taskflows" },
  { label: "Guides", href: "/guides" },
  { label: "Best Practices", href: "/best-practices" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0d0d0d] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <Link href="/" className="text-white font-semibold text-sm">
              taskflow.sh
            </Link>
            <p className="text-xs text-[#737373] mt-1 max-w-xs">
              Community created taskflows, best practices, guides and articles
              to help you grow in your career.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-4">
            {footerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#737373] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-md border border-[#2a2a2a] text-[#737373] hover:border-amber-500 hover:text-amber-500 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#2a2a2a] text-xs text-[#737373]">
          © {new Date().getFullYear()} taskflow.sh
        </div>
      </div>
    </footer>
  );
}
