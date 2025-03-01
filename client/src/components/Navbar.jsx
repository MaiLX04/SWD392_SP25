import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State for popup
  const navigate = useNavigate();

  useEffect(() => {
    const updateLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        setUsername(localStorage.getItem("username") || "User");
      } else {
        setUsername("");
      }
    };

    updateLoginStatus();
    window.addEventListener("storage", updateLoginStatus);
    return () => window.removeEventListener("storage", updateLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    setShowLogoutPopup(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <nav>
      <Link to="/" className="title">
        Website
      </Link>

      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/accessory" activeClassName="active">
            Accessory
          </NavLink>
        </li>
        <li>
          <NavLink to="/tradelist" activeClassName="active">
            Trade List
          </NavLink>
        </li>

        {isLoggedIn ? (
          <li className="user">
            <span className="account">
              <FaUser /> @{username}
            </span>

            <button
              className="logout_button"
              onClick={() => setShowLogoutPopup(true)}
            >
              Log out
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink className="signin" to="/login">
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink className="register" to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Logout Popup */}
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
