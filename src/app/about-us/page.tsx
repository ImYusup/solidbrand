// src/app/about-us/page.tsx
"use client";

import React from "react";
import { Award } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-20 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-black mb-4">
            About SolidBrand
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium OEM & ODM manufacturer specializing in custom bags and sports
            jerseys from Bandung, Indonesia.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
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

            {/* Description */}
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">
                Who We Are
              </h2>

              <p className="text-gray-700 leading-relaxed text-lg text-justify">SolidBrand is an Indonesian manufacturer
                Specializing in premium custom bags and custom sports jerseys.
                We provide OEM, ODM, and Private Label manufacturing services
                for businesses, sports clubs, schools, communities, organizations,
                and fashion brands worldwide.
              </p>
            </div>
          </div>

          {/* Legal PT */}
          <div className="mt-12 border-t pt-10">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Award className="text-amber-600" />
              Legal Company Information
            </h3>

            <div className="bg-gray-50 p-8 rounded-2xl text-center">

              <p className="text-gray-600 mb-6">
                SolidBrand is operated by a legally registered company in
                Indonesia and is committed to providing trusted manufacturing
                services for domestic and international customers.
              </p>

              <div className="max-w-md mx-auto">
                <img
                  src="/company/legal-pt.png"
                  alt="Legal Company Document"
                  className="w-full rounded-2xl shadow-lg border border-gray-200"
                />

                <p className="text-xs text-gray-500 mt-3">
                  Official Company Registration Document
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}