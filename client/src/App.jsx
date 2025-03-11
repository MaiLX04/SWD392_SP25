import { Route, Routes, useLocation } from "react-router-dom";
import "./assets/css/App.css"; // Fixed import path
import { Navbar } from "./components/Navbar";
import About from "./pages/About";
import { Accessory } from "./pages/Accessory";
import AccessoryManagement from "./pages/accessory_management";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import Tradelist from "./pages/Tradelist";
import UserManagement from "./pages/user_management";

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
        <Route path="/product/:id" element={<ProductPage />} />{" "}
        <Route path="/user_management" element={<UserManagement />} />
        <Route path="/accessory_management" element={<AccessoryManagement />} />
      </Routes>
    </div>
  );
}

export default App;
