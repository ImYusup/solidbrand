// src/components/hero-section.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Shirt } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const images = [
  "/homepage/taskonveksi1.png",
  "/homepage/taskonveksi2.png",
  "/homepage/taskonveksi3.png",
  "/homepage/taskonveksi4.png",
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-16 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Produksi Tas & Jersey Custom
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 mb-8"
            >
              Jual tas premium & terima custom jersey olahraga. Bisa satuan, tim, komunitas, hingga produksi brand dengan desain eksklusif.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products">
                <Button size="lg" className="text-base px-8 py-6 bg-white text-teal-700 hover:bg-gray-100">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Lihat Produk
                </Button>
              </Link>

              <a
                href="https://wa.me/6281289066999?text=Halo%20SolidBrand%2C%20saya%20ingin%20custom%20tas%20atau%20jersey.%20Bisa%20dibantu%20detailnya%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="text-base px-8 py-6 bg-white text-teal-700 hover:bg-gray-100"
                >
                  <Shirt className="mr-2 h-5 w-5" />
                  Custom via WhatsApp
                </Button>

              </a>
            </motion.div>

            {/* TRUST BADGES */}
            <div className="flex gap-6 mt-10 text-sm text-white/80">
              <div>✔ Bisa Custom Desain</div>
              <div>✔ Bahan Premium</div>
              <div>✔ Produksi Lokal</div>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-[420px]"
                >
                  <Image
                    src={images[current]}
                    alt="Produksi Tas & Jersey Custom"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* DOTS */}
            <div className="flex justify-center mt-4 gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2.5 rounded-full transition-all ${idx === current ? "w-8 bg-white" : "w-2.5 bg-white/40"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
