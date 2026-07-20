// src/lib/slug.ts
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-");
}

export function unslugCategory(slug: string) {
  return slug;
}