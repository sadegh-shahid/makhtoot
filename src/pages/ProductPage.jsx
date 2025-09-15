import { useParams } from "react-router-dom";
import { products, artists, categories } from "../data/products";

export default function ProductPage() {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div className="p-6 text-center">محصول یافت نشد.</div>;
    }

    const artist = artists.find((a) => a.id === product.artistId);
    const category = categories.find((c) => c.id === product.category);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 gap-8">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full rounded-xl shadow"
                />
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">{product.desc}</p>
                    <p className="text-gray-700">دسته‌بندی: {category?.title}</p>
                    <p className="text-gray-700">هنرمند: {artist?.name}</p>
                    <p className="text-xl font-semibold text-green-600">
                        {product.price} $
                    </p>
                    <button className="bg-green-600 text-white rounded-lg px-4 py-2">
                        افزودن به سبد خرید
                    </button>
                </div>
            </div>
        </div>
    );
}
