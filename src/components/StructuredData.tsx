// src/components/StructuredData.tsx

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://solidbrand.id/#organization",
        name: "Solid Brand",
        url: "https://solidbrand.id",
        logo: {
          "@type": "ImageObject",
          url: "https://www.solidbrand.id/logo/icon.png",
        },
        description:
          "Solid Brand is an Indonesian manufacturer specializing in custom bags, sports jerseys, OEM production, and private label manufacturing for businesses, teams, communities, and brands worldwide.",
        telephone: "+6281289066999",
        email: "solidbrand@gmail.com",
        sameAs: [
          "https://facebook.com/solidbag",
          "https://facebook.com/jersey.solidbrand",
          "https://instagram.com/solidbag_",
          "https://instagram.com/solidjersey",
        ]
      },

      {
        "@type": "WebSite",
        "@id": "https://solidbrand.id/#website",
        url: "https://solidbrand.id",
        name: "Solid Brand",
        publisher: {
          "@id": "https://solidbrand.id/#organization"
        },
        inLanguage: "en"
      },

      {
        "@type": "ProfessionalService",
        "@id": "https://solidbrand.id/#service",
        name: "Solid Brand",
        image: "https://solidbrand.id/og-image.png",
        url: "https://solidbrand.id",
        telephone: "+6281289066999",
        areaServed: "Worldwide",
        priceRange: "$$",
        description:
          "Professional manufacturer of custom bags, backpacks, sling bags, travel bags, pouches, sports jerseys, OEM products, private label manufacturing, promotional merchandise, and corporate apparel.",
        provider: {
          "@id": "https://solidbrand.id/#organization"
        },
        serviceType: [
          "Custom Bag Manufacturing",
          "Custom Backpack Manufacturing",
          "Custom Sling Bag Manufacturing",
          "Custom Travel Bag Manufacturing",
          "Custom Pouch Manufacturing",
          "Sports Jersey Manufacturing",
          "OEM Bag Manufacturing",
          "Private Label Manufacturing",
          "Corporate Merchandise",
          "Promotional Products"
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}