import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { products, auctions, artists, categories } from "../data/products";
import { useCart } from "../context/CartContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
    const { id } = useParams();
    const { addToCart, toggleFavorite, isFavorite } = useCart();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const allItems = [...products, ...auctions];
    const product = allItems.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div className="p-6 text-center">محصول یافت نشد.</div>;
    }

    const artist = artists.find((a) => a.id === product.artistId);
    const category = categories.find((c) => c.id === product.category);
    const relatedProducts = products.filter(
        (p) => p.category === product.category && p.id !== product.id
    );

    const isAuction = "startPrice" in product;

    return (
        <div className="container mx-auto px-4 py-10">
            <title>{product.name} - گالری هنری پارسیان</title>
            <meta name="description" content={product.desc} />
            <div className="grid md:grid-cols-2 gap-8">
                <div className="overflow-hidden">
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[Navigation, Thumbs]}
                        className="mySwiper2"
                    >
                        <SwiperSlide>
                            <img src={product.image} alt={product.name} className="w-full rounded-xl shadow" loading="lazy" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={product.image} alt={product.name} className="w-full rounded-xl shadow" loading="lazy" />
                        </SwiperSlide>
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src={product.image} alt={product.name} className="w-full rounded-xl shadow" loading="lazy" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={product.image} alt={product.name} className="w-full rounded-xl shadow" loading="lazy" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">{product.desc}</p>
                    {category && <p className="text-gray-700">دسته‌بندی: {category.title}</p>}
                    {artist && <p className="text-gray-700">هنرمند: {artist.name}</p>}

                    {isAuction ? (
                        <div>
                            <p className="text-xl font-semibold text-blue-600">شروع قیمت از: {product.startPrice}$</p>
                            <button className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-4">
                                شرکت در مزایده
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-xl font-semibold text-green-600">
                                {product.price} $
                            </p>
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-green-600 text-white rounded-lg px-4 py-2 mt-4"
                            >
                                افزودن به سبد خرید
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => toggleFavorite(product)}
                        className={`mt-4 p-2 rounded-lg border ${isFavorite(product.id) ? "bg-red-100" : ""}`}
                    >
                        {isFavorite(product.id) ? "❤️ حذف از علاقه‌مندی‌ها" : "🤍 افزودن به علاقه‌مندی‌ها"}
                    </button>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-4">محصولات مرتبط</h2>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={1.2}
                        breakpoints={{ 768: { slidesPerView: 4 } }}
                        dir="rtl"
                    >
                        {relatedProducts.map((p) => (
                            <SwiperSlide key={p.id}>
                                <ProductCard product={p} artistName={artists.find(a => a.id === p.artistId)?.name} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
}
