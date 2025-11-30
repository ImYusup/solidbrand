// src/app/page.tsx
"use client";

import { HeroSection } from "@/components/hero-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { CustomerSlideshow } from "@/components/customer-slideshow";
import { FeaturedProductsSection } from "@/components/FeaturedProductsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturedProductsSection />
        <WhyChooseSection />
        <CustomerSlideshow />   
      </main>
    </div>
  );
}