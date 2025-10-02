"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const { toast } = useToast();

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

  const handleAccept = () => {
    try {
      localStorage.setItem("cookie_consent", "true");
    } catch (e) {
      // localStorage is not available
    }
    setShowConsent(false);
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
          <Button onClick={() => {
            handleAccept();
            // Manually dismiss the toast since duration is Infinity
             // We need to dismiss it manually
            (window as any).dismissToast(id);
          }}>Accept</Button>
        ),
      });
      // A bit of a hack to allow manual dismissal outside the component
      (window as any).dismissToast = (toastId: string) => {
        (window as any).toast?.dismiss(toastId);
      }
    }
  }, [showConsent, toast]);

  return null;
}
