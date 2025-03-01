import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import About from "./components/pages/About";
import { Accessory } from "./components/pages/Accessory";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Tradelist from "./components/pages/Tradelist";

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
      </Routes>
    </div>
  );
}

export default App;
