import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import { useAuth } from "../context/auth.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!login(email, password)) {
      setError("Invalid email or password");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login_window">
      <div className="login_form">
        <h2>Sign in your account</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <div>
            <Link to="/register">Don't have account yet?</Link>
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
