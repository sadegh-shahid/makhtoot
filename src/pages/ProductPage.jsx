import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import Countdown from "react-countdown";
import { items as allItems, artists, categories } from "../data/products";
import { useCart } from "../context/CartContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import BiddingInterface from "../components/auctions/BiddingInterface";
import { useMockRealTime } from "../hooks/useMockRealTime";

const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span className="text-red-500 font-bold">Auction Ended</span>;
  } else {
    return (
      <div className="text-2xl font-mono text-center p-2 border rounded-lg">
        <span>{days}d </span>
        <span>{hours}h </span>
        <span>{minutes}m </span>
        <span>{seconds}s</span>
      </div>
    );
  }
};

const BidHistory = ({ bids }) => (
  <div className="mt-4">
    <h3 className="font-bold mb-2">Bid History ({bids.length})</h3>
    <ul className="space-y-1 text-sm h-24 overflow-y-auto border p-2 rounded">
      {bids.slice().reverse().map((bid, index) => (
        <li key={index} className="flex justify-between">
          <span>{bid.bidderId}</span>
          <span className="font-semibold">${bid.amount}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function ProductPage() {
    const { id } = useParams();
    const { addToCart, toggleWatchlist, isInWatchlist } = useCart();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const initialProduct = allItems.find((p) => p.id === parseInt(id));
    const [product, setProduct] = useState(initialProduct);

    const mockItems = useMockRealTime(allItems);
    useEffect(() => {
        const updatedProduct = mockItems.find((p) => p.id === parseInt(id));
        if (updatedProduct && updatedProduct.currentBid > product.currentBid) {
            setProduct(updatedProduct);
        }
    }, [mockItems, id, product.currentBid]);


    if (!product) {
        return <div className="p-6 text-center">Product not found.</div>;
    }

    const handleBid = (amount) => {
        const newBid = {
            amount: parseInt(amount),
            bidderId: "user-self",
            date: new Date(),
        };
        const updatedProduct = { ...product, currentBid: newBid.amount, bids: [...product.bids, newBid] };
        setProduct(updatedProduct);
        alert(`Your bid of $${amount} has been placed successfully!`);
    };

    const handleBuyNow = () => {
        addToCart({ ...product, price: product.buyNowPrice });
        alert(`Item ${product.name} has been added to your cart for $${product.buyNowPrice}.`);
        // In a real app, you would redirect to checkout here.
    };

    const artist = artists.find((a) => a.id === product.artistId);
    const category = categories.find((c) => c.id === product.category);
    const relatedProducts = allItems.filter(
        (p) => p.category === product.category && p.id !== product.id && !p.isAuction
    );

    const reserveMet = product.currentBid >= product.reservePrice;

    return (
        <div className="container mx-auto px-4 py-10">
            <title>{product.name} - Parsian Art Gallery</title>
            <meta name="description" content={product.desc} />
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[Navigation, Thumbs]}
                        className="mySwiper2 rounded-lg"
                    >
                        <SwiperSlide>
                            <img src={product.image} alt={product.name} className="w-full h-96 object-cover" loading="lazy" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={product.image} alt={product.name} className="w-full h-96 object-cover" loading="lazy" />
                        </SwiperSlide>
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
                        <SwiperSlide>
                            <img src={product.image} alt={product.name} className="w-full h-24 object-cover cursor-pointer" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={product.image} alt={product.name} className="w-full h-24 object-cover cursor-pointer" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">{product.desc}</p>
                    {category && <p className="text-gray-700">Category: {category.title}</p>}
                    {artist && <p className="text-gray-700">Artist: {artist.name}</p>}

                    {product.isAuction ? (
                        <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                            <h2 className="text-xl font-bold text-blue-800 mb-2">Auction Details</h2>
                            {new Date(product.startTime) > new Date() ? (
                              <div>
                                <p className="text-lg">Auction starts in:</p>
                                <Countdown date={product.startTime} renderer={countdownRenderer} />
                              </div>
                            ) : (
                              <div>
                                <p className="text-lg">Auction ends in:</p>
                                <Countdown date={product.endTime} renderer={countdownRenderer} />
                                <div className="my-4">
                                  <p className="text-lg">Current Bid:</p>
                                  <p className="text-3xl font-bold text-blue-700">${product.currentBid || product.startPrice}</p>
                                  {product.reservePrice && (
                                    <p className={`text-sm ${reserveMet ? 'text-green-600' : 'text-red-600'}`}>
                                      {reserveMet ? 'Reserve price met' : 'Reserve price not met'}
                                    </p>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <div className="flex-grow">
                                    <BiddingInterface auction={product} onBid={handleBid} />
                                  </div>
                                  {product.buyNowPrice && (
                                    <button onClick={handleBuyNow} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                      Buy Now <br/> ${product.buyNowPrice}
                                    </button>
                                  )}
                                </div>
                                <BidHistory bids={product.bids} />
                              </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <p className="text-3xl font-bold text-green-700">
                                ${product.price}
                            </p>
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-green-600 text-white rounded-lg px-6 py-3 mt-4 text-lg"
                            >
                                Add to Cart
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => toggleWatchlist(product)}
                        className={`mt-4 p-2 rounded-lg border ${isInWatchlist(product.id) ? "bg-red-100" : ""}`}
                    >
                        {isInWatchlist(product.id) ? "❤️ Remove from Watchlist" : "🤍 Add to Watchlist"}
                    </button>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={1.2}
                        breakpoints={{ 768: { slidesPerView: 4 } }}
                        dir="rtl"
                    >
                        {relatedProducts.map((p) => (
                            <SwiperSlide key={p.id}>
                                <ProductCard product={p} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
}
