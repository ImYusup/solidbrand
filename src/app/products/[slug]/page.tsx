// src/app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { products } from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params; // ⬅️ WAJIB pakai await

  const product = products.find((p) => p.id === slug);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
