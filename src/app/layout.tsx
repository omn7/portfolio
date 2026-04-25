import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";
import "../index.css";
// import { TooltipProvider } from "@/components/ui/tooltip"; // add back if needed

export const metadata: Metadata = {
  title: "Om Narkhede | AI Engineer & Developer Portfolio",
  description: "Portfolio of Om Narkhede, AI Engineer and Developer. Explore projects, blogs, resume, and more on AI, coding, and technology.",
  keywords: "Om Narkhede, AI, Portfolio, Developer, Resume, Projects, Blog, LangChain, BAML, Fuzzy Parsing, React, Typescript, Pune",
  authors: [{ name: "Om Narkhede" }],
  openGraph: {
    title: "Om Narkhede | AI Engineer & Developer Portfolio",
    description: "Portfolio of Om Narkhede, AI Engineer and Developer. Explore projects, blogs, resume, and more on AI, coding, and technology.",
    url: "https://omnarkhede.tech/",
    siteName: "Om Narkhede",
    images: [
      {
        url: "https://omnarkhede.tech/ogImage.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Narkhede | AI Engineer & Developer Portfolio",
    description: "Portfolio of Om Narkhede, AI Engineer and Developer. Explore projects, blogs, resume, and more on AI, coding, and technology.",
    site: "@omnarkhede",
    images: ["https://omnarkhede.tech/ogImage.png"],
  },
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
            <Sonner />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
