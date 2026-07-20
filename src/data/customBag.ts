// src/data/customBag.ts

export interface CustomPlan {
  name: string;
  priceFrom: string;
  priceTo?: string;
  description: string;
  features: string[];
  note?: string;
  preOrderNote?: string;
}

export interface CustomCategory {
  title: string;
  plans: CustomPlan[];
}

export const bagCategories = [
  {
    id: "pouch",
    name: "Pouch Bag",
  },
  {
    id: "sling",
    name: "Sling Bag",
  },
  {
    id: "backpack",
    name: "Backpack",
  },
  {
    id: "travel",
    name: "Travel Bag",
  },
];

export const customBag: Record<string, CustomCategory> = {
  pouch: {
    title: "Pouch Bag",
    plans: [
      {
        name: "👜 Pouch Bag",
        priceFrom: "Custom",
        priceTo: "",
        description:
          "High-quality custom pouch bag manufacturing tailored to your brand and business requirements.",
        features: [
          "OEM & ODM Manufacturing",
          "Private Label Service",
          "Materials Standard: Cordura / Taslan",
          "Materials Premium: Canvas / Corduroy Bimo / Filamen",
          "Custom Size & Design",
          "Custom Colors",
          "Logo Printing or Embroidery",
          "Minimum Order Quantity (MOQ): 12 pcs",
          "Strict Quality Control Inspection",
          "Production Lead Time: 3–5 Business Days",
          "Worldwide Shipping Available",
        ],
        note:
          "Perfect for corporate gifts, merchandise, promotional products, and retail brands.",
        preOrderNote:
          "Minimum Down Payment (DP) 70%. Production starts immediately after payment confirmation.",
      },
    ],
  },

  sling: {
    title: "Sling Bag",
    plans: [
      {
        name: "🎒 Sling Bag",
        priceFrom: "Custom",
        priceTo: "",
        description:
          "Professional custom sling bag manufacturing with premium craftsmanship and durable materials.",
        features: [
          "OEM & ODM Manufacturing",
          "Private Label Service",
          "Materials Standard: Cordura / Taslan",
          "Materials Premium: Canvas / Corduroy Bimo / Filamen",
          "Custom Size & Design",
          "Custom Colors",
          "Logo Printing or Embroidery",
          "Minimum Order Quantity (MOQ): 12 pcs",
          "Strict Quality Control Inspection",
          "Production Lead Time: 3-5 Business Days",
          "Worldwide Shipping Available",
        ],
        note:
          "Ideal for fashion brands, promotional events, and corporate merchandise.",
        preOrderNote:
          "Minimum Down Payment (DP) 70%. Production starts immediately after payment confirmation.",
      },
    ],
  },

  backpack: {
    title: "Backpack",
    plans: [
      {
        name: "🎒 Backpack",
        priceFrom: "Custom",
        priceTo: "",
        description:
          "Custom backpack manufacturing for schools, companies, outdoor brands, and retail businesses.",
        features: [
          "OEM & ODM Manufacturing",
          "Private Label Service",
          "Materials Standard: Cordura / Taslan",
          "Materials Premium: Canvas / Corduroy Bimo / Filamen",
          "Custom Size & Design",
          "Custom Colors",
          "Logo Printing or Embroidery",
          "Minimum Order Quantity (MOQ): 12 pcs",
          "Strict Quality Control Inspection",
          "Production Lead Time: 3-5 Business Days",
          "Worldwide Shipping Available",
        ],
        note:
          "Recommended for educational institutions, outdoor products, and corporate branding.",
        preOrderNote:
          "Minimum Down Payment (DP) 70%. Production starts immediately after payment confirmation.",
      },
    ],
  },

  travel: {
    title: "Travel Bag",
    plans: [
      {
        name: "🧳 Travel Bag",
        priceFrom: "Custom",
        priceTo: "",
        description:
          "Durable custom travel bag manufacturing for travel brands, sports companies, and promotional campaigns.",
        features: [
          "OEM & ODM Manufacturing",
          "Private Label Service",
          "Materials Standard: Cordura / Taslan",
          "Materials Premium: Canvas / Corduroy Bimo / Filamen",
          "Custom Size & Design",
          "Custom Colors",
          "Logo Printing or Embroidery",
          "Minimum Order Quantity (MOQ): 12 pcs",
          "Strict Quality Control Inspection",
          "Production Lead Time: 3-5 Business Days",
          "Worldwide Shipping Available",
        ],
        note:
          "Suitable for travel brands, sports equipment, and promotional products.",
        preOrderNote:
          "Minimum Down Payment (DP) 70%. Production starts immediately after payment confirmation.",
      },
    ],
  },
};