import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Inter,
  Roboto,
  Open_Sans,
  Nunito,
  Lexend,
  JetBrains_Mono,
  Fira_Code,
  Source_Code_Pro,
  Roboto_Mono,
  Playfair_Display,
  Montserrat,
  Raleway,
} from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "./layout-client";

// Default shadcn fonts
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// UI/Body Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

// Code/Monospace Fonts
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

// Display/Headline Fonts
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

// Combine all font variables
const fontVariables = [
  geist.variable,
  geistMono.variable,
  inter.variable,
  roboto.variable,
  openSans.variable,
  nunito.variable,
  lexend.variable,
  jetbrainsMono.variable,
  firaCode.variable,
  sourceCodePro.variable,
  robotoMono.variable,
  playfairDisplay.variable,
  montserrat.variable,
  raleway.variable,
].join(" ");

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
    <html
      lang="en"
      data-density="default"
      data-radius-mode="density"
      data-ui-font="geist"
      data-code-font="geist-mono"
      data-display-font="same-as-ui"
      data-color-preset="neutral"
      data-neutral-scale="gray"
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
