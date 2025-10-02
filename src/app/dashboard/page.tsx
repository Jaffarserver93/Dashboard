import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to your Dashboard</CardTitle>
          <CardDescription>
            You have successfully logged in with Discord and joined the server.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is your protected dashboard page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
