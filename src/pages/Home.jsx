// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination } from "swiper/modules";
import { products } from "../data/products";

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

import { useForm } from "react-hook-form";

function MiniRequestForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const toBase64 = (file) =>
      new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

    const imagesBase64 = [];
    try {
      for (const f of data.photos) {
        if (f && f.size) imagesBase64.push(await toBase64(f));
      }
    } catch (err) {
      console.error(err);
      alert("خطا در بارگذاری تصاویر.");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("mini_register_requests") || "[]");
    saved.push({
      title: data.title,
      name: data.name,
      phone: data.phone,
      images: imagesBase64,
      date: new Date().toISOString(),
      source: "mini",
    });
    localStorage.setItem("mini_register_requests", JSON.stringify(saved));

    reset();
    alert("درخواست سریع شما ثبت شد (دمو).");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">عنوان اثر *</label>
        <input {...register("title", { required: "عنوان اثر الزامی است" })} className="w-full border p-2 rounded" placeholder="مثلاً: فرش تبریز اصیل" />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">تصاویر اثر (اختیاری)</label>
        <input {...register("photos")} type="file" accept="image/*" multiple className="w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">نام *</label>
          <input {...register("name", { required: "نام الزامی است" })} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">شماره تماس *</label>
          <input
            {...register("phone", {
              required: "شماره تماس الزامی است",
              pattern: {
                value: /09[0-9]{9}/,
                message: "شماره تماس معتبر نیست"
              }
            })}
            type="tel"
            className="w-full border p-2 rounded"
            placeholder="09xxxxxxxxx"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button type="submit" className="px-4 py-2 bg-[var(--brand)] text-white rounded">ارسال درخواست</button>
        <small className="text-gray-500 text-xs">ارسال به صورت دمو</small>
      </div>
    </form>
  );
}
