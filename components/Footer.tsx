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
    <footer className="w-full bg-surface border-t border-border/80 py-16 px-6 sm:px-12 mt-auto transition-all duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Brand Information (Left 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-5 text-left">
          <Link href="/" className="text-text-primary font-black text-2xl tracking-tight hover:opacity-90 transition-opacity">
            TaskFlow<span className="text-accent">.</span>
          </Link>
          <p className="text-text-secondary text-sm max-w-sm leading-relaxed font-medium">
            A developer-focused platform containing community-driven learning paths, standards checklists, guidebooks, and social accountability tools to scale your engineering career.
          </p>
          <div className="flex items-center gap-2.5 mt-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/60 text-text-secondary transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/5 hover:-translate-y-[2px] focus:outline-none"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation Grid (Right 7 Columns - 4x2 Grid) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 text-left">
          
          {/* Column 1: Learn */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-text-primary/95">
              Learn
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/taskflows" className="text-text-secondary hover:text-accent transition-colors">
                  Taskflows
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-text-secondary hover:text-accent transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Standards */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-text-primary/95">
              Standards
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/best-practices" className="text-text-secondary hover:text-accent transition-colors">
                  Best Practices
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-text-secondary hover:text-accent transition-colors">
                  Compare
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-text-primary/95">
              Tools
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/path-finder" className="text-text-secondary hover:text-accent transition-colors">
                  Path Finder
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-text-secondary hover:text-accent transition-colors">
                  Playground
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Community */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-text-primary/95">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/showcase" className="text-text-secondary hover:text-accent transition-colors">
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="/activity" className="text-text-secondary hover:text-accent transition-colors">
                  Activity
                </Link>
              </li>
              <li>
                <Link href="/suggest" className="text-text-secondary hover:text-accent transition-colors">
                  Suggest Content
                </Link>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto border-t border-border/40 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-text-secondary/50 text-xs font-bold tracking-wide">
          &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs font-bold text-text-secondary/50">
          <Link href="/changelog" className="hover:text-accent transition-colors">
            Changelog
          </Link>
          <span>&middot;</span>
          <Link href="/terms" className="hover:text-accent transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
