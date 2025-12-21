// src/app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Script from "next/script";
import CartSidebar from "@/components/CartSidebar";

// Fonts
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

// 🌍 Global SEO Metadata
export const metadata: Metadata = {
  title: "Custom Bags & Sports Jerseys Manufacturer | Solid Brand",
  description:
    "Solid Brand is a professional manufacturer of premium custom bags and sports jerseys. Serving individual orders, teams, communities, and global brand-scale production with high-quality materials and exclusive designs.",

  icons: {
    icon: "/logo/logo.png",
  },

  keywords: [
    // 🌍 EN — GLOBAL
    "custom bags manufacturer",
    "custom sports jerseys",
    "custom jersey supplier",
    "premium custom bags",
    "custom backpack manufacturer",
    "custom sling bag",
    "custom travel bag",
    "custom team jerseys",
    "sportswear manufacturer",
    "custom apparel production",
    "private label bags",
    "OEM bags manufacturer",
    "OEM jersey manufacturer",

    // 🇮🇩 ID — LOCAL (tetap dipertahankan)
    "tas custom",
    "produksi tas",
    "tas premium",
    "konveksi tas",
    "tas custom satuan",
    "tas custom grosir",
    "jersey custom",
    "jersey olahraga",
    "jersey futsal custom",
    "jersey basket custom",
    "jersey voli custom",
    "vendor jersey custom",
    "vendor tas custom",

    // BRAND
    "Solid Brand",
    "solidbrand",
    "solidbrand indonesia",
  ],

  generator: "Solid Brand",
  metadataBase: new URL("https://solidbrand.id"),

  openGraph: {
    title: "Custom Bags & Sports Jerseys Manufacturer | Solid Brand",
    description:
      "Premium custom bags and sports jerseys manufacturer. Available for individual orders, teams, communities, and brand-scale production worldwide.",
    url: "https://solidbrand.id",
    siteName: "Solid Brand",
    images: [
      {
        url: "https://solidbrand.id/og-image.png",
        width: 1200,
        height: 630,
        alt: "Custom Bags & Sports Jerseys by Solid Brand",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Custom Bags & Sports Jerseys Manufacturer | Solid Brand",
    description:
      "Premium custom bags & sports jerseys manufacturer for teams, communities, and brands worldwide.",
    images: ["https://solidbrand.id/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${manrope.variable} antialiased`}
    >
      <head>
        <link rel="icon" href="/logo/favicon.png" type="image/png" />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* ✅ Sidebar Cart always available */}
        <CartSidebar />

        {/* ✅ PayPal only */}
        <Script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&components=hosted-fields,buttons&currency=IDR&intent=capture&disable-funding=credit,card`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
