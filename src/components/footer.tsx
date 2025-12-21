// src/components/footer.tsx
"use client";

import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted/50 py-16 w-full border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-16 text-center md:text-left">

          {/* BRAND */}
          <div className="space-y-4 mb-10 md:mb-0">
            <div className="flex justify-center md:justify-start">
              <span className="font-bold text-2xl tracking-tight lowercase">
                solid<span className="text-primary">brand</span>
              </span>
            </div>

            <p className="text-muted-foreground font-serif max-w-sm mx-auto md:mx-0">
              Premium bag manufacturing & custom jerseys. Serving individual,
              team, community, and brand-scale production.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">

              {/* SOLID BAG */}
              <div className="flex items-center gap-3">
                <span className="font-semibold">Solid Bag</span>
                <a
                  href="https://www.facebook.com/solidbag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/solidbag_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

              {/* SOLID JERSEY */}
              <div className="flex items-center gap-3">
                <span className="font-semibold">Solid Jersey</span>
                <a
                  href="https://www.facebook.com/jersey.solidbrand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/solidjersey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

            </div>
          </div>

          {/* CONTACT */}
          <div id="contact" className="mb-10 md:mb-0">
            <h3 className="font-bold text-lg mb-4 text-primary">
              Contact Us
            </h3>
            <ul className="space-y-2 text-muted-foreground font-serif">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <Phone className="h-4 w-4 mt-1 text-primary" />
                <a
                  href="https://wa.me/6281289066999?text=Hello%20SolidBrand%2C%20I%20would%20like%20to%20custom%20bags%20or%20jerseys."
                  target="_blank"
                  className="hover:text-primary"
                >
                  +62 812-8906-6999
                </a>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4 mt-1 text-primary" />
                <a
                  href="mailto:solidbrand@gmail.com"
                  className="hover:text-primary"
                >
                  solidbrand@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span>Bandung – West Java, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* PRODUCTS */}
          <div className="mb-10 md:mb-0">
            <h3 className="font-bold text-lg mb-4 text-primary">
              Products
            </h3>
            <ul className="space-y-2 text-muted-foreground font-serif">
              <li>
                <Link
                  href="/products?category=Bags/Luggage"
                  className="hover:text-primary"
                >
                  Bags / Luggage
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Jersey Sports"
                  className="hover:text-primary"
                >
                  Sports Jerseys
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="mb-10 md:mb-0">
            <h3 className="font-bold text-lg mb-4 text-primary">
              Company
            </h3>
            <ul className="space-y-2 text-muted-foreground font-serif">
              <li>
                <Link href="/about-us" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://imyusupblogs.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 text-center text-muted-foreground font-serif">
          <p className="font-bold text-lg">
            &copy; 2025 SolidBrand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
