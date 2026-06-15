import Link from "next/link";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-border py-10 px-4 sm:px-8 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top row: Logo left, Nav links right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link href="/" className="text-text-primary font-bold text-lg hover:opacity-90 transition-opacity">
            taskflow.sh
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
            <Link href="/taskflows" className="hover:text-text-primary transition-colors">
              Taskflows
            </Link>
            <Link href="/guides" className="hover:text-text-primary transition-colors">
              Guides
            </Link>
            <Link href="#" className="hover:text-text-primary transition-colors">
              FAQs
            </Link>
            <Link href="#" className="hover:text-text-primary transition-colors">
              YouTube
            </Link>
          </div>
        </div>

        {/* Middle row: Tagline */}
        <p className="text-text-secondary text-sm max-w-2xl leading-relaxed">
          Community created taskflows, best practices, guides and articles to help you grow in your career.
        </p>

        {/* Bottom row: Copyright left, Socials right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-border pt-6 mt-2">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} taskflow.sh
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Thesia-Hitarth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent focus:outline-none"
              aria-label="GitHub profile"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent focus:outline-none"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent focus:outline-none"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent focus:outline-none"
              aria-label="YouTube"
            >
              <YoutubeIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
