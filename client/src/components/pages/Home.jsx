import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BabyThree from "../../assets/BabyThree.jpg";
import Haveaseat from "../../assets/Haveaseat.jpg";
import ExcitingMacaron from "../../assets/ExcitingMacaron.jpg";
import Cocacola from "../../assets/Cocacola.jpg";
import "./Home.css";

const Home = () => {
  const products = [
    {
      id: 1,
      category: "BLINDBOX",
      name: "Labubu V2 Have A Seat",
      price: "360.000₫",
      image: Haveaseat,
    },
    {
      id: 2,
      category: "BLINDBOX",
      name: "Labubu Exciting Macaron ",
      price: "500.000₫",
      image: ExcitingMacaron,
    },
    {
      id: 3,
      category: "BLINDBOX",
      name: "Labubu Coca Cola",
      price: "780.000₫",
      image: Cocacola,
    },
    {
      id: 4,
      category: "FIGURE",
      name: "MR BONE DOUBLE EDGED S...",
      price: "8.390.000₫",
      image: Cocacola,
    },
 
  ];



  return (
    <div className="home">
      {/* Ảnh quảng cáo */}
      <img
        src={BabyThree}
        alt="Baby Three Advertisement"
        className="advert_image"
      />

      {/* Section New Arrival */}
      <Container className="text-center my-5">
        <h2 className="fw-bold">NEW ARRIVAL</h2>
        <Row className="mt-4">
          {products.map((product) => (
            <Col key={product.id} md={3} sm={6} xs={12} className="mb-4">
              <Card className="border-0">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <p className="text-muted text-uppercase">{product.category}</p>
                  <h6 className="fw-bold">{product.name}</h6>
                  <p className="fw-bold">{product.price}</p>
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
