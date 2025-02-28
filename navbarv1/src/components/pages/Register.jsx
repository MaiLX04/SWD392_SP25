// src/components/RegisterForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Register:", formData);
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
            />
          </div>
          <div className="input-group">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email address"
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>
          <div className="input-group">
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
            />
          </div>
          <Link to="/login">Already have an account?</Link>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
