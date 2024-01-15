import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { metadataConfig } from "@/config/metadata";

import { cn } from "@/lib/utils";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import GlobalProviders from "@/app/_providers/global-providers";

const cal_sans = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
  display: "block",
});

export const metadata: Metadata = {
  metadataBase: new URL(metadataConfig.url),
  title: {
    template: `%s — ${metadataConfig.title}`,
    default: metadataConfig.title, // a default is required when creating a template
  },
  keywords: metadataConfig.keywords,
  description: metadataConfig.description,
  openGraph: {
    title: metadataConfig.title,
    description: metadataConfig.description,
    url: metadataConfig.url,
    siteName: metadataConfig.title,
    images: [metadataConfig.socialBanner],
    locale: "id",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${cal_sans.variable}`}
    >
      <body className={cn("min-h-screen bg-light antialiased dark:bg-dark")}>
        <GlobalProviders>
          <Header />
          {children}
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
}
