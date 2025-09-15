// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Renders a product card in the exact style used previously.
 * Props:
 *  - product: product object (from data/products.js)
 *  - artistName (optional): string
 *
 * The entire image/title area links to the product detail page: /product/:id
 */
export default function ProductCard({ product, artistName }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow">
      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full aspect-square bg-gray-50 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </Link>

      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-sm">
          <Link to={`/product/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {artistName ? (
          <Link to={`/artist/${product.artistId}`} className="text-xs text-[var(--brand)] hover:underline block">
            {artistName}
          </Link>
        ) : null}

        <p className="text-xs text-gray-600">{product.desc}</p>
      </div>
    </div>
  );
}
