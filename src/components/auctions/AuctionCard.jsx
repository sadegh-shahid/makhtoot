import React from 'react';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span className="text-red-500 font-bold">Auction Ended</span>;
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

export default function AuctionCard({ auction }) {
  const isScheduled = new Date(auction.startTime) > new Date();

  return (
    <article className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <Link to={`/product/${auction.id}`}>
        <img src={auction.image} alt={auction.name} className="w-full h-56 object-cover" loading="lazy" />
      </Link>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold">{auction.name}</h3>
        <p className="text-sm text-gray-600 truncate">{auction.desc}</p>

        <div className="my-2">
          {isScheduled ? (
            <p>Starts in: <Countdown date={auction.startTime} renderer={renderer} /></p>
          ) : (
            <>
              <p>Current Bid: <span className="font-bold">{auction.currentBid || auction.startPrice}$</span></p>
              <p>Ends in: <Countdown date={auction.endTime} renderer={renderer} /></p>
            </>
          )}
        </div>

        <Link
          to={`/product/${auction.id}`}
          className="mt-auto w-full text-center px-3 py-2 bg-[var(--brand)] text-white rounded disabled:bg-gray-400"
        >
          {isScheduled ? 'View Details' : 'Place Bid'}
        </Link>
      </div>
    </article>
  );
}
