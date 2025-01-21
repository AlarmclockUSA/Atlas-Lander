import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://atlastraining.io'),
  title: "Atlas | The World's First AI-Powered REI Sales Training",
  description: "Transform your real estate investing with the world's first AI-powered sales training system. Practice with ultra-realistic seller simulations and master deal negotiations.",
  openGraph: {
    title: "Atlas | The World's First AI-Powered REI Sales Training",
    description: "Master real estate negotiations with our groundbreaking AI training system. Practice with ultra-realistic seller simulations and close more deals.",
    url: "https://atlastraining.io",
    siteName: "Atlas Training",
    images: [
      {
        url: "/share.png",
        width: 1200,
        height: 630,
        alt: "Atlas - The World's First AI-Powered REI Sales Training",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas | Revolutionary AI REI Sales Training",
    description: "The world's first AI-powered real estate investing sales training platform",
    creator: "@AtlasTraining",
    images: ["/share.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      }
    ],
    apple: {
      url: "/apple-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
