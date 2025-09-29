import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // Check if the product is an auction by looking for auction-specific properties
  const isAuction = product.auctions && product.auctions.length > 0;

  return (
    <article className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" loading="lazy" />
      </Link>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600 truncate">{product.description}</p>
        <div className="mt-auto pt-2">
          {isAuction ? (
            <Link
              to={`/product/${product.id}`}
              className="w-full text-center block px-3 py-2 bg-blue-600 text-white rounded"
            >
              View Auction
            </Link>
          ) : (
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">${product.price}</span>
              <button className="px-3 py-2 bg-green-600 text-white rounded">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}