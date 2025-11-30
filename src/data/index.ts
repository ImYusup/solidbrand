// src/data/index.ts
import { products } from "./products";  
import { jerseys } from "./jerseys";    
import type { Product } from "./products";

export const allProducts: Product[] = [
  ...products,
  ...jerseys,
];

// Optional: kategori berdasarkan filter
export const categories = {
  bags: products,
  jerseys: jerseys,
};
