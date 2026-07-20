// src/app/custom/page.tsx

"use client";

import Link from "next/link";
import { bagCategories, customBag } from "@/data/customBag";

export default function CustomBagPage() {
  const allProducts = Object.entries(customBag).flatMap(
    ([categoryKey, category]) =>
      category.plans.map((plan) => ({
        ...plan,
        categoryKey,
        categoryTitle: category.title,
      }))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 text-center">

          <h1 className="mb-3 text-5xl font-extrabold text-gray-900">
            Custom Bag Manufacturing
          </h1>

          <p className="text-xl text-gray-600">
            OEM, ODM, and Private Label bag manufacturing tailored to your brand.
          </p>

        </div>

        <div className="flex flex-col gap-10 lg:flex-row">

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">

            <div className="sticky top-24 rounded-3xl border bg-white p-8 shadow-sm">

              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Product Categories
              </h2>

              <nav className="flex flex-col gap-3">

                <Link
                  href="/custom"
                  className="rounded-2xl bg-teal-600 px-6 py-3.5 font-semibold text-white"
                >
                  All Products
                </Link>

                {bagCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/custom/${category.id}`}
                    className="rounded-2xl px-6 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}

              </nav>

            </div>

          </aside>

          {/* Products */}
          <main className="flex-1">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {allProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-xl"
                >

                  <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
                    {product.categoryTitle}
                  </span>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    {product.name}
                  </h2>

                  <div className="mb-5">

                    <span className="text-3xl font-bold text-primary">
                      {product.priceFrom}
                    </span>

                  </div>

                  <p className="mb-6 flex-1 text-gray-600">
                    {product.description}
                  </p>

                  <div className="mb-6 rounded-2xl border border-primary/10 bg-primary/5 p-4">

                    <p className="text-sm font-semibold text-primary">
                      Manufacturing Service
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      OEM • ODM • Private Label
                    </p>

                  </div>

                  <div className="border-t pt-6">

                    <Link
                      href={`/custom/${product.categoryKey}`}
                      className="font-semibold text-teal-600 transition hover:text-teal-700"
                    >
                      View Details →
                    </Link>

                  </div>

                </div>
              ))}

            </div>

          </main>

        </div>

      </div>
    </div>
  );
}