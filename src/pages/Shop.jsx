// src/pages/Shop.jsx
import React, { useState, useMemo } from "react";
import { products, artists, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const artistNameOf = (id) => artists.find((a) => a.id === id)?.name || "";

  const filteredItems = useMemo(() => {
    let items = products;

    if (searchQuery) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (sortOrder === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [searchQuery, selectedCategory, sortOrder]);

  return (
    <main className="pt-16 p-4 md:p-6 max-w-6xl mx-auto">
      <title>فروشگاه - گالری هنری پارسیان</title>
      <meta name="description" content="محصولات هنری اصیل ایرانی را از فروشگاه ما خریداری کنید." />
      <h1 className="text-2xl font-bold mb-4">فروشگاه</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="جستجو بر اساس نام..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg md:w-1/3"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">همه دسته‌بندی‌ها</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="default">مرتب‌سازی پیش‌فرض</option>
          <option value="price-asc">ارزان‌ترین</option>
          <option value="price-desc">گران‌ترین</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((p) => (
          <ProductCard key={p.id} product={p} artistName={artistNameOf(p.artistId)} />
        ))}
      </div>
    </main>
  );
}
