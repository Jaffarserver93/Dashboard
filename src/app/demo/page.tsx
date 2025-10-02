export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <main className="flex flex-1 flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Welcome to the Demo Page!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You have been successfully verified.
        </p>
      </main>
    </div>
  );
}
