'use client';

import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function VerifyDialog() {
  const [isVerified, setIsVerified] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return (
      <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Configuration Error</CardTitle>
          <CardDescription>
            The Turnstile site key is missing. Please add it to your
            environment variables.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">
            <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> is not defined.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Verify You're Human</CardTitle>
        <CardDescription>
          Please complete the check below to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Turnstile
          siteKey={siteKey}
          onSuccess={() => setIsVerified(true)}
          onExpire={() => setIsVerified(false)}
          onError={() => setIsVerified(false)}
          options={{
            theme: 'dark',
          }}
        />
      </CardContent>
      <CardFooter>
        <div className="relative group w-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Button className="w-full relative" disabled={!isVerified}>
            Verify
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
