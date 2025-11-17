// src/components/ProductDetail.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/lib/cart-store";
import { useRouter } from "next/navigation";

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

export default function ProductDetail({ product }: { product: any }) {
  const { addItem, setShowCart } = useCart();
  const router = useRouter();

  // 🔹 Build media list
  const mediaList: MediaNode[] = useMemo(() => {
    const imgs =
      product?.images?.map((url: string, i: number) => ({
        __typename: "MediaImage" as const,
        id: `img-${i}`,
        image: { url, altText: product.name },
      })) || [];

    const vids = product?.videoUrl
      ? [
          {
            __typename: "Video" as const,
            id: "vid-1",
            sources: [{ url: product.videoUrl, mimeType: "video/mp4" }],
          },
        ]
      : [];

    return vids.length > 0 ? [...vids, ...imgs] : imgs;
  }, [product]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    if (mediaList.length > 0) setSelectedIndex(0);
  }, [mediaList]);

  const thumbContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollThumbIntoView = (i: number) => {
    const container = thumbContainerRef.current;
    if (!container) return;
    const child = container.children[i] as HTMLElement | undefined;
    if (child) {
      const scrollTo = Math.max(
        0,
        child.offsetLeft - (container.clientWidth - child.clientWidth) / 2
      );
      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  useEffect(() => {
    if (selectedIndex >= 0) scrollThumbIntoView(selectedIndex);
  }, [selectedIndex]);

  const [quantity, setQuantity] = useState(1);
  const fullVariantId = product?.id;

  // 🔹 Add to Cart
  const handleAddToCart = () => {
    if (!fullVariantId) return;
    addItem({
      productId: product.id,
      variantId: fullVariantId,
      title: product.name,
      price: product.discountPrice ?? product.price,
      quantity,
      image:
        mediaList?.[0]?.__typename === "MediaImage"
          ? mediaList[0].image.url
          : undefined,
    });
    setShowCart(true);
  };

  // 🔹 BAYAR SEKARANG —> redirect ke halaman checkout
  const handleCheckout = () => {
    router.push(`/checkout?product=${product.id}&qty=${quantity}`);
  };

  // 🔹 Rupiah Formatter
  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(value)
      .replace("IDR", "Rp")
      .trim();

  // ✅ UI
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {/* Left: media */}
      <div>
        {mediaList.length === 0 ? (
          <div className="w-full h-[240px] md:h-[420px] bg-gray-100 flex items-center justify-center rounded-lg">
            <span className="text-gray-500 text-sm">No media available</span>
          </div>
        ) : mediaList[selectedIndex].__typename === "Video" ? (
          <>
            {mediaList[selectedIndex].sources[0].url.includes("youtube.com") ||
            mediaList[selectedIndex].sources[0].url.includes("youtu.be") ||
            mediaList[selectedIndex].sources[0].url.includes(
              "drive.google.com"
            ) ? (
              <div className="w-full bg-black rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                <iframe
                  src={mediaList[selectedIndex].sources[0].url}
                  className="w-full aspect-[9/16] md:aspect-[16/9] object-contain"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full bg-black rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                <video
                  controls
                  className="w-full aspect-[9/16] md:aspect-[16/9] object-contain"
                >
                  <source
                    src={mediaList[selectedIndex].sources[0].url}
                    type={
                      mediaList[selectedIndex].sources[0].mimeType ||
                      "video/mp4"
                    }
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </>
        ) : (
          <img
            src={mediaList[selectedIndex].image.url}
            alt={mediaList[selectedIndex].image.altText || product.name}
            className="w-full max-h-[280px] md:max-h-[480px] object-contain rounded-lg shadow-lg"
          />
        )}

        {/* 🔹 Thumbnails */}
        <div
          ref={thumbContainerRef}
          className="mt-3 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300"
        >
          {mediaList.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 w-16 h-12 md:w-24 md:h-16 rounded overflow-hidden border ${
                i === selectedIndex ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {m.__typename === "Video" ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <svg
                    className="w-5 h-5 md:w-7 md:h-7 text-white opacity-80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              ) : (
                <img
                  src={m.image.url}
                  alt={m.image.altText || product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right: product info */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-3">
          {product.name}
        </h1>

        {/* Harga */}
        <div className="mb-4">
          {product.discountPrice && (
            <p className="text-gray-400 line-through text-sm md:text-base">
              {formatRupiah(product.price)}
            </p>
          )}
          <p className="text-xl md:text-2xl font-extrabold text-green-600">
            {formatRupiah(product.discountPrice ?? product.price)}
          </p>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded-md"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value) || 1))
            }
            className="w-16 text-center border rounded-md px-2 py-1"
          />
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded-md"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Add to cart
          </button>

          {/* 🔹 Bayar Sekarang FIX */}
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            Bayar Sekarang
          </button>

          <button
            onClick={() => {
              const url = `${window.location.origin}/product/${product.id}`;
              if (navigator.share) {
                navigator.share({
                  title: product.name,
                  text: "Cek produk ini di WebBotPro!",
                  url,
                });
              } else {
                navigator.clipboard.writeText(url);
                alert("✅ Link produk sudah disalin: " + url);
              }
            }}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Share Produk
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
          SOLID menyediakan sling bag, backpack, travel bag, dan layanan custom termasuk jersey sports.
        </div>
      </div>
    </div>
  );
}
