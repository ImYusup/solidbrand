// src/app/products/page.tsx
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsPage() {
  const formatCurrency = (value: number, currency: string) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    })
      .format(value)
      .replace(currency, currency === "IDR" ? "Rp" : currency + " ")
      .trim();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Product Image */}
            <Link href={`/products/${product.id}`}>
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
            </Link>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-12">
                {product.name}
              </h3>

              {/* Harga */}
              <div className="mb-3">
                {product.discountPrice && (
                  <p className="text-gray-400 line-through text-sm">
                    {formatCurrency(product.price, product.currency)}
                  </p>
                )}
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(product.discountPrice ?? product.price, product.currency)}
                </p>
              </div>

              {/* 🔹 Color Preview (non-clickable) */}
              {product.variants && product.variants.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {product.variants.map((variant) => (
                    <span
                      key={variant.id}
                      title={variant.color}
                      className="w-6 h-6 rounded-full border shadow-sm"
                      style={{
                        backgroundColor: variant.colorCode || "#ddd",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* View Details */}
              <Link
                href={`/products/${product.id}`}
                className="inline-block mt-2 text-blue-600 font-medium hover:underline"
              >
                View Product →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
