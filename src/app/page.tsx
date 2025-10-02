import { DotGrid } from "@/components/dot-grid";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#291d3b"
        activeColor="#00FFFF"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
      <main className="flex-1"></main>
    </div>
  );
}
