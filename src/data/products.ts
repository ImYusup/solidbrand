// src/data/products.ts
export type ProductVariant = {
  id: string;
  color: string;
  colorCode?: string;
  images: string[];
  videoUrl?: string;
  price?: number;
  weight?: number;
};

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
  variants?: ProductVariant[];
  weight?: number;
  category?: string;
};

export const products: Product[] = [
  {
    id: "solid-minislingbag",
    name: "SOLID Mini Sling Bag – Tas Selempang Pria Wanita",
    category: "Bags/Luggage",
    price: 100000,
    discountPrice: 70000,
    weight: 150,
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
      "/products/minislingbag/minislingbag1.png",
      "/products/minislingbag/minislingbag2.png",
      "/products/minislingbag/minislingbag3.png",
      "/products/minislingbag/minislingbag4.png",
    ],
    videoUrl:
      "https://drive.google.com/file/d/1rd5YvA3U9T_25K-ZpmV7I_hxjvTSnQhG/preview",
  },
  {
    id: "urban-slingbag",
    name: "SOLID Urban Sling Bag – Tas Selempang Pria Wanita",
    category: "Bags/Luggage",
    price: 200000,
    discountPrice: 150000,
    weight: 200,
    currency: "IDR",
    description:
      "Tas selempang premium berdesain urban minimalis dengan material waterproof. Ringkas, stylish, dan cocok untuk aktivitas harian seperti kerja, kuliah, riding, traveling, hingga hangout.",
    features: [
      "Material premium waterproof tahan cipratan air dan debu",
      "Logo SOLID bordir eksklusif & elegan menambah kesan premium",
      "Kompartemen utama luas dengan organizer multifungsi",
      "Resleting halus, kuat, dan awet dengan finishing rapi",
      "Tali selempang adjustable & anti-slip, nyaman untuk pemakaian lama",
      "Dilengkapi lapisan busa lembut untuk perlindungan ekstra barang bawaan",
    ],
    benefits: [
      "Aman dari hujan ringan dan lingkungan berdebu",
      "Praktis untuk membawa barang esensial tanpa terasa bulky",
      "Desain urban modern mudah dipadukan dengan berbagai outfit",
      "Ringan, tetap stylish, dan cocok untuk aktivitas kerja, kuliah, jalan, atau riding",
      "Nyaman dipakai pria maupun wanita (unisex & trendy)",
    ],
    targetUsers: [
      "Pengguna aktif yang butuh tas simple, aman, tapi tetap premium",
      "Karyawan, mahasiswa, atau pekerja lapangan dengan mobilitas tinggi",
      "Pengendara motor yang butuh tas ringkas, kuat, dan aman dari hujan",
      "Traveller, konten kreator, atau pedagang yang membawa gadget & dompet harian",
      "Pengguna yang ingin tampil minimalis namun terlihat profesional & elegan",
    ],
    notes:
      "Pastikan konfirmasi pembayaran diterima admin agar pesanan dapat segera diproses.",
    images: [
      "/products/urbanslingbag/urbanslingbag1.png",
      "/products/urbanslingbag/urbanslingbag2.png",
      "/products/urbanslingbag/urbanslingbag3.png",
      "/products/urbanslingbag/urbanslingbag4.png",
    ],
    videoUrl: "https://drive.google.com/file/d/1AGI0rl2g3TsMXqJgF3ZgkFfQx5iAESRx/preview",
  },
  {
    id: "titan-slingbag",
    name: "SOLID Titan Sling Bag – Tas Selempang Pria Wanita",
    category: "Bags/Luggage",
    price: 250000,
    discountPrice: 200000,
    weight: 300,
    currency: "IDR",
    description:
      "Tas selempang premium dengan desain modern dan material waterproof. Ringkas, kuat, dan nyaman untuk aktivitas harian, kerja, atau traveling.",
    features: [
      "Material waterproof dan anti-gores premium",
      "Kompartemen utama luas dengan beberapa slot penyimpanan",
      "Resleting kuat dan halus kualitas tinggi",
      "Tali adjustable ergonomis dan breathable",
      "Logo SOLID eksklusif dengan finishing elegan",
    ],
    benefits: [
      "Aman dari hujan ringan dan percikan air",
      "Muat tablet, dompet, HP, charger, dan aksesoris harian",
      "Nyaman dipakai seharian tanpa pegal",
      "Tampilan stylish dan profesional di berbagai outfit",
      "Cocok untuk bepergian, kerja, atau aktivitas outdoor",
    ],
    targetUsers: [
      "Profesional dan pekerja kantoran yang butuh tas stylish dan fungsional",
      "Traveler atau commuter dengan mobilitas tinggi",
      "Pengguna yang ingin sling bag modern, kuat, dan elegan",
      "Penggemar tas minimalis yang terlihat premium",
    ],
    notes:
      "Pastikan konfirmasi pembayaran diterima admin agar pesanan dapat segera diproses.",
    images: [
      "/products/titanslingbag/titanslingbag1.png",
      "/products/titanslingbag/titanslingbag2.png",
      "/products/titanslingbag/titanslingbag3.png",
      "/products/titanslingbag/titanslingbag4.png",
      "/products/titanslingbag/titanslingbag5.png",
    ],
    videoUrl: "https://drive.google.com/file/d/1s4Y_vO2ou0C_xYkM6E_Xl8l_aJn57sUT/preview",
  },
  {
    id: "backpacker-travel",
    name: "SOLID Backpacker Travel Bag – Tas Travel Pria Wanita",
    category: "Bags/Luggage",
    price: 350000,
    discountPrice: 250000,
    currency: "IDR",
    weight: 500,
    description:
      "Tas travel premium dengan desain tangguh, kapasitas besar, dan nyaman dipakai untuk perjalanan jauh maupun aktivitas harian.",
    features: [
      "Material tebal dan waterproof, tahan cuaca dan debu",
      "Kapasitas besar dengan banyak kompartemen",
      "Resleting YKK kuat dan smooth",
      "Padding punggung empuk dan breathable",
      "Tali adjustable dan ergonomis",
      "Cocok untuk travel, hiking, dan harian"
    ],
    benefits: [
      "Barang aman dan rapi berkat banyaknya ruang penyimpanan",
      "Nyaman dipakai lama tanpa pegal",
      "Tahan hujan ringan dan kondisi outdoor",
      "Tampil stylish dan tetap fungsional",
      "Cocok untuk segala aktivitas perjalanan"
    ],
    targetUsers: [
      "Traveler dan backpacker aktif",
      "Mahasiswa dengan banyak barang",
      "Pekerja lapangan dan outdoor",
      "Pengguna yang butuh tas besar, kuat, dan stylish"
    ],
    notes:
      "Pastikan konfirmasi pembayaran diterima admin agar pesanan dapat segera diproses.",

    videoUrl:
      "https://drive.google.com/file/d/1wVvf17zupiaeURlX1ij5enh3wczpvigp/preview",
    images: [
      "/products/travelbag/tastravel1-hj.png",
      "/products/travelbag/tastravel2-hj.png",
      "/products/travelbag/tastravel3-hj.png",
      "/products/travelbag/tastravel1-ht.png",
      "/products/travelbag/tastravel2-ht.png",
      "/products/travelbag/tastravel3-ht.png",
    ],
    variants: [
      {
        id: "backpacker-travel-black",
        color: "Hitam",
        colorCode: "#1c1c1c",
        price: 265000,
        weight: 500,
        images: [
          "/products/travelbag/tastravel1-ht.png",
          "/products/travelbag/tastravel2-ht.png",
          "/products/travelbag/tastravel3-ht.png",
        ],
      },
      {
        id: "backpacker-travel-green",
        color: "Hijau",
        colorCode: "#4b5320",
        price: 250000,
        weight: 500,
        images: [
          "/products/travelbag/tastravel1-hj.png",
          "/products/travelbag/tastravel2-hj.png",
          "/products/travelbag/tastravel3-hj.png",
        ],
      },
    ],
  },

];
