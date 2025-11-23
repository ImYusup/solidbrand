// src/components/header.tsx
"use client";

import { Menu, X, Bot } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        {/* Logo - Klikable ke Home */}
        <Link href="/" className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl">WebBotPro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#services" className="text-foreground font-bold text-lg hover:text-primary transition-colors">
            Layanan
          </Link>
          <Link
            href="/products"
            className="text-foreground font-bold text-lg hover:text-primary transition-colors"
          >
            Produk
          </Link>
          <Link href="/#why-choose" className="text-foreground font-bold text-lg hover:text-primary transition-colors">
            Kenapa Kami
          </Link>
          <Link href="/#testimonials" className="text-foreground font-bold text-lg hover:text-primary transition-colors">
            Testimoni
          </Link>
          <Link href="/#contact" className="text-foreground font-bold text-lg hover:text-primary transition-colors">
            Kontak
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/#services"
              className="block text-foreground font-bold text-lg hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Layanan
            </Link>
            <Link
              href="/#products"
              className="block text-foreground font-bold text-lg hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Produk
            </Link>
            <Link
              href="/#why-choose"
              className="block text-foreground font-bold text-lg hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Kenapa Kami
            </Link>
            <Link
              href="/#testimonials"
              className="block text-foreground font-bold text-lg hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimoni
            </Link>
            <Link
              href="/#contact"
              className="block text-foreground font-bold text-lg hover:text-primary transition-colors"
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
