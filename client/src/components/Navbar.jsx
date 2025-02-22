import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return <nav>
    <Link to="/" className="title">
    Website
    </Link>
    <ul>
        <li>
            <Link to="/about" activeClassName="active">
            About
            </Link>
        </li>
        <li>
            <Link to="/services" activeClassName="active">
            Services
            </Link>
        </li>
        <li>
            <Link to="/contact" activeClassName="active">
            Contact
            </Link>
        </li>
    </ul>
  </nav>;
};

