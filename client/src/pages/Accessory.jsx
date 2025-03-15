import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

const Accessory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    axios
      .get("https://67cff34d823da0212a83ef35.mockapi.io/Accessory")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Lỗi khi tải dữ liệu!");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-3 border-end">
          <h5>Danh Mục</h5>
          <ul className="list-unstyled">
            <li>HOME</li>
            <li>About</li>
            <li>Community</li>
            <li>Accessories</li>
            <li>Trade Lists</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-3">
          <div className="d-flex justify-content-between">
            <h5>Accessories</h5>
          </div>

          {loading && <p>Đang tải dữ liệu...</p>}
          {error && <p className="text-danger">{error}</p>}

          <div className="row mt-3">
            {!loading &&
              !error &&
              products.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div
                     className="card"
                      onClick={() => navigate(`/accessory/${product.id}`)} // Chỉnh "accessory" thành "product" nếu đúng với dữ liệu API
                      style={{ cursor: "pointer" }} // Hiển thị con trỏ chuột
                  >
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body text-center">
                      <p className="mb-0">{product.name}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessory;
