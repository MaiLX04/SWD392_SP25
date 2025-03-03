import React, { useState } from "react";
import { FaUser, FaPlus, FaExchangeAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./OfferPage.css";

export const OfferPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleSelectItem = () => {
    // Giả lập chọn item
    setSelectedItem("Your Item");
  };

  const handleSendTrade = () => {
    alert("Trade sent successfully!");
    navigate("/tradelist");
  };

  return (
    <div className="offer-page">
      <h2 className="title">Trade Offer</h2>
      <div className="trade-container">
        {/* Người gửi */}
        <div className="user-section">
          <FaUser size={50} />
          <p>You</p>
          <div className="item-box" onClick={handleSelectItem}>
            {selectedItem ? <p>{selectedItem}</p> : <FaPlus size={50} />}
          </div>
        </div>

        {/* Icon trao đổi */}
        <div className="trade-icon">
          <FaExchangeAlt size={70} />
        </div>

        {/* Người nhận */}
        <div className="user-section">
          <FaUser size={50} />
          <p>@user1234567</p>
          <div className="item-box">
            <img src="/placeholder.png" alt="User Item" />
          </div>
        </div>
      </div>

      {/* Nút gửi trade & hủy */}
      <div className="button-group">
        <Button variant="dark" onClick={handleSendTrade}>
          Send trade
        </Button>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
