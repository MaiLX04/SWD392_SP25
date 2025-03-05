import React, { useEffect, useState } from "react";
import "./Tradelist.css";

const TradeBlock = ({ trade, onAccept, onDeny }) => {
  return (
    <div className={"trade_request ${trade.status}"}>
      <div>
        <h3>Trade #{trade.id}</h3>
        <p>Sender: {trade.sender}</p>
        <p>Offering: {trade.offer}</p>
        <p>Requesting: {trade.request}</p>
      </div>
      <div className="trade_buttons">
        {trade.status === "pending" ? (
          <>
            <button className="accept" onClick={() => onAccept(trade.id)}>
              Accept
            </button>
            <button className="deny" onClick={() => onDeny(trade.id)}>
              Deny
            </button>
          </>
        ) : (
          <button className={`status ${trade.status}`} disabled>
            {trade.status === "accepted" ? "Accepted" : "Denied"}
          </button>
        )}
      </div>
    </div>
  );
};

const Tradelist = () => {
  const currentUser = localStorage.getItem("username") || "guest";
  const [trades, setTrades] = useState([]);

  // Add a function to fetch and update trades
  const updateTrades = () => {
    const allTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    console.log("All trades from localStorage:", allTrades);
    console.log("Current user (owner):", currentUser);

    const userTrades = allTrades.filter((trade) => trade.owner === currentUser);

    console.log("Filtered trades:", userTrades);
    setTrades(userTrades);
  };

  useEffect(() => {
    updateTrades();
    // Optional: Add an interval to check for new trades periodically
    const interval = setInterval(updateTrades, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleAccept = (tradeId) => {
    const allTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    const updatedTrades = allTrades.map((trade) =>
      trade.id === tradeId ? { ...trade, status: "accepted" } : trade
    );
    localStorage.setItem("trades", JSON.stringify(updatedTrades));
    updateTrades();

    const acceptedTrade = updatedTrades.find((t) => t.id === tradeId);
    alert(`Chat opened between ${acceptedTrade.sender} and ${currentUser}`);
  };

  const handleDeny = (tradeId) => {
    const allTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    const updatedTrades = allTrades.map((trade) =>
      trade.id === tradeId ? { ...trade, status: "denied" } : trade
    );
    localStorage.setItem("trades", JSON.stringify(updatedTrades));
    updateTrades(); // Update the view immediately
  };

  return (
    <div className="tradelist_page">
      <h2>Trade Requests</h2>
      {trades.length === 0 ? (
        <p>No pending trades</p>
      ) : (
        trades.map((trade) => (
          <TradeBlock
            key={trade.id}
            trade={trade}
            onAccept={handleAccept}
            onDeny={handleDeny}
          />
        ))
      )}
    </div>
  );
};

export default Tradelist;
