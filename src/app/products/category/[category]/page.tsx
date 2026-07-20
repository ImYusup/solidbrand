// src/app/products/category/[category]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allProducts } from "@/data";
import { slugify } from "@/lib/slug";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function ProductsCategoryPage({
  params,
}: Props) {
  const { category } = await params;

  const filteredProducts = allProducts.filter(
    (p) => slugify(p.category ?? "") === category
  );

  if (!filteredProducts.length) {
    notFound();
  }

  const categories = [
    ...new Set(
      allProducts
        .map((p) => p.category)
        .filter(Boolean)
    ),
  ] as string[];

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

        <h1 className="text-4xl font-bold text-center mb-12">
          {filteredProducts[0].category}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl border bg-white p-8 shadow-md">

              <h2 className="text-2xl font-bold mb-6">
                Categories
              </h2>

              <nav className="flex flex-col gap-3">

                <Link
                  href="/products"
                  className="rounded-xl px-5 py-3 font-semibold transition"
                >
                  All Products
                </Link>

                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/products/category/${slugify(cat)}`}
                    className={`rounded-xl px-5 py-3 font-semibold transition ${
                      slugify(cat) === category
                        ? "bg-accent text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </Link>
                ))}

              </nav>

            </div>
          </aside>

          <div className="flex-1">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                >

                  <div className="relative aspect-square bg-gray-100">

                    <Image
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-contain p-6"
                    />

                  </div>

                  <div className="p-5 flex flex-col flex-grow">

                    <h3 className="font-bold text-lg line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-4">

                      {product.discountPrice ? (
                        <>
                          <p className="line-through text-gray-400 text-sm">
                            {formatRupiah(product.price)}
                          </p>

                          <p className="text-accent text-xl font-bold">
                            {formatRupiah(product.discountPrice)}
                          </p>
                        </>
                      ) : (
                        <p className="text-accent text-xl font-bold">
                          {formatRupiah(product.price)}
                        </p>
                      )}

                      <Link
                        href={`/products/${product.id}`}
                        className="mt-4 inline-block text-accent font-semibold"
                      >
                        View Product
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