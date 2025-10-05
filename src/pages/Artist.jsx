import { useParams } from "react-router-dom";
import { artists, products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Artist() {
  const { id } = useParams();
  const artist = artists.find(a => a.id === id);
  const items = products.filter(p => p.artistId === id);

  if (!artist) return <main className="p-6">هنرمند یافت نشد</main>;

  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">آثار {artist.name}</h1>
      <p className="text-sm text-gray-600 mb-4">{artist.bio}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p.id} product={p} artistName={artist.name} />)}
      </div>
    </main>
  );
}
