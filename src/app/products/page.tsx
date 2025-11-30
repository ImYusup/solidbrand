// src/app/products/page.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { allProducts } from "@/data";
import Image from "next/image";

// TAMBAHIN BARIS INI AJA — INI YANG BIKIN VERCEL GA NGPRERENDER & ERROR ILANG
export const dynamic = "force-dynamic";
// SAMPE SINI AJA — CUMA 1 BARIS!

export default function ProductsPage() {
  const params = useSearchParams();
  const categoryFilter = params.get("category");

  const filteredProducts = categoryFilter
    ? allProducts.filter((p) => p.category === categoryFilter)
    : allProducts;

  const categories = [
    ...new Set(
      allProducts
        .map((p) => p.category)
        .filter((cat): cat is string => typeof cat === "string")
    ),
  ];

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("IDR", "Rp")
      .trim();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {categoryFilter || "All Products"}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-8 sticky top-24 border">
              <h3 className="text-2xl font-bold mb-6">Categories</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/products"
                    className={`block py-3 px-5 rounded-xl font-semibold transition ${
                      !categoryFilter
                        ? "bg-accent text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      className={`block py-3 px-5 rounded-xl font-semibold transition ${
                        categoryFilter === cat
                          ? "bg-accent text-white"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* GRID PRODUCTS */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No products available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group"
                  >
                    <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                      <Image
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 min-h-[56px]">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2 min-h-[40px]">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 min-h-[56px] flex flex-col justify-end">
                        {product.discountPrice ? (
                          <div>
                            <p className="text-gray-400 line-through text-sm">
                              {formatRupiah(product.price)}
                            </p>
                            <p className="text-accent font-bold text-xl">
                              {formatRupiah(product.discountPrice)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-accent font-bold text-xl">
                            {formatRupiah(product.price)}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <Link
                          href={`/products/${product.id}`}
                          className="text-accent font-semibold hover:underline flex items-center gap-1 transition"
                        >
                          View Product <span className="text-lg">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}