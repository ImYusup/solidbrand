// src/app/privacy/page.tsx
"use client";

import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-20 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-black mb-4">
            Privacy Policy
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Protecting your privacy is our priority at SolidBrand.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">

          {/* Intro */}
          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* Logo */}
            <div className="md:w-1/3">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src="/logo/icon.png"
                  alt="SolidBrand Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">
                Our Commitment
              </h2>

              <p className="text-lg leading-8 text-gray-700 text-justify">
                At <strong>SolidBrand</strong>, we value and respect your
                privacy. This Privacy Policy explains how we collect, use,
                protect, and manage your personal information when you
                purchase our products or use our manufacturing services.
              </p>
            </div>

          </div>

          {/* Content */}
          <div className="mt-12 space-y-8">

            <section>
              <h3 className="text-2xl font-semibold text-primary mb-3">
                Information We Collect
              </h3>

              <ul className="list-disc list-inside space-y-2 text-gray-700 leading-7">
                <li>Full name, phone number, email address, and shipping address.</li>
                <li>Order information and custom manufacturing requirements.</li>
                <li>Communications through WhatsApp, email, or other customer support channels.</li>
                <li>Basic website usage information to improve our services.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-primary mb-3">
                How We Use Your Information
              </h3>

              <ul className="list-disc list-inside space-y-2 text-gray-700 leading-7">
                <li>To process orders and provide OEM, ODM, and Private Label manufacturing services.</li>
                <li>To communicate production progress, payments, and shipping updates.</li>
                <li>To improve our products, services, and customer experience.</li>
                <li>To comply with legal obligations and business requirements.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-primary mb-3">
                Data Protection
              </h3>

              <p className="text-gray-700 leading-8 text-justify">
                We implement industry-standard security measures to protect
                your personal information from unauthorized access,
                disclosure, alteration, or misuse. Your information is
                handled responsibly and only accessed by authorized personnel.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-primary mb-3">
                Third-Party Services
              </h3>

              <p className="text-gray-700 leading-8 text-justify">
                We may share limited information with trusted third-party
                service providers such as shipping companies, payment
                gateways, or communication platforms solely for the purpose
                of completing your order and delivering our services.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-primary mb-3">
                Contact Us
              </h3>

              <p className="text-gray-700 leading-8">
                If you have any questions regarding this Privacy Policy,
                please contact us at:
                <br />
                📧{" "}
                <a
                  href="mailto:solidbrand@gmail.com?subject=Privacy%20Policy%20Inquiry"
                  className="text-primary font-bold hover:underline"
                >
                  solidbrand@gmail.com
                </a>
              </p>
            </section>

            <p className="text-sm italic text-gray-500">
              Effective Date: September 2025
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}