// src/components/hero-section.tsx
"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-teal-600 to-teal-800 py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* VIDEO DARI GOOGLE DRIVE — LANGSUNG GANTI LINK KAMU NANTI */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
            <iframe
              src="https://drive.google.com/file/d/1rd5YvA3U9T_25K-ZpmV7I_hxjvTSnQhG/preview"  
              title="SOLID Brand Video"
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* TOMBOL CHAT VIA WHATSAPP — DI TENGAH, GEDE, GANAS */}
        <div className="text-center">
          <a
            href="https://wa.me/6281289066999?text=Halo%20SOLID%2C%20saya%20mau%20pesan%20jersey%20%2F%20tas%20custom.%20Bisa%20dibantu%20konsultasi%20desain%20dan%20harga%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="text-xl md:text-2xl px-12 py-8 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Chat via WhatsApp Now!
            </Button>
          </a>
        </div>

      </div>
    </section>
  )
}