import React, { useState } from "react";
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
  const [trades, setTrades] = useState([
    {
      id: 1,
      sender: "User1",
      offer: "Rare Card",
      request: "Gold Coin",
      status: "pending",
    },
    {
      id: 2,
      sender: "User2",
      offer: "Silver Sword",
      request: "Magic Gem",
      status: "pending",
    },
    {
      id: 3,
      sender: "User3",
      offer: "Bronze Shield",
      request: "Healing Potion",
      status: "pending",
    },
    {
      id: 4,
      sender: "User5",
      offer: "Bronze Sword",
      request: "Attack Potion",
      status: "pending",
    },
    {
      id: 5,
      sender: "User6",
      offer: "Bronze Armor",
      request: "Magic Potion",
      status: "pending",
    },
    {
      id: 6,
      sender: "User4",
      offer: "Bronze Pickaxe",
      request: "Agility Potion",
      status: "pending",
    },
  ]);

  const handleAccept = (tradeId) => {
    setTrades(
      trades.map((trade) =>
        trade.id === tradeId ? { ...trade, status: "accepted" } : trade
      )
    );
  };

  const handleDeny = (tradeId) => {
    setTrades(
      trades.map((trade) =>
        trade.id === tradeId ? { ...trade, status: "denied" } : trade
      )
    );
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
