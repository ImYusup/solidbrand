// src/data/products.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  currency: string;
  description: string;
  features?: string[];
  benefits?: string[];
  targetUsers?: string[];
  notes?: string;
  images?: string[];
  videoUrl?: string;
};

export const products: Product[] = [
  {
    id: "solid-minislingbag",
    name: "SOLID Mini Sling Bag – Tas Selempang Pria Wanita",
    price: 100000,
    discountPrice: 70000,
    currency: "IDR",
    description:
      "Tas selempang premium berdesain minimalis dengan material waterproof. Ringkas, ringan, dan cocok untuk aktivitas harian seperti kerja, kuliah, riding, hingga hangout.",
    features: [
      "Material waterproof premium yang tahan cipratan air",
      "Logo brand SOLID bordir rapi & eksklusif",
      "Kantong utama luas dengan kompartemen tambahan",
      "Resleting halus, kuat, dan tahan lama",
      "Tali adjustable yang nyaman dipakai seharian",
    ],
    benefits: [
      "Aman dari hujan ringan berkat bahan waterproof",
      "Desain stylish cocok untuk berbagai outfit dan aktivitas",
      "Muat banyak: dompet, HP, powerbank, charger, dan barang harian lainnya",
      "Nyaman dipakai oleh pria maupun wanita",
    ],
    targetUsers: [
      "Rider atau anak motor yang butuh tas compact & aman",
      "Pedagang atau pekerja yang ingin tas simple, kuat, dan elegan",
      "Mahasiswa dengan mobilitas tinggi",
      "Pengguna yang menyukai tas minimalis tapi terlihat premium",
    ],
    notes:
      "Pastikan konfirmasi pembayaran diterima admin agar pesanan dapat segera diproses.",
    images: [
      "/products/SlingBag1/SlingBag1.1.png",
      "/products/SlingBag1/SlingBag1.2.png",
      "/products/SlingBag1/SlingBag1.3.png",
      "/products/SlingBag1/SlingBag1.4.png",
      "/products/SlingBag1/SlingBag1.5.png"
    ],
    videoUrl:
      "https://drive.google.com/file/d/1rd5YvA3U9T_25K-ZpmV7I_hxjvTSnQhG/preview",
  },
  {
    id: "sales-bot",
    name: "WhatsApp Bot Sales Automation",
    price: 450000,
    discountPrice: 300000, // opsional kalau mau kasih diskon
    currency: "IDR",
    description:
      "Bot WhatsApp untuk otomasi penjualan, katalog, dan notifikasi order. Bikin jualan makin gampang dan cepat.",
    features: [
      "Katalog produk otomatis via WhatsApp",
      "Notifikasi order langsung ke admin",
      "Auto-reply untuk pertanyaan produk",
      "Integrasi dengan sistem pembayaran sendiri",
    ],
    benefits: [
      "Menghemat waktu untuk balas chat pelanggan",
      "Meningkatkan konversi penjualan",
      "Bikin pelanggan lebih nyaman dengan respon instan",
      "Mudah dipakai tanpa perlu teknis ribet",
    ],
    targetUsers: [
      "Online shop yang ingin respon cepat ke pelanggan",
      "UMKM yang jualan via WhatsApp",
      "Bisnis yang butuh sistem order otomatis",
      "Dropshipper dan reseller yang butuh efisiensi",
    ],
    notes:
      "Setelah pesanan selesai, masukkan nomor WhatsApp kamu di catatan order supaya bot bisa langsung diaktifkan.",
    images: [
      "/images/whatsapp/wa-jualan1.jpeg",
      "/images/whatsapp/wa-jualan2.jpeg",
      "/images/whatsapp/wa-jualan3.jpeg",
      "/images/whatsapp/wa-jualan4.jpeg",
    ],
    videoUrl: "https://drive.google.com/file/d/1Qf2VzUr_BUsGWgLlu5f3F3wscX0ZoaSC/preview",
  },
  {
    id: "company-profile-website",
    name: "Company Profile Website",
    price: 1000000,
    discountPrice: 700000,
    currency: "IDR",
    description:
      "Website profesional sederhana untuk UMKM & company profile bisnis.",
    features: [
      "Desain modern & responsif",
      "Mudah dikelola tanpa perlu coding",
      "SEO basic untuk tampil di Google",
      "Halaman About, Layanan, Kontak, dan lainnya",
    ],
    benefits: [
      "Meningkatkan kredibilitas bisnis",
      "Tampil profesional di mata pelanggan",
      "Bisa diakses 24/7 dari mana saja",
      "Cocok untuk UMKM yang ingin go digital",
    ],
    targetUsers: [
      "UMKM yang butuh website company profile cepat",
      "Startup yang ingin punya landing page profesional",
      "Bisnis lokal yang ingin tampil di internet",
    ],
    notes:
      "Setelah pesanan selesai, tim kami akan menghubungi kamu untuk mengumpulkan konten (logo, foto, teks) sebelum website di-deploy.",
    images: [
      "/images/website/wb-webbotpro1.jpg",
      "/images/website/wb-webbotpro2.jpg",
      "/images/website/wb-webbotpro3.jpg",
      "/images/website/wb-webbotpro4.jpg",
    ],
    videoUrl: "https://drive.google.com/file/d/10qTOrzS0lAFNmHcc85bGcsSXGMqptIii/preview",
  },
  {
    id: "ecommerce-website",
    name: "E-Commerce Website",
    price: 7500000,
    discountPrice: 5000000,
    currency: "IDR",
    description:
      "Website toko online lengkap dengan payment gateway & integrasi Instagram Shop. Cocok buat UMKM dan bisnis yang serius jualan online.",
    features: [
      "Desain modern & mobile friendly",
      "Integrasi payment gateway",
      "Manajemen produk & stok",
      "Integrasi Instagram Shop",
      "Fitur diskon & voucher",
      "Laporan penjualan otomatis",
    ],
    benefits: [
      "Mempermudah pelanggan belanja 24/7",
      "Meningkatkan kepercayaan dan profesionalitas toko online",
      "Otomatisasi penjualan & pembayaran",
      "Mudah kelola produk tanpa coding",
    ],
    targetUsers: [
      "UMKM yang ingin punya toko online sendiri",
      "Pebisnis yang jualan di Instagram/TikTok tapi mau punya website resmi",
      "Startup dan brand lokal yang butuh sistem e-commerce terintegrasi",
    ],
    notes:
      "Setelah pesanan selesai, tim kami akan menghubungi kamu untuk mengumpulkan data produk, logo, dan kebutuhan integrasi sebelum website di-deploy.",
    images: [
      "/images/website/bg-webbotpro1.jpg",
      "/images/website/bg-webbotpro2.jpg",
      "/images/website/bg-webbotpro3.jpg",
      "/images/website/bg-webbotpro4.jpg",
      "/images/website/bg-webbotpro5.jpg",
    ],
    videoUrl: "https://drive.google.com/file/d/1rThsHOEJlCe4SAQbW2U242Urq8lT9pSA/preview",
  },
  {
    id: "powerbi-dashboard",
    name: "Power BI Dashboard & BI Solutions",
    price: 1500000,
    discountPrice: 1000000,
    currency: "IDR",
    description:
      "Dashboard interaktif untuk analisis data, laporan bisnis, dan decision support. Bikin keputusan bisnis lebih cepat dengan visualisasi data yang powerful.",
    features: [
      "Dashboard interaktif dengan filter & drill-down",
      "Integrasi ke Google Sheets, Excel, atau database",
      "Laporan otomatis real-time",
      "Visualisasi data yang mudah dipahami",
      "Bisa diakses via web & mobile",
    ],
    benefits: [
      "Meningkatkan kecepatan pengambilan keputusan",
      "Mempermudah monitoring KPI bisnis",
      "Mengurangi human error dalam laporan manual",
      "Bikin data lebih transparan & terstruktur",
    ],
    targetUsers: [
      "Pemilik bisnis yang butuh laporan interaktif",
      "Tim manajemen yang ingin KPI selalu up-to-date",
      "Perusahaan yang pakai Google Sheets/Excel tapi ingin data lebih rapi",
      "Startup yang mulai data-driven decision making",
    ],
    notes:
      "Setelah pesanan selesai, kamu bisa share file/data ke tim kami untuk setup dashboard sesuai kebutuhan bisnis.",
    images: [
      "/images/powerbi/powerbi1.png",
      "/images/powerbi/powerbi2.png",
      "/images/powerbi/powerbi3.png",
    ],
    videoUrl: "https://drive.google.com/file/d/1Jrsprlu-2eFY-4o0x57vqdK_QplVbioU/preview",
  },
  {
    id: "business-website",
    name: "Business Website (SMB)",
    price: 2300000,
    discountPrice: 1500000,
    currency: "IDR",
    description:
      "Website bisnis modern dengan fitur pembayaran online.",
    features: [
      "Website modern responsif (desktop & mobile)",
      "Integrasi payment Indonesia",
      "Sudah termasuk domain + hosting gratis langsung aktif",
      "Cocok untuk Company Profile, toko kecil, hingga brand UMKM",
    ],
    benefits: [
      "Tampilan bisnis lebih profesional",
      "Brand lebih dipercaya pelanggan",
      "Mudah ditemukan di Google",
      "Cocok untuk UMKM, personal branding, dan startup",
    ],
    targetUsers: [
      "UMKM yang butuh identitas digital",
      "Perusahaan kecil & menengah",
      "Personal branding / freelancer",
      "Startup yang ingin tampil profesional",
    ],
    notes:
      "Setelah order segera lakukan konsultasi untuk menentukan domain. Estimasi selesai 1–2 hari kerja.",
    images: [
      "/images/website/smb-webbotpro1.jpeg",
      "/images/website/smb-webbotpro2.jpeg",
      "/images/website/smb-webbotpro3.jpeg",
      "/images/website/smb-webbotpro4.jpeg",
      "/images/website/smb-webbotpro5.jpeg",
      "/images/website/smb-webbotpro6.jpeg",
    ],
    videoUrl:
      "https://drive.google.com/file/d/1R5hFxl36tW65e2FDfIPi3Et3INkrtGpq/preview",
  },
];
