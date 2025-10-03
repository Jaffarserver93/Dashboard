import { DotGrid } from "@/components/dot-grid";
import { VerifyDialog } from "@/components/verify-dialog";
import LoginPage from "./login/page";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const isCloudflareEnabled = process.env.CLOUDFLARE_ENABLED === 'true';
  const isVerified = searchParams?.verified === 'true';

  // If cloudflare is enabled AND the user is not verified yet, show the dialog.
  if (isCloudflareEnabled && !isVerified) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
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
        <main className="flex flex-1 items-center justify-center">
          <VerifyDialog />
        </main>
      </div>
    );
  }

  // Otherwise, show the login page.
  return <LoginPage />;
}
