import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ProductCard from "./ProductCard";
import { products, artists } from "../data/products";

export default function ProductSlider() {
  const artistNameOf = (id) => artists.find(a => a.id === id)?.name || "";
  return (
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
      className="py-2"
    >
      {products.map(p => (
        <SwiperSlide key={p.id}>
          <ProductCard product={p} artistName={artistNameOf(p.artistId)} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
