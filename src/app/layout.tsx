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

// Metadata SEO & Social
export const metadata: Metadata = {
  title: "Produksi Tas & Jersey Custom | Satuan & Tim – Solid Brand",
  description:
    "Solid Brand melayani penjualan tas premium dan produksi jersey custom. Bisa order satuan, tim, komunitas, hingga produksi brand dengan desain eksklusif dan bahan berkualitas.",

  icons: {
    icon: "/logo/logo.png",
  },

  keywords: [
    // TAS
    "tas custom",
    "produksi tas",
    "tas premium",
    "tas konveksi",
    "tas brand lokal",
    "tas custom satuan",
    "tas custom grosir",

    // JERSEY
    "jersey custom",
    "jersey olahraga",
    "jersey futsal custom",
    "jersey basket custom",
    "jersey voli custom",
    "jersey badminton custom",
    "jersey tim",
    "jersey komunitas",

    // BISNIS
    "konveksi tas dan jersey",
    "produksi tas dan jersey",
    "custom jersey satuan",
    "custom jersey tim",
    "vendor jersey custom",
    "vendor tas custom",

    // BRAND
    "Solid Brand",
    "solidbrand id",
  ],

  generator: "Solid Brand",
  metadataBase: new URL("https://solidbrand.id"),

  openGraph: {
    title: "Produksi Tas & Jersey Custom | Satuan & Tim – Solid Brand",
    description:
      "Jual tas premium & terima custom jersey olahraga. Melayani order satuan, tim, komunitas, hingga produksi brand.",
    url: "https://solidbrand.id",
    siteName: "Solid Brand",
    images: [
      {
        url: "https://solidbrand.id/og-image.png",
        width: 1200,
        height: 630,
        alt: "Produksi Tas & Jersey Custom Solid Brand",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Produksi Tas & Jersey Custom | Solid Brand",
    description:
      "Vendor tas & jersey custom. Bisa satuan, tim, komunitas, hingga produksi brand.",
    images: ["https://solidbrand.id/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${geist.variable} ${manrope.variable} antialiased`}
    >
      <head>
        <link rel="icon" href="/logo/favicon.png" type="image/png" />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* ✅ Sidebar Cart selalu available */}
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





