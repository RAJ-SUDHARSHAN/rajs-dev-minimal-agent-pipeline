"use client";

import { useState, useEffect } from "react";
import { colors } from "@/constants/colors";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 ${colors.background.tertiary} border-t ${colors.border.primary}`}
    >
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className={`${colors.text.secondary} text-sm text-center sm:text-left`}
        >
          This website uses cookies to understand site usage. By continuing to
          use this site, you agree to this.{" "}
          <a
            href="/privacy"
            className={`${colors.text.primary} hover:${colors.text.hover} underline transition-colors`}
          >
            Learn more
          </a>
        </p>
        <button
          onClick={handleAccept}
          className={`px-6 py-2 rounded-full ${colors.background.secondary} ${colors.text.primary} hover:${colors.text.hover} border ${colors.border.primary} hover:${colors.border.hover} transition-colors whitespace-nowrap`}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
