import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import Script from "next/script";
import { metadataConfig } from "@/config/metadata";

import { cn } from "@/lib/utils";
import Header from "@/app/(home)/_components/header";

const cal_sans = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(metadataConfig.url),
  title: {
    template: `%s | ${metadataConfig.title}`,
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
      suppressHydrationWarning={true}
      className={`${GeistSans.variable} ${cal_sans.variable}`}
    >
      {/*    <Script id="theme-switcher" strategy="beforeInteractive">*/}
      {/*      {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {*/}
      {/*  document.documentElement.classList.add('dark')*/}
      {/*} else {*/}
      {/*  document.documentElement.classList.remove('dark')*/}
      {/*}`}*/}
      {/*    </Script>*/}
      <body className={cn("min-h-screen antialiased")}>
        <Header />
        {children}
      </body>
    </html>
  );
}
