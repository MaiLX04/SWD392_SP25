import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added for error feedback
  const navigate = useNavigate(); // For redirecting after login

  // Mock test users
  const testUsers = [
    { email: "huy@example.com", password: "pass123" },
    { email: "liem@example.com", password: "passs456" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    // Check if the entered credentials match any test user
    const user = testUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      console.log("Login successful:", { email });
      localStorage.setItem("isLoggedIn", "true");
      // Store a mock username based on the email (or fetch from backend later)
      const mockUsername = email.split("@")[0]; // e.g., "test1" from "test1@example.com"
      localStorage.setItem("username", mockUsername);
      navigate("/");
    } else {
      setError("Invalid email or password");
      console.log("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h2>Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <Link to="/register">Don't have account yet?</Link>
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
