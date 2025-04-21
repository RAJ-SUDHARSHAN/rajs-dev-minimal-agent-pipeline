"use client";

import React from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

export default function RB2BTracking() {
  const pathname = usePathname();
  const SCRIPT_ID = "rb2b-tracking-script";
  const SCRIPT_KEY = "1N5W0HMJERO5";
  const SCRIPT_BASE_URL = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/";
  const SCRIPT_URL = `${SCRIPT_BASE_URL}${SCRIPT_KEY}/${SCRIPT_KEY}.js.gz`;

  return (
    <Script
      id={SCRIPT_ID}
      src={SCRIPT_URL}
      strategy="afterInteractive"
      key={pathname}
    />
  );
}
