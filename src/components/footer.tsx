import Link from "next/link";

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

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 py-12">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 text-sm md:grid-cols-3 md:px-6">
        <div className="flex flex-col gap-4">
          <Link href="#" className="flex items-center gap-3" prefetch={false}>
            <Logo />
            <span className="text-xl font-semibold text-foreground">
              Dot Landing
            </span>
          </Link>
          <p className="text-muted-foreground">
            The ultimate starting point for your next project.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <div className="grid gap-2">
            <h3 className="font-semibold">Product</h3>
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              About Us
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Careers
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Dot Landing, Inc.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
