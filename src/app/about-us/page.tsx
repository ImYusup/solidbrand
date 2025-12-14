// src/app/about-us/page.tsx
"use client";

import { Shirt, Briefcase, MapPin } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white">
      <section className="py-20 container mx-auto px-4 flex-1">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            Tentang <span className="text-primary">SolidBrand</span>
          </h1>
          <p className="text-lg text-muted-foreground font-serif">
            Produksi Tas Premium & Jersey Custom dari Bandung
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200">

          {/* INTRO */}
          <div className="grid md:grid-cols-3 gap-8 items-center mb-10">

            {/* LOGO — FIX TOTAL, NO SPINNER */}
            <div className="flex justify-center">
              <div className="w-36 h-36 rounded-2xl bg-primary/10 flex items-center justify-center">
                <img
                  src="/logo/icon.png"
                  alt="SolidBrand Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Siapa Kami?</h2>
              <p className="text-muted-foreground font-serif leading-relaxed mb-4">
                <strong>SolidBrand</strong> adalah brand lokal yang bergerak di
                bidang <strong>produksi tas premium</strong> dan
                <strong> jersey olahraga custom</strong>. Kami melayani kebutuhan
                individu, tim, komunitas, hingga produksi untuk brand dengan
                standar kualitas tinggi.
              </p>
              <p className="text-muted-foreground font-serif leading-relaxed">
                Fokus kami adalah menghadirkan produk yang fungsional, kuat, dan
                memiliki identitas desain yang solid.
              </p>
            </div>
          </div>

          {/* PRODUK */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Produk & Layanan Kami
            </h3>

            <ul className="space-y-4 text-muted-foreground font-serif">
              <li className="flex gap-3 items-start">
                <Briefcase className="h-5 w-5 text-primary mt-1" />
                <span>
                  <strong>Tas & Luggage Custom:</strong> Sling bag, backpack,
                  travel bag, tas kerja, dan tas promosi dengan bahan premium.
                </span>
              </li>

              <li className="flex gap-3 items-start">
                <Shirt className="h-5 w-5 text-primary mt-1" />
                <span>
                  <strong>Jersey Olahraga Custom:</strong> Futsal, basket, voli,
                  badminton, dan jersey komunitas — bisa satuan maupun tim.
                </span>
              </li>
            </ul>
          </div>

          {/* WHY US */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Kenapa Memilih SolidBrand?
            </h3>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground font-serif">
              <li>Terima order satuan, tim, dan produksi brand</li>
              <li>Bahan pilihan & jahitan rapi</li>
              <li>Bisa custom desain sesuai kebutuhan</li>
              <li>Produksi lokal Bandung</li>
              <li>Harga kompetitif & transparan</li>
            </ul>
          </div>

          {/* LOCATION */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">
              Lokasi Produksi
            </h3>

            <div className="flex items-start gap-3 text-muted-foreground font-serif">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <span>Bandung – Jawa Barat, Indonesia</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
