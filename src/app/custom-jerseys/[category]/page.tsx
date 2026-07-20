// src/app/custom-jerseys/[category]/page.tsx
"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    customJersey,
    jerseyCategories,
} from "@/data/customJersey";

import type { CustomCategory } from "@/data/customBag";

type Props = {
    params: Promise<{ category: string }>;
};

export default function BagCategoryPage({ params }: Props) {
    const { category } = use(params);

    const data: CustomCategory | undefined = customJersey[category];

    if (!data) {
        notFound();
    }

    const cleanPlanName = (name: string) =>
        name.replace(/[^\p{L}\p{N}\s]/gu, "").trim();

    const getWhatsAppLink = (planName: string) => {
        const productName = cleanPlanName(planName);

        const text = [
            "Hello SolidBrand Team,",
            "",
            "I would like to request a quotation for the following product:",
            "",
            `Product: ${productName}`,
            `Category: ${data.title}`,
            "Manufacturing: OEM / ODM / Private Label",
            "",
            "Order Information:",
            "- Minimum Order Quantity (MOQ): 12 pcs",
            "- Premium moisture-wicking fabric",
            "- Unlimited full-color sublimation printing",
            "- Free custom design (logo, names, numbers & sponsors)",
            "- Minimum Down Payment (DP): 70%",
            "- Production Time: 3–5 Business Days",
            "",
            "Please send me the quotation, production details, and available fabric options.",
            "",
            "Thank you!",
        ].join("\n");

        return `https://wa.me/6281289066999?text=${encodeURIComponent(text)}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4">

                <div className="flex flex-col gap-10 lg:flex-row">

                    {/* Sidebar */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="sticky top-24 rounded-3xl border bg-white p-8 shadow-sm">

                            <h2 className="mb-6 text-2xl font-bold">
                                Product Categories
                            </h2>

                            <nav className="flex flex-col gap-3">

                                <Link
                                    href="/custom-jerseys"
                                    className="rounded-2xl px-6 py-3.5 font-semibold transition hover:bg-gray-100"
                                >
                                    All Products
                                </Link>

                                {jerseyCategories.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/custom-jerseys/${item.id}`}
                                        className={`rounded-2xl px-6 py-3.5 font-semibold transition ${item.id === category
                                            ? "bg-teal-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}

                            </nav>

                        </div>
                    </aside>

                    {/* Content */}
                    <main className="flex-1">

                        <div className="mb-12 text-center">

                            <h1 className="text-5xl font-bold text-gray-900">
                                {data.title}
                            </h1>

                            <p className="mt-4 text-lg text-gray-600">
                                Custom bag manufacturing tailored to your specifications with OEM,
                                ODM, and Private Label services.
                            </p>

                        </div>

                        <div className="mx-auto max-w-2xl">

                            {data.plans.map((plan, i) => (
                                <div
                                    key={i}
                                    className="flex h-full flex-col rounded-3xl border bg-white p-8 shadow-lg transition-all hover:shadow-xl"
                                >
                                    <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                        {plan.name}
                                    </h2>

                                    <div className="mb-6">
                                        <div className="text-3xl font-bold text-primary">
                                            {plan.priceFrom}
                                        </div>
                                    </div>

                                    <p className="mb-6 text-sm text-gray-600">
                                        {plan.description}
                                    </p>

                                    <div className="mb-6 rounded-2xl border border-primary/10 bg-primary/5 p-4">
                                        <p className="text-sm font-semibold text-primary">
                                            Manufacturing Service
                                        </p>

                                        <p className="mt-1 text-sm text-gray-600">
                                            OEM • ODM • Private Label
                                        </p>
                                    </div>

                                    <ul className="mb-8 flex-1 space-y-3 text-sm">
                                        {plan.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-2"
                                            >
                                                <span className="mt-1 text-green-500">✔</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {plan.note && (
                                        <p className="mb-4 text-xs text-gray-500">
                                            {plan.note}
                                        </p>
                                    )}

                                    {plan.preOrderNote && (
                                        <p className="mb-6 border-t pt-4 text-xs font-medium text-amber-600">
                                            {plan.preOrderNote}
                                        </p>
                                    )}

                                    <Link
                                        href={getWhatsAppLink(plan.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
                                    >
                                        Get a Custom Quote
                                    </Link>
                                </div>
                            ))}

                        </div>

                    </main>

                </div>

            </div>
        </div>
    );
}