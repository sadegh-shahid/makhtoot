// src/components/ShopSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { products, artists } from "../data/products";

export default function ShopSlider() {
  const artistNameOf = (id) => artists.find((a) => a.id === id)?.name || "";

  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">فروشگاه</h2>
          <a href="/shop" className="text-[var(--brand)] hover:underline">مشاهده همه</a>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          dir="rtl"
        >
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} artistName={artistNameOf(p.artistId)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
