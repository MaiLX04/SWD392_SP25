import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const mockAccessories = [
  {
    id: "1",
    name: "POP MART Mini Display Container (Yellow)",
    sku: "PM-YELLOW-001",
    brand: "POP MART",
    price: 390000,
    status: "Còn hàng",
    image: "https://example.com/popmart-container-yellow.jpg",
    thumbnails: [
      "https://example.com/popmart-container-thumbnail1.jpg",
      "https://example.com/popmart-container-thumbnail2.jpg",
      "https://example.com/popmart-container-thumbnail3.jpg",
    ],
  },
];

const AccessoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook điều hướng
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = mockAccessories.find((item) => item.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <p>Không tìm thấy sản phẩm!</p>
      </Container>
    );
  }

  // Xử lý điều hướng khi nhấn nút MUA NGAY
  const handleBuyNow = () => {
    navigate(`/checkout`); // Điều hướng đến trang thanh toán
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={5}>
          <img src={product.image} alt={product.name} className="img-fluid" />
        </Col>
        <Col md={7}>
          <h2>{product.name}</h2>
          <h4 className="text-danger">{product.price.toLocaleString()}đ</h4>
          <Form className="d-flex align-items-center">
            <strong className="me-3">Số lượng:</strong>
            <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
            <Form.Control type="text" value={quantity} readOnly className="text-center mx-2" style={{ width: "50px" }} />
            <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</Button>
          </Form>

          {/* Nút MUA NGAY điều hướng đến trang thanh toán */}
          <Button className="mt-3 w-100 bg-black text-white" onClick={handleBuyNow}>
            MUA NGAY VỚI GIÁ {product.price.toLocaleString()}đ
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessoryDetail;
