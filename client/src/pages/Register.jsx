import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Register.css";
import { useAuth } from "../context/auth.jsx";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    try {
      // Call the register function from auth context
      const success = await register(username, email, password);
      if (success) {
        navigate("/"); // Redirect to home page on success
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="register_window">
      <div className="register_form">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="username"
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Link to="/login">Already have an account?</Link>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
