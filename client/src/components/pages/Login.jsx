import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { mockUsers } from "./mockData.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      console.log("Login successful:", { email });
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user.username);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login_window">
      <div className="login_form">
        <h2>Sign in your account</h2>
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
