import type { Metadata } from "next";
import "./globals.css";
import { RootLayoutClient } from "./layout-client";

export const metadata: Metadata = {
  title: "Density Playground",
  description: "Test and validate UI density modes - compact, default, spacious",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-density="default" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
