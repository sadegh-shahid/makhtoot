// src/components/HeroCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/hero1.jpg",
    title: "حراج آثار هنری",
    desc: "جدیدترین مزایده‌ها را مشاهده کنید",
  },
  {
    image: "/images/hero2.jpg",
    title: "گالری فروشگاه",
    desc: "آثار منتخب هنرمندان برتر",
  },
  {
    image: "/images/hero3.jpg",
    title: "صدور شناسنامه",
    desc: "اطمینان از اصالت اثر هنری شما",
  },
];

export default function HeroCarousel() {
  return (
    <div className="w-full h-[400px] md:h-[550px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        dir="rtl"
        className="w-full h-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${s.image})` }}
            >
              <div className="absolute bottom-6 right-6 bg-black/60 text-white p-4 rounded-xl max-w-xs">
                <h2 className="text-xl md:text-2xl font-bold">{s.title}</h2>
                <p className="text-sm md:text-base mt-2">{s.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
