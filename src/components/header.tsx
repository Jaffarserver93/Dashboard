import Link from "next/link";
import { Button } from "./ui/button";

function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="hsl(var(--primary))" />
      <circle cx="16" cy="16" r="4" fill="hsl(var(--primary-foreground))" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-3" prefetch={false}>
          <Logo />
          <span className="text-xl font-semibold text-foreground">
            jxfr
          </span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm md:flex">
          <Link
            href="#features"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <Button>Get Started</Button>
      </div>
    </header>
  );
}
