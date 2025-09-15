// src/pages/Auction.jsx
import React from "react";

const auctions = [
  { id: 1, title: "تابلو شاهنامه", image: "/images/product2.jpg", desc: "اثر منتخب نگارگر" },
  { id: 2, title: "ست سفالی", image: "/images/product3.jpg", desc: "دست‌ساز معاصر" },
  { id: 3, title: "تابلو خوشنویسی", image: "/images/product4.jpg", desc: "نستعلیقِ استاد" },
  { id: 4, title: "فرش نفیس", image: "/images/product1.jpg", desc: "فرش دستباف قدیمی" },
];

export default function Auction() {
  return (
    <main className="pt-16 p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">مزایده‌ها</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auctions.map((a) => (
          <article key={a.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img src={a.image} alt={a.title} className="w-full h-56 object-cover" />
            <div className="p-3">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.desc}</p>
              <button className="mt-3 px-3 py-1 bg-[var(--brand)] text-white rounded">شرکت در مزایده</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
