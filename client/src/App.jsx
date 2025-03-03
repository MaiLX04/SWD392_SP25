import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import About from "./components/pages/About";
import { Accessory } from "./components/pages/Accessory";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Tradelist from "./components/pages/Tradelist";
import OfferPage from "./components/pages/OfferPage"; // Thêm OfferPage
import ProductPage from "./components/pages/ProductPage"; // Thêm ProductPage

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tradelist" element={<Tradelist />} />
        <Route path="/accessory" element={<Accessory />} />
        <Route path="/login" element={<Login hideNavBar={true} />} />
        <Route path="/register" element={<Register hideNavBar={true} />} />
        <Route path="/offer/:id" element={<OfferPage />} /> {/* Thêm route OfferPage */}
        <Route path="/product/:id" element={<ProductPage />} /> {/* Thêm route ProductPage */}
      </Routes>
    </div>
  );
}

export default App;
