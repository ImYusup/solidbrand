// src/app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { allProducts } from "@/data";  

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params; // ⬅️ WAJIB pakai await

  const product = allProducts.find((p) => p.id === slug);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
