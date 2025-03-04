import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BabyThree from "../../assets/BabyThree.jpg";
import Cocacola from "../../assets/Cocacola.jpg";
import ExcitingMacaron from "../../assets/ExcitingMacaron.jpg";
import Haveaseat from "../../assets/Haveaseat.jpg";
import "./Home.css";
import { mockUsers } from "./mockData.js";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("username") || "guest";

  const products = [
    {
      id: 1,
      name: "Labubu V2 Have A Seat",
      owner: mockUsers[0].username,
      image: Haveaseat,
    },
    {
      id: 2,
      name: "Labubu Exciting Macaron",
      owner: mockUsers[1].username,
      image: ExcitingMacaron,
    },
    {
      id: 3,
      name: "Labubu Coca Cola",
      owner: mockUsers[2].username,
      image: Cocacola,
    },
    {
      id: 4,
      name: "MR BONE DOUBLE EDGED",
      owner: mockUsers[0].username,
      image: Cocacola,
    },
  ];

  const handleOffer = (productID) => {
    const product = products.find((p) => p.id === productId);
    const tradeRequest = {
      id: Date.now(),
      sender: currentUser,
      offer: "My Item",
      request: product.name,
      owner: product.owner,
      status: "pending",
    };

    const existingTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    const updatedTrades = [...existingTrades, tradeRequest];
    localStorage.setItem("trades", JSON.stringify(updatedTrades));

    console.log("Sender:", currentUser);
    console.log("Owner:", product.owner);
    console.log("Trade saved:", tradeRequest);
    console.log(
      "All trades in localStorage:",
      JSON.parse(localStorage.getItem("trades"))
    );

    navigate(`/offer/${productId}`);
  };

  return (
    <div className="home">
      <img
        src={BabyThree}
        alt="Baby Three Advertisement"
        className="advert_image"
      />

      <Container className="text-center my-5">
        <h2 className="fw-bold">NEW ARRIVAL</h2>
        <Row className="mt-4">
          {products.map((product) => (
            <Col key={product.id} md={3} sm={6} xs={12} className="mb-4">
              <Card className="border-0">
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="overlay-buttons">
                    <Button
                      variant="primary"
                      className="btn-sm me-2"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      className="btn-sm"
                      onClick={() => handleOffer(product.id)}
                    >
                      Offer
                    </Button>
                  </div>
                </div>

                <Card.Body>
                  <h6 className="fw-bold">{product.name}</h6>
                  <p className="fw-bold">Owner: {product.owner}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Button variant="dark" className="px-4 py-2 mt-3">
          XEM TẤT CẢ · NEW ARRIVAL
        </Button>
      </Container>
    </div>
  );
};

export default Home;
