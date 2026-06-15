import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import AuthButtons from "./AuthButtons";
import SearchCommand from "./SearchCommand";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full h-[56px] bg-background border-b border-border flex items-center justify-between px-4 sm:px-8">
      {/* Left: Logo & Search */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-white font-bold text-lg hover:text-white transition-colors">
          taskflow.sh
        </Link>
        <SearchCommand />
      </div>

      {/* Center: Nav links (Desktop only) */}
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/taskflows" className="text-muted hover:text-white transition-colors text-sm font-medium">
          Taskflows
        </Link>
        <Link href="/guides" className="text-muted hover:text-white transition-colors text-sm font-medium">
          Guides
        </Link>
        <Link href="#" className="text-muted hover:text-white transition-colors text-sm font-medium">
          Best Practices
        </Link>
      </nav>

      {/* Right: Auth buttons (Desktop) & Menu icon (Mobile) */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          <AuthButtons />
        </div>
        <div className="sm:hidden">
          <Button variant="ghost" size="icon" className="text-muted hover:text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
