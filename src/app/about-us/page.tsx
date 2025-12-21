// src/app/about-us/page.tsx
"use client";

import { Shirt, Briefcase, MapPin } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white">
      <section className="py-20 container mx-auto px-4 flex-1">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            About <span className="text-primary">SolidBrand</span>
          </h1>
          <p className="text-lg text-muted-foreground font-serif">
            Premium Bag Production & Custom Sports Jerseys from Bandung
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200">

          {/* INTRO */}
          <div className="grid md:grid-cols-3 gap-8 items-center mb-10">

            {/* LOGO */}
            <div className="flex justify-center">
              <div className="w-36 h-36 rounded-2xl bg-primary/10 flex items-center justify-center">
                <img
                  src="/logo/icon.png"
                  alt="SolidBrand Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Who Are We?</h2>
              <p className="text-muted-foreground font-serif leading-relaxed mb-4">
                <strong>SolidBrand</strong> is a local brand specializing in
                <strong> premium bag manufacturing</strong> and
                <strong> custom sports jerseys</strong>. We serve individuals,
                teams, communities, and brand production needs with high quality
                standards.
              </p>
              <p className="text-muted-foreground font-serif leading-relaxed">
                Our focus is delivering products that are functional, durable,
                and built with a strong design identity.
              </p>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Our Products & Services
            </h3>

            <ul className="space-y-4 text-muted-foreground font-serif">
              <li className="flex gap-3 items-start">
                <Briefcase className="h-5 w-5 text-primary mt-1" />
                <span>
                  <strong>Custom Bags & Luggage:</strong> Sling bags, backpacks,
                  travel bags, work bags, and promotional bags made with premium
                  materials.
                </span>
              </li>

              <li className="flex gap-3 items-start">
                <Shirt className="h-5 w-5 text-primary mt-1" />
                <span>
                  <strong>Custom Sports Jerseys:</strong> Futsal, basketball,
                  volleyball, badminton, and community jerseys — available for
                  single orders or team production.
                </span>
              </li>
            </ul>
          </div>

          {/* WHY US */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Why Choose SolidBrand?
            </h3>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground font-serif">
              <li>Accepts single orders, team orders, and brand production</li>
              <li>Selected materials & precise stitching</li>
              <li>Custom designs tailored to your needs</li>
              <li>Local production in Bandung</li>
              <li>Competitive & transparent pricing</li>
            </ul>
          </div>

          {/* LOCATION */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">
              Production Location
            </h3>

            <div className="flex items-start gap-3 text-muted-foreground font-serif">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <span>Bandung – West Java, Indonesia</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
