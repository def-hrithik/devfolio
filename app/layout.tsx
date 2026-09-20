import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/nav/site-header";
import { SiteFooter } from "@/components/nav/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hrithik Singh — Full-Stack & ML Developer",
    template: "%s | Hrithik Singh",
  },
  description:
    "Full-Stack & ML Developer building web applications, AI solutions, and blockchain systems. CSE (Data Science) undergraduate at MGMCET, Mumbai.",
  keywords: [
    "Hrithik Singh",
    "Full-Stack Developer",
    "Machine Learning",
    "Blockchain",
    "React",
    "Next.js",
    "TypeScript",
    "Web3",
    "Portfolio",
  ],
  authors: [{ name: "Hrithik Singh", url: "https://github.com/def-hrithik" }],
  creator: "Hrithik Singh",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Hrithik Singh — Full-Stack & ML Developer",
    description:
      "Building web applications, AI solutions, and blockchain systems.",
    siteName: "Hrithik Singh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrithik Singh — Full-Stack & ML Developer",
    description:
      "Building web applications, AI solutions, and blockchain systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
