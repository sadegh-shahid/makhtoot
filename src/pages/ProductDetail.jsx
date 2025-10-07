// src/pages/ProductDetail.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products, artists } from "../data/products";
import ImageLightbox from "../components/ImageLightbox"; // if you have it; otherwise clicking opens same image larger in new tab

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  const artist = artists.find((a) => a.id === product?.artistId);
  const [lightSrc, setLightSrc] = useState(null);

  if (!product) return <p className="p-6">محصول یافت نشد</p>;

  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <div className="w-full aspect-square bg-white border rounded-2xl p-3 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain cursor-pointer"
            onClick={() => setLightSrc(product.image)}
          />
        </div>
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
          <button onClick={() => setLightSrc(product.image)} className="px-4 py-2 border rounded">مشاهده بزرگ</button>
        </div>
      </div>

      {/* Lightbox (if you included ImageLightbox earlier) */}
      <ImageLightbox src={lightSrc} open={!!lightSrc} onClose={() => setLightSrc(null)} />
    </main>
  );
}
