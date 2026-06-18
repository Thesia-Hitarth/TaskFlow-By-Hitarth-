import Link from "next/link";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
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

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hitarth-thesia-2043b0170/",
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/Thesia-Hitarth",
    icon: GithubIcon,
  },
  {
    label: "Portfolio",
    href: "https://hitarththesia.vercel.app/",
    icon: GlobeIcon,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-border py-10 px-4 sm:px-8 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top row: Logo left, Nav links right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link href="/" className="text-text-primary font-bold text-lg hover:opacity-90 transition-opacity">
            task-flow-by-hitarth
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
            <Link href="/taskflows" className="hover:text-text-primary transition-colors font-medium">
              Taskflows
            </Link>
            <Link href="/guides" className="hover:text-text-primary transition-colors font-medium">
              Guides
            </Link>
            <Link href="/best-practices" className="hover:text-text-primary transition-colors font-medium">
              Best Practices
            </Link>
            <Link href="/compare" className="hover:text-text-primary transition-colors font-medium">
              Compare
            </Link>
          </div>
        </div>

        {/* Middle row: Tagline */}
        <p className="text-text-secondary text-sm max-w-2xl leading-relaxed">
          Community created taskflows, best practices, guides and articles to help you grow in your career.
        </p>

        {/* Bottom row: Copyright left, Socials right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-border pt-6 mt-2">
          <p className="text-muted text-xs font-semibold">
            &copy; {new Date().getFullYear()} task-flow-by-hitarth
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/40 text-text-secondary transition-all duration-200 hover:border-accent hover:text-accent hover:bg-border/40 focus:outline-none"
                  aria-label={social.label}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
