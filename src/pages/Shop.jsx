// src/pages/Shop.jsx
import React from "react";
import { products, artists } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const artistNameOf = (id) => artists.find((a) => a.id === id)?.name || "";

  return (
    <main className="pt-16 p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">فروشگاه</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} artistName={artistNameOf(p.artistId)} />
        ))}
      </div>
    </main>
  );
}
