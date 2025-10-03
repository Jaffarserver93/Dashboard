'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { verifyTurnstile } from '@/app/actions/verify-turnstile';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from './ui/alert';

export function VerifyDialog() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [widgetKey, setWidgetKey] = useState(`turnstile-${Date.now()}`);

  const router = useRouter();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!token) {
      setVerificationError('The verification challenge has expired. Please complete it again.');
      return;
    }
    setIsLoading(true);
    setVerificationError(null); // Clear previous errors before a new attempt

    try {
      const result = await verifyTurnstile(token);

      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        router.push('/?verified=true');
      } else {
        setVerificationError(result.message);
        // Reset Turnstile on failure to allow a retry
        setWidgetKey(`turnstile-${Date.now()}`);
        setToken(null);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      setVerificationError(errorMessage);
      // Reset Turnstile on failure
      setWidgetKey(`turnstile-${Date.now()}`);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuccess = (t: string) => {
    setToken(t);
    setVerificationError(null); // Clear any errors when a new token is received
  }

  const handleExpire = () => {
    setToken(null);
    setVerificationError("The verification challenge has expired. Please complete it again.");
  }

  const handleError = () => {
    setVerificationError("Could not load the verification challenge. Please check your connection and try again.");
    setToken(null);
  }

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
      <CardContent className="flex flex-col items-center gap-4">
        <Turnstile
          key={widgetKey}
          siteKey={siteKey}
          onSuccess={handleSuccess}
          onExpire={handleExpire}
          onError={handleError}
          options={{
            theme: 'dark',
          }}
        />
        {verificationError && (
          <Alert variant={'destructive'} className="mt-4">
            <AlertDescription>{verificationError}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <MovingBorderButton
          onClick={handleVerify}
          borderRadius="0.75rem"
          className="w-full relative bg-slate-900 text-white"
          disabled={!token || isLoading}
          containerClassName="h-10 w-full"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </MovingBorderButton>
      </CardFooter>
    </Card>
  );
}
