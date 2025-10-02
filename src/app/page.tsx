import { DotGrid } from "@/components/dot-grid";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <DotGrid
        dotSize={2}
        gap={20}
        baseColor="hsl(var(--primary))"
        activeColor="hsl(var(--primary))"
        proximity={100}
        shockRadius={200}
        shockStrength={2}
        resistance={500}
        returnDuration={0.5}
        className="opacity-20"
      />
      <main className="flex-1"></main>
    </div>
  );
}
