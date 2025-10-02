"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const { toast, dismiss } = useToast();

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (consent !== "true") {
        setShowConsent(true);
      }
    } catch (e) {
      // localStorage is not available
      setShowConsent(true);
    }
  }, []);

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
    }
  }, [showConsent, toast]);

  return null;
}
