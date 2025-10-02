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
import { Button as MovingBorderButton } from '@/components/ui/moving-border';

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
        <MovingBorderButton
          borderRadius="0.75rem"
          className="w-full relative bg-slate-900 text-white"
          disabled={!isVerified}
          containerClassName="h-10 w-full"
        >
          Verify
        </MovingBorderButton>
      </CardFooter>
    </Card>
  );
}
