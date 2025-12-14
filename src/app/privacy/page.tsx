// src/app/privacy/page.tsx
"use client";

import { ShieldCheck, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white">
      <section className="py-20 container mx-auto px-4 flex-1">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-lg text-muted-foreground font-serif">
            Your privacy and data protection at SolidBrand
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200">

          {/* INTRO */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
            <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Our Privacy Commitment</h2>
              <p className="text-muted-foreground font-serif leading-relaxed">
                <strong>SolidBrand</strong> is committed to protecting and
                respecting your privacy. This Privacy Policy explains how we
                collect, use, and safeguard your personal information.
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-8 text-muted-foreground font-serif">

            <section>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Information We Collect
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Name, WhatsApp number, and contact details</li>
                <li>Order details and custom product requirements</li>
                <li>Communications made via WhatsApp or other channels</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-primary mb-2">
                How We Use Your Information
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>To process orders and provide custom production services</li>
                <li>To share production updates and delivery information</li>
                <li>To improve our products and customer services</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Data Security
              </h3>
              <p className="leading-relaxed">
                We implement reasonable and industry-standard security measures
                to protect your data from unauthorized access, misuse, or
                disclosure.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Third-Party Services
              </h3>
              <p className="leading-relaxed">
                SolidBrand does not share personal data with third parties,
                except when required to fulfill services such as logistics or
                when legally obligated.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Contact Us
              </h3>
              <p className="leading-relaxed flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:solidbrand@gmail.com?subject=Privacy%20Policy%20Inquiry"
                  className="text-primary font-semibold hover:underline"
                >
                  solidbrand@gmail.com
                </a>
              </p>
            </section>

            <p className="text-sm italic text-gray-400 pt-6">
              Effective Date: September 2025
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
