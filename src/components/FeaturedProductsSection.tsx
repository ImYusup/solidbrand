// src/components/FeaturedProductsSection.tsx
"use client";

import Link from "next/link";
import { products } from "@/data/products";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp")
    .trim();
}

export function FeaturedProductsSection() {
  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Bags/Luggage Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl shadow hover:shadow-lg transition bg-white overflow-hidden flex flex-col"
            >
              <div className="w-full aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100 flex items-center justify-center">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* INI YANG BARU — AMAN, GA ADA typeof window */}
                <div className="mb-4">
                  {product.discountPrice ? (
                    <>
                      <p className="text-gray-400 line-through text-sm">
                        {formatRupiah(product.price)}
                      </p>
                      <p className="text-green-600 font-bold text-lg">
                        {formatRupiah(product.discountPrice)}
                      </p>
                    </>
                  ) : (
                    <p className="text-green-600 font-bold text-lg">
                      {formatRupiah(product.price)}
                    </p>
                  )}
                </div>

                <div className="mt-auto">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}