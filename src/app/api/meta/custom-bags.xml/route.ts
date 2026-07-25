// src/app/api/meta/custom-bags.xml/route.ts

const BASE_URL = "https://solidbrand.id";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
xmlns:g="http://base.google.com/ns/1.0">

<channel>

<title>SOLID Custom Bags</title>
<link>${BASE_URL}</link>
<description>SOLID Custom Bag Services</description>

<item>

<g:id>solid-custom-bags</g:id>

<g:title><![CDATA[
SOLID Custom Bags
]]></g:title>

<g:description><![CDATA[
Premium custom bag manufacturing for companies, schools, organizations, communities, and brands.

✔ Pouch Bag
✔ Sling Bag
✔ Backpack
✔ Tote Bag
✔ Waist Bag
✔ Laptop Bag
✔ Travel Bag

• MOQ starts from 12 pcs
• OEM & Private Label
• Fully Customized
• Worldwide Shipping

Price varies depending on quantity, material, and specifications. Contact us for a quotation.
]]></g:description>

<g:link>
${BASE_URL}/custom
</g:link>

<g:image_link>
${BASE_URL}/custom/custombags-cover.png
</g:image_link>

<g:availability>in stock</g:availability>

<g:condition>new</g:condition>

<g:price>1 IDR</g:price>

<g:brand>SOLID</g:brand>

<g:product_type>Custom Bags</g:product_type>

</item>

</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}