import React from 'react';
import { useForm } from 'react-hook-form';

export default function BiddingInterface({ auction, onBid }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  // Use the nullish coalescing operator to handle cases where current_bid might be null
  const minBid = (auction.current_bid ?? auction.start_price) + auction.min_increment;

  const onSubmit = (data) => {
    onBid(data.amount);
  };

  const quickBid = (amount) => {
    setValue('amount', amount, { shouldValidate: true });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold text-lg">Place Your Bid</h3>
      <div>
        <label className="block text-sm mb-1" htmlFor="bidAmount">Your Bid Amount ($)</label>
        <input
          id="bidAmount"
          type="number"
          step={auction.min_increment}
          {...register('amount', {
            required: 'Bid amount is required',
            min: {
              value: minBid,
              message: `Bid must be at least $${minBid}`
            }
          })}
          className="w-full border p-2 rounded"
          placeholder={`Min bid: $${minBid}`}
        />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => quickBid(minBid)} className="flex-1 p-2 border rounded text-sm">${minBid}</button>
        <button type="button" onClick={() => quickBid(minBid + auction.min_increment)} className="flex-1 p-2 border rounded text-sm">${minBid + auction.min_increment}</button>
        <button type="button" onClick={() => quickBid(minBid + 2 * auction.min_increment)} className="flex-1 p-2 border rounded text-sm">${minBid + 2 * auction.min_increment}</button>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Place Bid
      </button>
      <p className="text-xs text-center text-gray-500">
        By bidding, you agree to the terms of service.
      </p>
    </form>
  );
}