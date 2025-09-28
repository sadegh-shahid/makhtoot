import React, { useState } from "react";
import { auctions as initialAuctions } from "../data/products";
import AuctionCard from "../components/auctions/AuctionCard";
import { useMockRealTime } from "../hooks/useMockRealTime";

export default function Auction() {
  const [activeTab, setActiveTab] = useState("live");
  const auctions = useMockRealTime(initialAuctions);

  const liveAuctions = auctions.filter(a => new Date(a.startTime) <= new Date() && new Date(a.endTime) > new Date());
  const scheduledAuctions = auctions.filter(a => new Date(a.startTime) > new Date());
  const endedAuctions = auctions.filter(a => new Date(a.endTime) <= new Date());

  const TabButton = ({ tabName, title }) => (
    <button
      className={`px-4 py-2 rounded-t-lg ${activeTab === tabName ? 'bg-white border-b-0 border' : 'bg-gray-100'}`}
      onClick={() => setActiveTab(tabName)}
    >
      {title}
    </button>
  );

  return (
    <main className="pt-16 p-4 max-w-6xl mx-auto">
      <title>Auctions - Parsian Art Gallery</title>
      <meta name="description" content="Participate in our art auctions and place your bids." />
      <h1 className="text-2xl font-bold mb-6">Auctions</h1>

      <div className="border-b mb-4 flex">
        <TabButton tabName="live" title={`Live Auctions (${liveAuctions.length})`} />
        <TabButton tabName="scheduled" title={`Scheduled Auctions (${scheduledAuctions.length})`} />
        <TabButton tabName="ended" title={`Ended Auctions (${endedAuctions.length})`} />
      </div>

      <div>
        {activeTab === 'live' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveAuctions.map((a) => (
              <AuctionCard key={a.id} auction={a} />
            ))}
          </div>
        )}
        {activeTab === 'scheduled' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledAuctions.map((a) => (
              <AuctionCard key={a.id} auction={a} />
            ))}
          </div>
        )}
        {activeTab === 'ended' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {endedAuctions.map((a) => (
              <AuctionCard key={a.id} auction={a} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
