import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-8xl font-black text-accent tracking-widest animate-pulse">404</h1>
        <h2 className="text-2xl font-bold text-text-primary mt-4 tracking-tight">Page Not Found</h2>
        <p className="text-text-secondary mt-2 max-w-sm font-medium">
          This path does not exist. It might have been moved, renamed, or is under construction.
        </p>
        <Link href="/" className="mt-8">
          <Button variant="outline" className="px-6 py-2.5 font-semibold transition-all">
            Back to Home
          </Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
