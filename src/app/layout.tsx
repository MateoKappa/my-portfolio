import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mateo Kapllani - Full Stack Developer",
  description:
    "Full Stack Developer with 5+ years of experience building AI-powered web applications. Expert in Next.js, React, TypeScript, and AI integration.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "AI",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Mateo Kapllani" }],
  openGraph: {
    title: "Mateo Kapllani - Full Stack Developer",
    description:
      "Full Stack Developer with 5+ years of experience building AI-powered web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
