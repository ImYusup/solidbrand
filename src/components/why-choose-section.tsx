// src/components/why-choose-section.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shirt,
  Backpack,
  Palette,
  Truck,
  Clock,
  ShieldCheck,
  Star,
  Users,
  FileText,
  MessageCircle
} from "lucide-react"

const reasons = [
  {
    icon: Backpack,
    title: "Sling Bags • Backpacks • Travel Bags • Premium Custom Bags",
    description:
      "Imported materials, strong stitching, and modern designs — perfect for daily use, traveling, or team merchandise.",
  },
  {
    icon: Shirt,
    title: "100% Custom Sports Jerseys",
    description:
      "Full print, gradients, team photos, sponsor logos — everything is possible! Free revisions until fully approved.",
  },
  {
    icon: Palette,
    title: "Japanese & Chinese Sublimation Printing (Fade Resistant)",
    description:
      "Colors stay sharp and vibrant even after 100 washes or daily exposure to sunlight, mud, and tough conditions.",
  },
  {
    icon: Truck,
    title: "Minimum Order Only 12 Pieces",
    description:
      "All-in pricing: design, printing, and revisions included. Ideal for small teams up to professional clubs.",
  },
  {
    icon: Clock,
    title: "Fast Production: 3–5 Days",
    description:
      "Design approved today → your 12-piece order is ready within 3–5 days. Fast, efficient, and reliable.",
  },
  {
    icon: ShieldCheck,
    title: "100% Satisfaction Guarantee",
    description:
      "Wrong design or production defect? We revise for free or replace with a new unit — no hassle.",
  },
  {
    icon: FileText,
    title: "Automatic & Professional PDF Invoice",
    description:
      "Every order includes an official PDF invoice with SOLID branding, order number, and item details — ready for accounting and reports.",
    highlight: true,
  },
  {
    icon: MessageCircle,
    title: "Invoice Sent Instantly via WhatsApp",
    description:
      "Just click “Order Now” → invoice and payment link are delivered directly to your WhatsApp within seconds.",
    highlight: true,
  },
  {
    icon: Star,
    title: "Trusted by Hundreds of Teams & Communities",
    description:
      "From local clubs and schools to universities, esports teams, and national athletes — all trust SOLID.",
  },
  {
    icon: Users,
    title: "24/7 Customer Support via WhatsApp",
    description:
      "Ask about materials, request mockups, revise designs, or check order status — fast, friendly, and responsive support.",
  },
]

export function WhyChooseSection() {
  return (
    <section className="py-16 lg:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Why Choose
            <span className="block text-accent text-5xl md:text-6xl lg:text-7xl mt-2">
              SOLID?
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-600 max-w-5xl mx-auto font-medium">
            We don’t just produce jerseys and bags — we help your team
            <span className="text-accent font-bold">
              {" "}stand out, look solid, and feel professional
            </span>{" "}
            with the easiest production process in Indonesia.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className={`text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/95 backdrop-blur ${reason.highlight ? "ring-4 ring-accent/20 bg-gradient-to-br from-accent/5 to-white" : ""
                }`}
            >
              <CardHeader>
                <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${reason.highlight ? "bg-accent/20" : "bg-accent/10"
                  }`}>
                  <reason.icon className={`h-9 w-9 ${reason.highlight ? "text-accent" : "text-accent/80"}`} />
                </div>
                <CardTitle className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                  {reason.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base lg:text-lg leading-relaxed text-gray-600">
                  {reason.description}
                </CardDescription>
              </CardContent>
              {reason.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    BEST FEATURE
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}