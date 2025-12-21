// src/components/ProductDetail.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/lib/cart-store";
import type { Product, ProductVariant } from "@/data/products";
import { useRouter } from "next/navigation";
import { generateOrderId } from "@/lib/generateOrderId";

type MediaNode =
  | {
    __typename: "MediaImage";
    id: string;
    image: { url: string; altText?: string | null };
  }
  | {
    __typename: "Video";
    id: string;
    sources: { url: string; mimeType?: string }[];
  };

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem, setShowCart } = useCart();
  const router = useRouter();

  // State
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Apakah produk punya variant?
  const hasVariants = product.variants && product.variants.length > 0;
  const isVariantSelected = !hasVariants || selectedVariant !== null;

  // Harga yang ditampilkan
  const displayPrice = selectedVariant?.price ?? product.discountPrice ?? product.price;

  // Media List (sama seperti asli)
  const mediaList: MediaNode[] = useMemo(() => {
    if (selectedVariant) {
      return selectedVariant.images.map((url: string, i: number) => ({
        __typename: "MediaImage" as const,
        id: `variant-img-${i}`,
        image: { url, altText: product.name },
      }));
    }

    const baseImages =
      product.images?.map((url: string, i: number) => ({
        __typename: "MediaImage" as const,
        id: `img-${i}`,
        image: { url, altText: product.name },
      })) || [];

    const baseVideo = product.videoUrl
      ? [
        {
          __typename: "Video" as const,
          id: "video-product",
          sources: [{ url: product.videoUrl, mimeType: "video/mp4" }],
        },
      ]
      : [];

    return [...baseVideo, ...baseImages];
  }, [product, selectedVariant]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  // Hapus yang lama:
  // useEffect(() => {
  //   if (mediaList.length > 0) setSelectedIndex(0);
  // }, [mediaList]);

  // Ganti jadi yang ini:
  useEffect(() => {
    setSelectedIndex(0);
  }, [selectedVariant, mediaList]);
  
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  const scrollThumbIntoView = (i: number) => {
    const container = thumbContainerRef.current;
    if (!container) return;
    const child = container.children[i] as HTMLElement | undefined;
    if (child) {
      const scrollTo = Math.max(0, child.offsetLeft - (container.clientWidth - child.clientWidth) / 2);
      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  useEffect(() => {
    if (selectedIndex >= 0) scrollThumbIntoView(selectedIndex);
  }, [selectedIndex]);

  // Add to Cart — WAJIB PILIH VARIANT
  const handleAddToCart = () => {
    if (!isVariantSelected) {
      alert("Please select a color first!");
      return;
    }

    const variantId = selectedVariant?.id || product.id;
    const variantImages = selectedVariant?.images || product.images;
    const weight = selectedVariant?.weight ?? product.weight ?? 0;

    addItem({
      productId: product.id,
      variantId: variantId,
      title: product.name,
      price: displayPrice,
      quantity,
      image: variantImages?.[0] || product.images?.[0],
      color: selectedVariant?.color,
      weight,
    });
    setShowCart(true);
  };

  // Handle Checkout- Bayar Sekarang
  const handleCheckout = async () => {
    if (!isVariantSelected) {
      alert("Please select a color before checkout!");
      return;
    }

    try {
      // const now = new Date();
      // const day = String(now.getDate()).padStart(2, "0");
      // const month = String(now.getMonth() + 1).padStart(2, "0");
      // const year = now.getFullYear();
      // const hours = String(now.getHours()).padStart(2, "0");
      // const minutes = String(now.getMinutes()).padStart(2, "0");
      // const seconds = String(now.getSeconds()).padStart(2, "0");
      // const orderId = `ORD-${day}${month}${year}-${hours}${minutes}${seconds}`;
      const orderId = generateOrderId();

      const variantId = selectedVariant?.id || product.id;
      const variantImages = selectedVariant?.images || product.images;

      const buyNowItem = {
        productId: product.id,
        variantId: variantId,
        title: product.name,
        price: displayPrice,
        quantity,
        image: variantImages?.[0] || product.images?.[0],
        color: selectedVariant?.color,
        weight: selectedVariant?.weight ?? product.weight,
      };

      localStorage.setItem(`order_${orderId}`, JSON.stringify({
        order_id: orderId,
        items: [buyNowItem],
        subtotal: displayPrice * quantity,
      }));

      router.push(`/checkout?order_id=${orderId}`);
    } catch (err) {
      console.error("Buy Now failed:", err);
      alert("Failed to proceed to checkout. Please try again.");
    }
  };

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(value)
      .replace("IDR", "Rp")
      .trim();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {/* Left: Media */}
      <div className="w-full max-w-[520px] mx-auto">
        <div className="relative">
          {mediaList.length === 0 ? (
            <div className="w-full h-[420px] bg-gray-100 flex items-center justify-center rounded-lg">
              <span className="text-gray-500 text-sm">No media available</span>
            </div>
          ) : mediaList[selectedIndex]?.__typename === "Video" ? (
            <div className="w-full bg-black rounded-lg shadow-lg overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
              <iframe
                src={mediaList[selectedIndex].sources[0].url}
                className="w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : mediaList[selectedIndex] ? (
            <div className="w-full bg-[#f9f9f9] rounded-lg shadow-lg overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
              <img
                src={mediaList[selectedIndex].image.url}
                alt={mediaList[selectedIndex].image.altText || product.name}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-[420px] bg-gray-100 flex items-center justify-center rounded-lg">
              <span className="text-gray-500 text-sm">Loading...</span>
            </div>
          )}

          {/* Prev Arrow */}
          {selectedIndex > 0 && (
            <button
              onClick={() => setSelectedIndex(prev => prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next Arrow */}
          {selectedIndex < mediaList.length - 1 && (
            <button
              onClick={() => setSelectedIndex(prev => prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Thumbnails */}
        <div ref={thumbContainerRef} className="mt-3 flex gap-2 overflow-x-auto scrollbar-thin">
          {mediaList.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 w-16 h-12 md:w-24 md:h-16 rounded overflow-hidden border ${i === selectedIndex ? "border-blue-500" : "border-gray-200"}`}
            >
              {m.__typename === "Video" ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              ) : (
                <img src={m.image.url} alt={m.image.altText || product.name} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Info */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-3">{product.name}</h1>

        <div className="mb-4">
          {product.discountPrice && (
            <p className="text-gray-400 line-through text-sm md:text-base">{formatRupiah(product.price)}</p>
          )}
          <p className="text-xl md:text-2xl font-extrabold text-green-600">
            {formatRupiah(displayPrice)}
          </p>
        </div>

        {/* Variant Selector - FULL ENGLISH */}
        {hasVariants && (
          <div className="mb-5">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              Select Variant <span className="text-red-500">*</span>
            </h3>
            <div className="flex gap-3 flex-wrap">
              {product.variants?.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-12 h-12 rounded-full border-4 transition-all shadow-sm
                    ${selectedVariant?.id === variant.id
                      ? "border-blue-600 scale-110 shadow-lg"
                      : "border-gray-300 hover:border-gray-500"
                    }`}
                  style={{ backgroundColor: variant.colorCode || "#ddd" }}
                  title={variant.color}
                  aria-label={`Select ${variant.color}`}
                />
              ))}
            </div>

            {/* Warning kalau belum pilih */}
            {!selectedVariant && (
              <p className="text-red-600 text-sm mt-2 animate-pulse font-medium">
                Please select a variant before adding to cart
              </p>
            )}
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 hover:bg-gray-100"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              className="w-16 text-center border-x py-2 focus:outline-none"
            />
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={!isVariantSelected}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isVariantSelected
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isVariantSelected ? "Add to Cart" : "Select Variant First"}
          </button>

          <button
            onClick={handleCheckout}
            disabled={!isVariantSelected}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isVariantSelected
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isVariantSelected ? "Buy Now" : "Please Select Variant"}
          </button>

          <button
            onClick={() => {
              const url = window.location.href;
              if (navigator.share) {
                navigator.share({ title: product.name, url });
              } else {
                navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!");
              }
            }}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Share Product
          </button>
        </div>

        {/* Deskripsi & detail */}
        <div className="prose prose-sm md:prose max-w-none text-gray-700 space-y-6">
          <p>{product.description}</p>

          {product.features && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Fitur Utama</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.features.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {product.benefits && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Manfaat</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.benefits.map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {product.targetUsers && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Siapa yang Cocok</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.targetUsers.map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {product.notes && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <strong>Catatan:</strong> {product.notes}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          SOLID menyediakan Sling Bag, Backpack, Travel Bag, dan Custom Pembuatan Jersey Sports.
        </div>
      </div>
    </div>
  );
}