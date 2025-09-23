// src/pages/Auction.jsx
import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import { auctions } from "../data/products";

const AuctionCard = ({ auction }) => {
  const [bids, setBids] = useState([]);
  const [highestBid, setHighestBid] = useState(auction.startPrice);

  useEffect(() => {
    const savedBids = JSON.parse(localStorage.getItem(`bids_${auction.id}`) || "[]");
    setBids(savedBids);
    if (savedBids.length > 0) {
      const maxBid = Math.max(...savedBids.map((b) => b.amount));
      setHighestBid(maxBid);
    }
  }, [auction.id]);

  const handlePlaceBid = () => {
    const bidAmount = prompt(`بالاترین پیشنهاد ${highestBid}$ است. پیشنهاد خود را وارد کنید:`);
    if (bidAmount && !isNaN(bidAmount) && parseInt(bidAmount) > highestBid) {
      const newBid = {
        amount: parseInt(bidAmount),
        date: new Date().toISOString(),
      };
      const updatedBids = [...bids, newBid];
      setBids(updatedBids);
      localStorage.setItem(`bids_${auction.id}`, JSON.stringify(updatedBids));
      setHighestBid(newBid.amount);
      alert("پیشنهاد شما با موفقیت ثبت شد.");
    } else {
      alert("مبلغ پیشنهادی باید عددی و بیشتر از بالاترین پیشنهاد باشد.");
    }
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500 font-bold">مزایده به پایان رسید</span>;
    } else {
      return (
        <div className="text-center font-mono">
          <span>{days}d </span>
          <span>{hours}h </span>
          <span>{minutes}m </span>
          <span>{seconds}s</span>
        </div>
      );
    }
  };

  return (
    <article className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <img src={auction.image} alt={auction.name} className="w-full h-56 object-cover" loading="lazy" />
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold">{auction.name}</h3>
        <p className="text-sm text-gray-600">{auction.desc}</p>
        <div className="my-2">
          <p>بالاترین پیشنهاد: <span className="font-bold">{highestBid}$</span></p>
        </div>
        <div className="my-2">
          <Countdown date={auction.endDate} renderer={renderer} />
        </div>
        <button
          onClick={handlePlaceBid}
          className="mt-auto w-full px-3 py-2 bg-[var(--brand)] text-white rounded disabled:bg-gray-400"
          disabled={new Date() > auction.endDate}
        >
          شرکت در مزایده
        </button>
      </div>
    </article>
  );
};

export default function Auction() {
  return (
    <main className="pt-16 p-4 max-w-6xl mx-auto">
      <title>مزایده‌ها - گالری هنری پارسیان</title>
      <meta name="description" content="در مزایده‌های آثار هنری ما شرکت کنید و بهترین قیمت را پیشنهاد دهید." />
      <h1 className="text-2xl font-bold mb-6">مزایده‌ها</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auctions.map((a) => (
          <AuctionCard key={a.id} auction={a} />
        ))}
      </div>
    </main>
  );
}
