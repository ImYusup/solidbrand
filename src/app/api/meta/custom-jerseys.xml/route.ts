// src/app/api/meta/custom-jerseys.xml/route.ts

const BASE_URL = "https://solidbrand.id";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
xmlns:g="http://base.google.com/ns/1.0">

<channel>

<title>SOLID Custom Sports Jerseys</title>
<link>${BASE_URL}</link>
<description>SOLID Custom Jersey Services</description>

<item>

<g:id>solid-custom-jerseys</g:id>

<g:title><![CDATA[
SOLID Custom Sports Jerseys
]]></g:title>

<g:description><![CDATA[
Premium fully customized sports jerseys.

✔ Football
✔ Basketball
✔ Volleyball
✔ Badminton
✔ Running
✔ Cycling
✔ Fishing
✔ Esports
✔ Motocross

• Order from 12 pcs
• Team Orders
• Clubs
• Schools
• Companies
• Worldwide Shipping

Price varies depending on quantity, material, and specifications. Contact us for a quotation.
]]></g:description>

<g:link>
${BASE_URL}/custom-jerseys
</g:link>

<g:image_link>
${BASE_URL}/custom/customjersey-cover.png
</g:image_link>

<g:availability>in stock</g:availability>

<g:condition>new</g:condition>

<g:price>1 IDR</g:price>

<g:brand>SOLID</g:brand>

<g:product_type>Custom Jerseys</g:product_type>

</item>

</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}