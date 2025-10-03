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
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const router = useRouter();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!token) {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: 'No verification token received. Please try again.',
      });
      return;
    }
    setIsLoading(true);
    // Clear previous verification result before starting a new one
    setVerificationResult(null); 
    try {
      const result = await verifyTurnstile(token);
      
      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        router.push('/?verified=true');
      } else {
        setVerificationResult(result);
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: result.message,
        });
        // Reset Turnstile on failure by changing the state
        setIsVerified(false);
        setToken(null);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      setVerificationResult({ success: false, message: errorMessage });
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
       // Reset Turnstile on failure
      setIsVerified(false);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

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
          key={token} // Reset the component when token is reset
          siteKey={siteKey}
          onSuccess={(token) => {
            setIsVerified(true);
            setToken(token);
          }}
          onExpire={() => {
            setIsVerified(false);
            setToken(null);
          }}
          onError={() => {
            setIsVerified(false);
            setToken(null);
          }}
          options={{
            theme: 'dark',
          }}
        />
        {verificationResult && !verificationResult.success && (
          <Alert variant={'destructive'} className="mt-4">
            <AlertDescription>{verificationResult.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <MovingBorderButton
          onClick={handleVerify}
          borderRadius="0.75rem"
          className="w-full relative bg-slate-900 text-white"
          disabled={!isVerified || isLoading}
          containerClassName="h-10 w-full"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </MovingBorderButton>
      </CardFooter>
    </Card>
  );
}
