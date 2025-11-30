// src/components/customer-slideshow.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const customerImages = [
  "/company/1.png",
  "/company/2.png",
  "/company/3.png",
  "/company/4.png",
]

export function CustomerSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % customerImages.length
        return next
      })
    }, 4000)

    return () => clearInterval(interval)
  }, []) // ← kosongin dependency biar stabil

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Trusted by Teams & Clubs
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-96 md:h-[500px] lg:h-[600px]"
              >
                <Image
                  src={customerImages[current]}
                  alt={`SOLID Customer ${current + 1}`}
                  fill
                  className="object-contain"
                  priority={current <= 1} // preload 2 pertama aja
                  sizes="(max-width: 768px) 90vw, 80vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots + counter */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="flex gap-3">
              {customerImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 ${
                    i === current 
                      ? "w-12 h-3 bg-gray-800 rounded-full" 
                      : "w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-700 font-semibold text-lg">
              {current + 1} / {customerImages.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}