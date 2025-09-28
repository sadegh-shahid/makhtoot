import { useState, useEffect } from 'react';

// This is a simple mock real-time hook.
// In a real app, you would use WebSockets or a library like SWR/React Query for this.
export function useMockRealTime(initialData, interval = 5000) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const timer = setInterval(() => {
      // In a real app, you would fetch new data from the server here.
      // For this mock, we will just force a re-render to update countdowns
      // and simulate a new bid on a random live auction.

      setData(currentData => {
        const liveAuctions = currentData.filter(
          a => a.isAuction && new Date(a.startTime) <= new Date() && new Date(a.endTime) > new Date()
        );

        if (liveAuctions.length === 0) {
          return currentData;
        }

        // Pick a random live auction to update
        const randomAuctionIndex = Math.floor(Math.random() * liveAuctions.length);
        const auctionToUpdate = liveAuctions[randomAuctionIndex];

        // Create a new bid
        const newBidAmount = auctionToUpdate.currentBid + auctionToUpdate.minIncrement;
        const newBid = {
          amount: newBidAmount,
          bidderId: `user${Math.floor(Math.random() * 10)}`,
          date: new Date(),
        };

        // Update the auction item
        const updatedAuction = {
          ...auctionToUpdate,
          currentBid: newBidAmount,
          bids: [...auctionToUpdate.bids, newBid],
        };

        // Return the new data array
        return currentData.map(item => (item.id === updatedAuction.id ? updatedAuction : item));
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return data;
}
