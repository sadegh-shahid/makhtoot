// src/components/ShopSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "فرش دستباف", image: "/images/product1.jpg" },
  { id: 2, name: "مینیاتور", image: "/images/product2.jpg" },
  { id: 3, name: "سفال", image: "/images/product3.jpg" },
  { id: 4, name: "مجسمه برنزی", image: "/images/product4.jpg" },
];

export default function ShopSlider() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">فروشگاه</h2>
          <Link to="/shop" className="text-[#b48c64] hover:underline">
            مشاهده همه
          </Link>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          dir="rtl"
        >
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <Link
                to={`/shop`}
                className="block bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{p.name}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
