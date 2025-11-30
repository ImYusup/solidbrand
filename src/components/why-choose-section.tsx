// src/components/why-choose-section.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shirt,
  Backpack,
  Palette,
  Truck,
  Clock,
  ShieldCheck,
  Star,
  Users,
  FileText,
  MessageCircle
} from "lucide-react"

const reasons = [
  {
    icon: Backpack,
    title: "Sling Bag • Backpack • Travel Bag • Custom Bag Premium",
    description: "Bahan import, jahitan kuat, desain modern — cocok daily, traveling, atau merchandise tim.",
  },
  {
    icon: Shirt,
    title: "Custom Jersey 100% Bebas Desain",
    description: "Full print, gradasi, foto tim, logo sponsor — semua bisa! Revisi gratis sampai 100% ACC.",
  },
  {
    icon: Palette,
    title: "Print Sublimasi Jepang/China Anti Luntur",
    description: "Warna tetap tajam & gonjreng meski dicuci 100x atau kena matahari & lumpur setiap hari.",
  },
  {
    icon: Truck,
    title: "Minimal Order Cuma 12 pcs",
    description: "Harga sudah all-in: desain + printing + revisi. Cocok buat tim kecil sampai klub pro.",
  },
  {
    icon: Clock,
    title: "Pengerjaan Super Cepat 3-5 Hari",
    description: "Desain fix hari ini → 12 pcs dalam waktu 3-5 hari jersey/tas sudah di tangan tim kamu!",
  },
  {
    icon: ShieldCheck,
    title: "Garansi 100% Puas + Ganti Baru",
    description: "Desain salah? Cacat produksi? Kami revisi gratis atau ganti unit baru — no drama.",
  },
  {
    icon: FileText,
    title: "Invoice PDF Otomatis + Profesional",
    description: "Order langsung dapat invoice resmi PDF cantik, logo SOLID, nomor order, detail barang — siap buat laporan keuangan tim/kantor.",
    highlight: true,
  },
  {
    icon: MessageCircle,
    title: "Invoice Langsung Masuk WhatsApp",
    description: "Cukup klik “Pesan Sekarang” → invoice + link pembayaran langsung terkirim ke WA kamu dalam 5 detik. Praktis banget!",
    highlight: true,
  },
  {
    icon: Star,
    title: "Ratusan Tim & Komunitas Sudah Pakai",
    description: "Dari klub tarkam, sekolah, kampus, sampai tim esports MPL & atlet nasional — semua percaya SOLID.",
  },
  {
    icon: Users,
    title: "CS 24/7 via WhatsApp",
    description: "Tanya bahan, minta mockup, revisi desain, cek status order — langsung balas cepet, ramah, dan sabar!",
  },
]

export function WhyChooseSection() {
  return (
    <section className="py-16 lg:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Kenapa Harus
            <span className="block text-accent text-5xl md:text-6xl lg:text-7xl mt-2">SOLID?</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-5xl mx-auto font-medium">
            Bukan cuma bikin jersey & tas — kami bikin tim kamu <span className="text-accent font-bold">tampil beda, solid, dan langsung keliatan pro</span> dengan proses termudah di Indonesia!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className={`text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/95 backdrop-blur ${reason.highlight ? "ring-4 ring-accent/20 bg-gradient-to-br from-accent/5 to-white" : ""
                }`}
            >
              <CardHeader>
                <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${reason.highlight ? "bg-accent/20" : "bg-accent/10"
                  }`}>
                  <reason.icon className={`h-9 w-9 ${reason.highlight ? "text-accent" : "text-accent/80"}`} />
                </div>
                <CardTitle className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                  {reason.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base lg:text-lg leading-relaxed text-gray-600">
                  {reason.description}
                </CardDescription>
              </CardContent>
              {reason.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    FITUR TERBAIK
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}