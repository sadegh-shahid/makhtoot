import React from "react";
import { useParams } from "react-router-dom";
import { categories, products, artists } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { id } = useParams();
  const cat = categories.find(c => c.id === id);
  const items = products.filter(p => p.category === id);
  const artistNameOf = (aid) => artists.find(a => a.id === aid)?.name || "";

  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{cat?.title || "دسته‌بندی"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(p => <ProductCard key={p.id} product={p} artistName={artistNameOf(p.artistId)} />)}
      </div>
    </main>
  );
}
