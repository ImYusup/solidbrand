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
    id: "orbit-pouch",
    name: "SOLID Orbit Pouch – Mini Coin & Key Organizer",
    category: "Bags/Luggage",
    price: 80000,
    discountPrice: 50000,
    weight: 100,
    currency: "IDR",
    description:
      "A premium minimalist pouch designed to organize coins, keys, earphones, cards, and other everyday essentials. Made from durable waterproof material to keep your belongings protected and easy to access.",
    features: [
      "Premium waterproof fabric resistant to light rain and splashes",
      "Compact round-shaped minimalist design",
      "Exclusive SOLID rubber logo",
      "Smooth, durable premium zipper",
      "Carabiner hook for attaching to backpacks, sling bags, or belt loops",
      "Premium inner lining with SOLID signature pattern",
    ],
    benefits: [
      "Keeps coins, keys, earphones, and small accessories organized",
      "Compact size without taking extra space",
      "Easy to attach for quick access",
      "Protects essentials from scratches and light moisture",
      "Modern unisex design suitable for everyday use",
    ],
    targetUsers: [
      "Everyday Carry (EDC) enthusiasts",
      "Students and office workers",
      "Motorcycle riders and travelers",
      "Anyone needing a compact organizer",
    ],
    notes:
      "Orders are processed immediately after payment confirmation.",
    images: [
      "/products/orbitpouch/orbitpouch1.png",
      "/products/orbitpouch/orbitpouch2.png",
      "/products/orbitpouch/orbitpouch3.png",
      "/products/orbitpouch/orbitpouch4.png",
    ],

    videoUrl:
      "https://drive.google.com/file/d/17nwEIXvMx3UGywxfPfH73hRhtOYGiKK-/preview",
  },
  {
    id: "solid-minislingbag",
    name: "SOLID Mini Sling Bag",
    category: "Bags/Luggage",
    price: 100000,
    discountPrice: 70000,
    weight: 150,
    currency: "IDR",
    description:
      "A premium minimalist waterproof sling bag designed for daily commuting, work, college, riding, and casual outings.",
    features: [
      "Premium waterproof material",
      "Exclusive embroidered SOLID logo",
      "Spacious main compartment with additional organizer pocket",
      "Smooth and durable premium zipper",
      "Comfortable adjustable shoulder strap",
    ],
    benefits: [
      "Protects belongings from light rain",
      "Modern minimalist design for everyday outfits",
      "Fits wallet, smartphone, charger, power bank, and essentials",
      "Comfortable for both men and women",
    ],
    targetUsers: [
      "Daily commuters",
      "Motorcycle riders",
      "Students",
      "Professionals",
    ],
    notes:
      "Orders are processed immediately after payment confirmation.",
    images: [
      "/products/minislingbag/minislingbag1.png",
      "/products/minislingbag/minislingbag2.png",
      "/products/minislingbag/minislingbag3.png",
      "/products/minislingbag/minislingbag4.png",
      "/products/minislingbag/minislingbag5.png",
      "/products/minislingbag/minislingbag6.png",
    ],
    videoUrl:
      "https://drive.google.com/file/d/1vDj5ZoSaU9gOJPA-RYSpDFrhG7kaB3Zc/preview",
  },
  {
    id: "urban-slingbag",
    name: "SOLID Urban Sling Bag",
    category: "Bags/Luggage",
    price: 200000,
    discountPrice: 150000,
    weight: 200,
    currency: "IDR",
    description:
      "Premium urban sling bag featuring a minimalist waterproof design, perfect for commuting, work, travel, and everyday use.",
    features: [
      "Premium waterproof and dust-resistant material",
      "Exclusive embroidered SOLID logo",
      "Large main compartment with internal organizer",
      "Smooth and durable premium zipper",
      "Adjustable anti-slip shoulder strap",
      "Soft protective inner padding",
    ],
    benefits: [
      "Protects belongings from light rain",
      "Comfortable for daily use",
      "Modern urban appearance",
      "Lightweight yet spacious",
      "Suitable for men and women",
    ],
    targetUsers: [
      "Professionals",
      "Students",
      "Motorcycle riders",
      "Travelers",
      "Content creators",
    ],
    notes:
      "Orders are processed immediately after payment confirmation.",
    images: [
      "/products/urbanslingbag/urbanslingbag1.png",
      "/products/urbanslingbag/urbanslingbag2.png",
      "/products/urbanslingbag/urbanslingbag3.png",
      "/products/urbanslingbag/urbanslingbag4.png",
      "/products/urbanslingbag/urbanslingbag5.png",
      "/products/urbanslingbag/urbanslingbag6.png",
    ],
    videoUrl: "https://drive.google.com/file/d/13mjxZHrDH5hmZx5zGK4C28uhcvesBmgf/preview",
  },
  {
    id: "titan-slingbag",
    name: "SOLID Titan Sling Bag",
    category: "Bags/Luggage",
    price: 250000,
    discountPrice: 200000,
    weight: 300,
    currency: "IDR",
    description:
      "Premium waterproof sling bag with a modern design, offering comfort, durability, and practical storage for everyday activities.",
    features: [
      "Premium waterproof scratch-resistant material",
      "Large main compartment with multiple storage pockets",
      "Smooth premium zipper",
      "Ergonomic breathable shoulder strap",
      "Exclusive SOLID branding",
    ],
    benefits: [
      "Protects belongings from light rain",
      "Fits tablet, wallet, phone, charger, and daily essentials",
      "Comfortable for extended use",
      "Professional and stylish appearance",
      "Ideal for work, travel, and outdoor activities",
    ],
    targetUsers: [
      "Professionals",
      "Travelers",
      "Daily commuters",
      "Minimalist bag enthusiasts",
    ],
    notes:
      "Orders are processed immediately after payment confirmation.",
    images: [
      "/products/titanslingbag/titanslingbag1.png",
      "/products/titanslingbag/titanslingbag2.png",
      "/products/titanslingbag/titanslingbag3.png",
      "/products/titanslingbag/titanslingbag4.png",
      "/products/titanslingbag/titanslingbag5.png",
      "/products/titanslingbag/titanslingbag6.png",
      "/products/titanslingbag/titanslingbag7.png",
    ],
    videoUrl: "https://drive.google.com/file/d/11XMlr5G0ULFQKiDPQx8kOyCmwkZnFsfS/preview",
  },
  {
    id: "backpacker-travel",
    name: "SOLID Backpacker Travel Bag",
    category: "Bags/Luggage",
    price: 350000,
    discountPrice: 250000,
    currency: "IDR",
    weight: 500,
    description:
      "Premium travel backpack featuring a large capacity, durable waterproof construction, and ergonomic comfort for travel and everyday use.",
    features: [
      "Heavy-duty waterproof material",
      "Large capacity with multiple compartments",
      "Premium smooth YKK zipper",
      "Soft breathable back padding",
      "Ergonomic adjustable shoulder straps",
      "Suitable for travel, hiking, and daily commuting",
    ],
    benefits: [
      "Keeps belongings organized",
      "Comfortable for long trips",
      "Resistant to light rain and outdoor conditions",
      "Stylish yet highly functional",
      "Perfect for various travel needs",
    ],
    targetUsers: [
      "Travelers",
      "Backpackers",
      "Students",
      "Outdoor professionals",
      "Daily commuters",
    ],
    notes:
      "Orders are processed immediately after payment confirmation.",
    videoUrl:
      "https://drive.google.com/file/d/1c7-dD-DcTsFKuU7Fvkg-VkVRFDG8gz_E/preview",
    images: [
      "/products/travelbag/tastravel1-hj.png",
      "/products/travelbag/tastravel2-hj.png",
      "/products/travelbag/tastravel3-hj.png",
      "/products/travelbag/tastravel1-ht.png",
      "/products/travelbag/tastravel2-ht.png",
      "/products/travelbag/tastravel3-ht.png",
      "/products/travelbag/tastravel4-ht.png",
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
