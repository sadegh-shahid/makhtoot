import React, { useState, useEffect } from "react";
import AuctionCard from "../components/auctions/AuctionCard";
import { supabase } from "../lib/supabaseClient";

export default function Auction() {
  const [activeTab, setActiveTab] = useState("live");
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('auctions')
          .select(`
            *,
            items (
              *
            )
          `);

        if (error) {
          throw error;
        }

        setAuctions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const liveAuctions = auctions.filter(a => new Date(a.start_time) <= new Date() && new Date(a.end_time) > new Date());
  const scheduledAuctions = auctions.filter(a => new Date(a.start_time) > new Date());
  const endedAuctions = auctions.filter(a => new Date(a.end_time) <= new Date());

  const TabButton = ({ tabName, title }) => (
    <button
      className={`px-4 py-2 rounded-t-lg ${activeTab === tabName ? 'bg-white border-b-0 border' : 'bg-gray-100'}`}
      onClick={() => setActiveTab(tabName)}
    >
      {title}
    </button>
  );

  if (loading) {
    return <div className="p-6 text-center">Loading auctions...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

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