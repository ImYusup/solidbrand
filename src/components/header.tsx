// src/components/header.tsx
"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">

        {/* BRAND */}
        <Link href="/" className="flex items-center">
          <span className="font-bold text-2xl tracking-tight lowercase">
            solid<span className="text-primary">brand</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/products"
            className="text-foreground font-semibold text-lg hover:text-primary transition-colors"
          >
            Produk
          </Link>

          <Link
            href="/#custom"
            className="text-foreground font-semibold text-lg hover:text-primary transition-colors"
          >
            Custom
          </Link>

          {/* FIXED */}
          <Link
            href="/about-us"
            className="text-foreground font-semibold text-lg hover:text-primary transition-colors"
          >
            Tentang Kami
          </Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <Link
              href="/products"
              className="block text-foreground font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Produk
            </Link>

            <Link
              href="/#custom"
              className="block text-foreground font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom
            </Link>

            {/* FIXED */}
            <Link
              href="/about-us"
              className="block text-foreground font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang Kami
            </Link>

            <Link
              href="/#contact"
              className="block text-foreground font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontak
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
