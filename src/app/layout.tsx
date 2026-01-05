import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/lib/i18n/context";
import { HtmlLangSync } from "@/components/layout/HtmlLangSync";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://maplesgedu.com"),
  title: "Maple Group - Study, Work & Live in Singapore",
  description:
    "Your trusted partner for Study Abroad, Immigration, and Concierge Services in Singapore.",
  applicationName: "Maple Group",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Maple Group - Study, Work & Live in Singapore",
    description:
      "Your trusted partner for Study Abroad, Immigration, and Concierge Services in Singapore.",
    url: "/",
    siteName: "Maple Group",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Group - Study, Work & Live in Singapore",
    description:
      "Your trusted partner for Study Abroad, Immigration, and Concierge Services in Singapore.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
`}
            </Script>
          </>
        ) : null}
        <I18nProvider>
          <HtmlLangSync />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <WhatsAppButton />
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
