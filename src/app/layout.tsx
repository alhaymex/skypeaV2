import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Navbar from "@/components/common/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Skypea - Elevate Your Blogging Experience",
    template: "%s - Skypea",
  },
  description:
    "Craft compelling stories, engage your audience, and soar to new heights with Skypea's innovative blogging and newsletter platform.",
  keywords: [
    "blog",
    "newsletter",
    "content creation",
    "writing platform",
    "audience engagement",
  ],
  authors: [{ name: "Alhaymex" }],
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
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
