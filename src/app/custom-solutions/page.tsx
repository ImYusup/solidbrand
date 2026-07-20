"use client";

import { useState } from "react";

export default function CustomSolutionsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requestApps: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailBody = `
Name: ${formData.name}
Phone Number: ${formData.phone}
Email: ${formData.email}
Application Request: ${formData.requestApps}
`.trim();
    const mailtoLink = `mailto:solidbrand@gmail.com?subject=Custom Solutions Request&body=${encodeURIComponent(
      emailBody
    )}`;
    window.location.href = mailtoLink;
    setFormData({ name: "", phone: "", email: "", requestApps: "" }); // Reset form
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-20 container mx-auto px-4 flex-1">
        <h1 className="text-4xl font-bold mb-10 text-center">Custom Solutions</h1>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
          <p className="text-foreground font-serif mb-4">
            Please fill out the form below to submit your custom application request:
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-border p-2"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-foreground"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-border p-2"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-border p-2"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label
                htmlFor="requestApps"
                className="block text-sm font-medium text-foreground"
              >
                Application Request
              </label>
              <textarea
                id="requestApps"
                name="requestApps"
                value={formData.requestApps}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border border-border p-2"
                placeholder="Describe your custom application request here..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
