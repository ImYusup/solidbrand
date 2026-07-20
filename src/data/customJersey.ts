// src/data/customJersey.ts

import type { CustomCategory } from "./customBag";

export const jerseyCategories = [
  {
    id: "football",
    name: "Football Jersey",
  },
  {
    id: "futsal",
    name: "Futsal Jersey",
  },
  {
    id: "basketball",
    name: "Basketball Jersey",
  },
  {
    id: "volleyball",
    name: "Volleyball Jersey",
  },
  {
    id: "badminton",
    name: "Badminton Jersey",
  },
  {
    id: "cycling",
    name: "Cycling Jersey",
  },
  {
    id: "motocross",
    name: "Motocross Jersey",
  },
  {
    id: "running",
    name: "Running Jersey",
  },
  {
    id: "fishing",
    name: "Fishing Jersey",
  },
  {
    id: "esports",
    name: "Esports Jersey",
  },
];

const defaultPlan = {
  priceFrom: "Custom",
  priceTo: "",
  description:
    "Premium custom sports jersey designed for maximum comfort, breathability, and performance. Fully customizable with your team colors, logo, player names, and numbers. Ideal for clubs, schools, companies, communities, and tournaments worldwide.",
  features: [
    "OEM & ODM Manufacturing",
    "Private Label Service",
    "Premium moisture-wicking fabric",
    "Lightweight, breathable, and quick-drying",
    "Unlimited full-color sublimation printing",
    "High-quality double-stitched construction",
    "Free custom design (logo, names, numbers & sponsors)",
    "Minimum Order Quantity (MOQ): 12 pcs",
    "Production Time: 3–5 Business Days",
    "Worldwide Shipping Available",
  ],
  note:
    "Suitable for professional sports teams, schools, universities, companies, communities, tournaments, and promotional events.",
  preOrderNote:
    "Minimum Down Payment (DP) 70%. Production begins immediately after design approval and payment confirmation.",
};

export const customJersey: Record<string, CustomCategory> = {
  football: {
    title: "Football Jersey",
    plans: [
      {
        name: "⚽ Football Jersey",
        ...defaultPlan,
      },
    ],
  },

  futsal: {
    title: "Futsal Jersey",
    plans: [
      {
        name: "🥅 Futsal Jersey",
        ...defaultPlan,
      },
    ],
  },

  basketball: {
    title: "Basketball Jersey",
    plans: [
      {
        name: "🏀 Basketball Jersey",
        ...defaultPlan,
      },
    ],
  },

  volleyball: {
    title: "Volleyball Jersey",
    plans: [
      {
        name: "🏐 Volleyball Jersey",
        ...defaultPlan,
      },
    ],
  },

  badminton: {
    title: "Badminton Jersey",
    plans: [
      {
        name: "🏸 Badminton Jersey",
        ...defaultPlan,
      },
    ],
  },

  cycling: {
    title: "Cycling Jersey",
    plans: [
      {
        name: "🚴 Cycling Jersey",
        ...defaultPlan,
      },
    ],
  },

  motocross: {
    title: "Motocross Jersey",
    plans: [
      {
        name: "🏍️ Motocross Jersey",
        ...defaultPlan,
      },
    ],
  },

  running: {
    title: "Running Jersey",
    plans: [
      {
        name: "🏃 Running Jersey",
        ...defaultPlan,
      },
    ],
  },

  fishing: {
    title: "Fishing Jersey",
    plans: [
      {
        name: "🎣 Fishing Jersey",
        ...defaultPlan,
      },
    ],
  },

  esports: {
    title: "Esports Jersey",
    plans: [
      {
        name: "🎮 Esports Jersey",
        ...defaultPlan,
      },
    ],
  },
};