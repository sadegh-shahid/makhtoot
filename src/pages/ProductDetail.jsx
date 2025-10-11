// src/pages/ProductDetail.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { products, artists } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  const artist = artists.find((a) => a.id === product?.artistId);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!product) return <p className="p-6">محصول یافت نشد</p>;

  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 overflow-hidden">
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Thumbs]}
          className="mySwiper2 rounded-xl"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`${product.name} ${index + 1}`} className="w-full object-cover rounded-xl" />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper mt-2"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`${product.name} ${index + 1}`} className="w-full rounded-md cursor-pointer" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="md:flex-1">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        {artist && (
          <div className="mb-2">
            هنرمند: <Link to={`/artist/${artist.id}`} className="text-[var(--brand)] hover:underline">{artist.name}</Link>
          </div>
        )}
        <p className="text-gray-700 mb-6">{product.desc}</p>
        <div className="flex gap-3">
          <button className="btn-primary">افزودن به سبد خرید</button>
        </div>
      </div>
    </main>
  );
}
