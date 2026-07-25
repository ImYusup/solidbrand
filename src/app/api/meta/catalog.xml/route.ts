// src/app/api/meta/catalog.xml/route.ts
import { allProducts } from "@/data";

const BASE_URL = "https://solidbrand.id";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
xmlns:g="http://base.google.com/ns/1.0">
<channel>

<title>SOLID Brand Catalog</title>
<link>${BASE_URL}</link>
<description>SOLID Product Feed</description>

${allProducts
  .map((product) => {
    const image =
      product.images?.[0]
        ? `${BASE_URL}${product.images[0]}`
        : `${BASE_URL}/logo/icon.png`;

    return `
<item>

<g:id>${product.id}</g:id>

<g:title><![CDATA[
${product.name}
]]></g:title>

<g:description><![CDATA[
${product.description}
]]></g:description>

<g:link>
${BASE_URL}/products/${product.id}
</g:link>

<g:image_link>
${image}
</g:image_link>

<g:availability>in stock</g:availability>

<g:condition>new</g:condition>

<g:price>${product.discountPrice ?? product.price} IDR</g:price>

<g:brand>SOLID</g:brand>

<g:product_type>${product.category}</g:product_type>

</item>
`;
  })
  .join("")}

</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}