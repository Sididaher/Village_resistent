import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/lib/context/GameContext";
import UserGuide from "../components/nird/UserGuide";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Village Résistant - Defend Your Digital Independence",
  description: "An educational game teaching schools how to maintain digital independence through open-source solutions and sustainable technology practices.",
  keywords: ["NIRD", "open-source", "education", "digital independence", "Linux", "sustainability"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GameProvider>
          {children}
          <UserGuide />
        </GameProvider>
      </body>
    </html>
  );
}
