// src/components/header.tsx
"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

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
            Products
          </Link>

          <div className="relative group">
            <Link
              href="/custom"
              className="flex items-center gap-1 text-foreground font-semibold text-lg hover:text-primary transition-colors"
            >
              Custom
              <svg
                className="h-4 w-4 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Link>

            <div className="invisible absolute left-0 top-full z-50 w-64 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border bg-white p-2 shadow-xl">

                <Link
                  href="/custom"
                  className="block rounded-xl px-4 py-3 font-medium transition-colors hover:bg-primary hover:text-white"
                >
                  👜 Custom Bags
                </Link>

                <Link
                  href="/custom-jerseys"
                  className="block rounded-xl px-4 py-3 font-medium transition-colors hover:bg-primary hover:text-white"
                >
                  👕 Custom Jerseys
                </Link>

              </div>
            </div>
          </div>

          {/* FIXED */}
          <Link
            href="/about-us"
            className="text-foreground font-semibold text-lg hover:text-primary transition-colors"
          >
            About Us
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
              Products
            </Link>

            <div>
              <button
                onClick={() => setIsCustomOpen(!isCustomOpen)}
                className="flex w-full items-center justify-between text-foreground font-semibold text-lg"
              >
                <span>Custom</span>

                <svg
                  className={`h-5 w-5 transition-transform ${isCustomOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div>
                <button
                  onClick={() => setIsCustomOpen(!isCustomOpen)}
                  className="flex w-full items-center justify-between text-lg font-semibold"
                >
                  <span>Custom</span>

                  <svg
                    className={`h-5 w-5 transition-transform ${isCustomOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {isCustomOpen && (
                  <div className="mt-3 ml-4 space-y-2 border-l pl-4">

                    <Link
                      href="/custom"
                      onClick={() => setIsMenuOpen(false)}
                      className="block"
                    >
                      👜 Custom Bags
                    </Link>

                    <Link
                      href="/custom-jerseys"
                      onClick={() => setIsMenuOpen(false)}
                      className="block"
                    >
                      👕 Custom Jerseys
                    </Link>

                  </div>
                )}
              </div>
            </div>

            {/* FIXED */}
            <Link
              href="/about-us"
              className="block text-foreground font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              href="/#contact"
              className="block text-foreground font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
