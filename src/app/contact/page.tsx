// src/app/contact/page.tsx
"use client";

import React, { useState } from "react";
import { Bot, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailBody = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
        const mailtoLink = `mailto:solidbrand@gmail.com?subject=Contact from  Website&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        setFormData({ name: "", phone: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white">
            <section className="py-20 container mx-auto px-4 flex-1">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-black mb-3">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600">
                        We're here to help you grow your business
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                    <div className="flex flex-col md:flex-row items-center gap-6">
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

                        {/* Contact Info */}
                        <div className="md:w-2/3">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
                            <p className="text-foreground font-serif mb-6 leading-relaxed">
                                Have questions? We're just a message away.
                            </p>

                            <div className="space-y-4">
                                <div className="flex gap-3 items-start">
                                    <Mail className="h-5 w-5 text-emerald-600 mt-1" />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <a
                                            href="mailto:solidbrand@gmail.com?subject=Contact%20from%20Solidbrand%20Website"
                                            className="text-emerald-600 hover:underline font-medium"
                                        >
                                            solidbrand@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <Phone className="h-5 w-5 text-emerald-600 mt-1" />
                                    <div>
                                        <p className="font-medium">WhatsApp</p>
                                        <a
                                            href="https://wa.me/6281289066999?text=Hello%20Solidbrand%2C%20I'm%20interested%20in%20your%20automation%20and%20digital%20marketing%20solutions.%20Could%20you%20arrange%20a%20demo%3F"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-emerald-600 hover:underline font-medium"
                                        >
                                            +62 812-8906-6999
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <MapPin className="h-5 w-5 text-emerald-600 mt-1" />
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-gray-600">Bandung, West Java, Indonesia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="mt-10 pt-8 border-t border-gray-200">
                        <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                                    placeholder="628xxxxxxxxxx"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-2xl font-semibold transition"              >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}