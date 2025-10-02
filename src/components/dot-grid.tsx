import { cn } from "@/lib/utils";

export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
    >
      <svg
        className="pointer-events-none absolute h-full w-full fill-muted-foreground/10"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="dot-grid-pattern"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#dot-grid-pattern)"
        />
      </svg>
    </div>
  );
}
