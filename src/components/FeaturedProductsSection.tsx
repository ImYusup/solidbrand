// src/components/FeaturedProductsSection.tsx
"use client";

import Link from "next/link";
import { allProducts } from "@/data";

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
  const categories = ["Bags/Luggage", "Jersey Sports"];

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Featured Products
        </h2>

        {categories.map((category) => {
          const filteredProducts = allProducts
            .filter((product) => product.category === category)
            .slice(0, 4);

          if (!filteredProducts.length) return null;

          return (
            <div key={category} className="mb-16">
              {/* CATEGORY TITLE CENTER */}
              <h3 className="text-2xl font-bold mb-6 text-center">{category}</h3>

              {/* PRODUCT GRID FORCING 4 ITEMS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => {
                  const product = filteredProducts[index];

                  return product ? (
                    <div
                      key={product.id}
                      className="border rounded-xl shadow hover:shadow-lg transition bg-white overflow-hidden flex flex-col"
                    >
                      <div className="w-full aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={product.images?.[0] || "/placeholder.jpg"}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h4 className="font-bold text-lg mb-2 line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mb-4">
                          {product.discountPrice ? (
                            <>
                              <p className="text-gray-400 line-through text-sm">
                                {formatRupiah(product.price)}
                              </p>
                              <p className="text-accent font-bold text-lg">
                                {formatRupiah(product.discountPrice)}
                              </p>
                            </>
                          ) : (
                            <p className="text-accent font-bold text-lg">
                              {formatRupiah(product.price)}
                            </p>
                          )}
                        </div>

                        <div className="mt-auto">
                          <Link
                            href={`/products/${product.id}`}
                            className="text-accent font-semibold hover:underline"
                          >
                            View Product →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={`placeholder-${index}`}
                      className="border rounded-xl bg-gray-100 opacity-30"
                    ></div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* GLOBAL VIEW ALL BUTTON */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
