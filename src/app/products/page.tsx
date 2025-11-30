// src/app/products/page.tsx
import { Suspense } from "react"
import ProductsContent from "./ProductsContent"

export const dynamic = "force-dynamic"  // biar ga prerender

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}