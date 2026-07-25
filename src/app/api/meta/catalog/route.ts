// src/app/api/meta/catalog/route.ts
import { NextResponse } from "next/server";
import { allProducts } from "@/data";

const BASE_URL = "https://solidbrand.id";

export async function GET() {
  const items = allProducts.map((product) => {
    const image =
      product.images?.[0]
        ? `${BASE_URL}${product.images[0]}`
        : `${BASE_URL}/logo/icon.png`;

    return {
      id: product.id,
      title: product.name,
      description: product.description,
      availability: "in stock",
      condition: "new",
      price: `${product.discountPrice ?? product.price} IDR`,
      link: `${BASE_URL}/products/${product.id}`,
      image_link: image,
      brand: "SOLID",
      google_product_category: "1604",
      product_type: product.category,
    };
  });

  return NextResponse.json({
    version: "1.0",
    generated_at: new Date().toISOString(),
    total: items.length,
    products: items,
  });
}