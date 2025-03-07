import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import "../assets/css/Navbar.css";
import { useAuth } from "../context/auth.jsx";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { RegisterButton } from "./RegisterButton";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { isLoggedIn, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowLogoutPopup(false);
  };

  return (
    <nav>
      <Link to="/" className="title">
        Website
      </Link>

      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessory"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Accessory
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tradelist"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Trade List
          </NavLink>
        </li>

        {isLoggedIn ? (
          <li className="user">
            <span className="account">
              <FaUser /> @{username}
            </span>
            <LogoutButton onClick={() => setShowLogoutPopup(true)} />
          </li>
        ) : (
          <>
            <li>
              <LoginButton />
            </li>
            <li>
              <RegisterButton />
            </li>
          </>
        )}
      </ul>

      {showLogoutPopup && (
        <div className="logout_popup">
          <div className="logout_window">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="popup_button">
              <button onClick={handleLogout}>Yes, Log out</button>
              <button onClick={() => setShowLogoutPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
