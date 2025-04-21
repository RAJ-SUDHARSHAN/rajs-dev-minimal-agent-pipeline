import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import CookieConsent from "@/components/CookieConsent";
import RB2BTracking from "@/components/RB2BTracking";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raj Sudharshan | Software Engineer",
  description:
    "Software Engineer specializing in backend architecture, cloud-native systems, and distributed applications. Experienced with AWS, NestJS, Django, FastAPI, and Kafka for building high-performance solutions.",
  keywords: [
    "Raj Sudharshan",
    "Raj Sudharshan Vidyalatha Natarajan",
    "Raj Natarajan",
    "Software Engineer",
    "Backend Developer",
    "Full Stack Developer",
    "Cloud Architect",
    "AWS Solutions Architect",
    "NestJS",
    "Django",
    "FastAPI",
    "Kafka",
    "Microservices",
    "San Jose",
    "California",
    "Bay Area",
    "Silicon Valley",
  ].join(", "),
  openGraph: {
    title: "Raj Sudharshan | Software Engineer",
    description:
      "Building scalable cloud-native systems and high-performance applications. Expertise in AWS, Python, Typescript, Redis, Kafka and distributed architecture.",
    url: "https://rajs.dev",
    siteName: "Raj Sudharshan",
    images: [
      {
        url: "/images/og-image.png",
        width: 400,
        height: 400,
        alt: "Raj Sudharshan",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="canonical" href="https://rajs.dev" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <CookieConsent />
        <RB2BTracking />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
