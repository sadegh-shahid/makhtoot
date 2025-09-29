import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import Countdown from "react-countdown";
import { useCart } from "../context/CartContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import BiddingInterface from "../components/auctions/BiddingInterface";
import { supabase } from "../lib/supabaseClient";

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
    <h3 className="font-bold mb-2">Bid History ({bids?.length || 0})</h3>
    <ul className="space-y-1 text-sm h-24 overflow-y-auto border p-2 rounded">
      {bids?.slice().reverse().map((bid) => (
        <li key={bid.id} className="flex justify-between">
          <span>{bid.bidder_id || 'Anonymous'}</span>
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
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('items')
                    .select(`*, auctions(*, bids(*))`)
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (data.auctions && data.auctions.length > 0) {
                    data.auctions[0].bids.sort((a, b) => b.amount - a.amount);
                }
                setProduct(data);

                if (data.category) {
                    const { data: relatedData } = await supabase
                        .from('items')
                        .select('*, auctions(*)')
                        .eq('category', data.category)
                        .neq('id', id)
                        .limit(5);
                    setRelatedProducts(relatedData || []);
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!product || !product.is_auction || !product.auctions || product.auctions.length === 0) {
            return;
        }

        const auctionId = product.auctions[0].id;
        const channel = supabase.channel(`product-page-${auctionId}`);

        channel
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'bids',
              filter: `auction_id=eq.${auctionId}`,
            },
            (payload) => {
              setProduct((currentProduct) => {
                const newBid = payload.new;

                if (currentProduct.auctions[0].bids.find(b => b.id === newBid.id)) {
                    return currentProduct;
                }

                const newBids = [...currentProduct.auctions[0].bids, newBid];
                newBids.sort((a, b) => b.amount - a.amount);

                const updatedAuction = {
                    ...currentProduct.auctions[0],
                    bids: newBids,
                    current_bid: newBids[0].amount
                };

                return { ...currentProduct, auctions: [updatedAuction] };
              });
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
    }, [product]);

    const handleBid = async (amount) => {
        if (!product || !product.is_auction) return;
        try {
            const user_id = 'user-self-demo'; // Placeholder
            const auctionId = product.auctions[0].id;

            const { error: bidError } = await supabase
                .from('bids')
                .insert([{ auction_id: auctionId, amount: amount, bidder_id: user_id }]);

            if (bidError) throw bidError;

            const { error: auctionError } = await supabase
                .from('auctions')
                .update({ current_bid: amount })
                .eq('id', auctionId);

            if (auctionError) throw auctionError;

            alert(`Your bid of $${amount} has been placed successfully!`);
        } catch (err) {
            alert(`Error placing bid: ${err.message}`);
        }
    };

    const handleBuyNow = () => {
        if (!product || !product.is_auction) return;
        addToCart({ ...product, price: product.auctions[0].buy_now_price });
        alert(`Item ${product.name} has been added to your cart for $${product.auctions[0].buy_now_price}.`);
    };

    if (loading) return <div className="p-6 text-center">Loading product...</div>;
    if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    if (!product) return <div className="p-6 text-center">Product not found.</div>;

    const auction = product.auctions && product.auctions[0];
    const reserveMet = auction && auction.current_bid >= auction.reserve_price;

    return (
        <div className="container mx-auto px-4 py-10">
            <title>{product.name} - Parsian Art Gallery</title>
            <meta name="description" content={product.description} />
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
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-gray-700">Category: {product.category}</p>

                    {product.is_auction && auction ? (
                        <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                            <h2 className="text-xl font-bold text-blue-800 mb-2">Auction Details</h2>
                            {new Date(auction.start_time) > new Date() ? (
                                <div>
                                <p className="text-lg">Auction starts in:</p>
                                <Countdown date={auction.start_time} renderer={countdownRenderer} />
                                </div>
                            ) : (
                                <div>
                                <p className="text-lg">Auction ends in:</p>
                                <Countdown date={auction.end_time} renderer={countdownRenderer} />
                                <div className="my-4">
                                    <p className="text-lg">Current Bid:</p>
                                    <p className="text-3xl font-bold text-blue-700">${auction.current_bid || auction.start_price}</p>
                                    {auction.reserve_price && (
                                    <p className={`text-sm ${reserveMet ? 'text-green-600' : 'text-red-600'}`}>
                                        {reserveMet ? 'Reserve price met' : 'Reserve price not met'}
                                    </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-grow">
                                    <BiddingInterface auction={auction} onBid={handleBid} />
                                    </div>
                                    {auction.buy_now_price && (
                                    <button onClick={handleBuyNow} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                        Buy Now <br/> ${auction.buy_now_price}
                                    </button>
                                    )}
                                </div>
                                <BidHistory bids={auction.bids} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <p className="text-3xl font-bold text-green-700">${product.price}</p>
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