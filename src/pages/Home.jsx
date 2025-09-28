// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination } from "swiper/modules";
import { products, auctions } from "../data/products";
import MiniRequestForm from "../components/forms/MiniRequestForm";

import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  return (
    <main className="pt-16">
      <title>گالری هنری پارسیان - صفحه اصلی</title>
      <meta name="description" content="گالری هنری آنلاین پارسیان، محلی برای نمایش و فروش آثار هنری اصیل ایرانی." />
      {/* ✅ Hero Carousel */}
      <section className="mb-6">
        <Swiper
          modules={[ Pagination]}
          
          pagination={{ clickable: true }}
          loop
          className="h-[300px] md:h-[500px]"
          dir="rtl"
        >
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img src="/images/hero1.jpg" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-6 left-6 bg-black/50 text-white p-4 rounded">
                <h2 className="text-xl md:text-2xl font-bold">حراج ویژه آثار هنری</h2>
                <p className="text-sm">اکنون مزایده فعال است — از دست ندهید!</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img src="/images/hero2.jpg" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-6 left-6 bg-black/50 text-white p-4 rounded">
                <h2 className="text-xl md:text-2xl font-bold">جدیدترین محصولات فروشگاه</h2>
                <p className="text-sm">فرش، تابلو و آثار ارزشمند در یک مکان</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img src="/images/hero3.jpg" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-6 left-6 bg-black/50 text-white p-4 rounded">
                <h2 className="text-xl md:text-2xl font-bold">ثبت اثر برای صدور شناسنامه</h2>
                <p className="text-sm">اطمینان از اصالت با گواهی رسمی</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* ✅ فروشگاه Slider */}
      <section className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">فروشگاه</h2>
          <Link to="/shop" className="text-[var(--brand)]">مشاهده همه</Link>
        </div>

        <Swiper
         
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{ 768: { slidesPerView: 3 } }}
          dir="rtl"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/product/${item.id}`}>
                <article className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.price}</p>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ✅ مزایده Slider */}
      <section className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">مزایده</h2>
          <Link to="/auction" className="text-[var(--brand)]">مشاهده همه</Link>
        </div>

        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          dir="rtl"
        >
          {auctions.map((a) => (
            <SwiperSlide key={a.id}>
              <Link to={`/product/${a.id}`}>
                <article className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                  <img src={a.image} alt={a.name} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <h3 className="font-semibold">{a.name}</h3>
                    <p className="text-sm text-gray-600">{a.desc}</p>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ✅ Mini Request Form */}
      <section className="p-4 md:p-6">
        <h2 className="text-xl font-bold mb-3">درخواست ثبت اثر (سریع)</h2>
        <div className="bg-white rounded-xl p-4 border">
          <MiniRequestForm />
        </div>

        <div className="mt-4">
          <Link to="/certificate" className="inline-block px-4 py-2 bg-[var(--brand)] text-white rounded">رفتن به فرم کامل</Link>
        </div>
      </section>
    </main>
  );
}
