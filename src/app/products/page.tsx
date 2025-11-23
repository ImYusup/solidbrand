// src/app/products/page.tsx
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsPage() {
  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("IDR", "Rp")
      .trim();

  const categories = [
    { name: "Bags/Luggage", href: "/#products" },
    { name: "Jersey Sports", href: "/#jersey" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">All Products</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR KIRI — LEBAR TETAP, TAPI GA GANGGU GRID */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-8 sticky top-24 border">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Categories</h3>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <Link
                      href={cat.href}
                      className="block py-4 px-6 rounded-xl font-bold text-gray-800 hover:bg-gray-100 transition flex items-center justify-between group"
                    >
                      {cat.name}
                      <span className="text-gray-500 group-hover:text-black group-hover:translate-x-1 transition">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* GRID PRODUK — FULL LEBAR, SAMA PERSIS KAYAK FEATURED */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-xl shadow hover:shadow-lg transition bg-white overflow-hidden flex flex-col"
                >
                  {/* GAMBAR — BESAR & RATA */}
                  <div className="w-full aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100 flex items-center justify-center">
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* INFO */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* HARGA */}
                    <div className="mb-4">
                      {product.discountPrice && (
                        <p className="text-gray-400 line-through text-sm">
                          {formatRupiah(product.price)}
                        </p>
                      )}
                      <p className="text-green-600 font-bold text-lg">
                        {formatRupiah(product.discountPrice ?? product.price)}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        href={`/products/${product.id}`}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        View Product →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}