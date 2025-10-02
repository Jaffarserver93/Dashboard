"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function CookieConsent() {
  const { toast, dismiss } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const consent = localStorage.getItem("cookie_consent");
        if (consent !== "true") {
          setShowConsent(true);
        }
      } catch (e) {
        // localStorage is not available, assume we need to show consent
        setShowConsent(true);
      }
    }
  }, [isMounted]);

  const handleAccept = (toastId: string) => {
    try {
      localStorage.setItem("cookie_consent", "true");
    } catch (e) {
      // localStorage is not available
    }
    setShowConsent(false);
    dismiss(toastId);
  };

  useEffect(() => {
    let toastId: string | undefined;

    if (showConsent) {
      const { id } = toast({
        duration: Infinity,
        title: "We use cookies",
        description: (
          <p>
            We use cookies to ensure you get the best experience on our website.{" "}
            <Link href="/privacy" className="underline">
              Learn more
            </Link>
            .
          </p>
        ),
        action: (
          <Button onClick={() => handleAccept(id)}>Accept</Button>
        ),
      });
      toastId = id;
    }
    
    return () => {
        if(toastId) {
            dismiss(toastId);
        }
    }

  }, [showConsent, toast, dismiss]);

  return null;
}
