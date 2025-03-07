import { Link } from "react-router-dom";
import "../assets/css/Register.css";

export default function Register() {
  return (
    <div className="register_window">
      <div className="register_form">
        <h2>Create your account</h2>
        <form>
          <div className="input-group">
            <input
              name="username"
              type="text"
              required
              placeholder="Username"
              disabled // Disable input since no backend
            />
          </div>
          <div className="input-group">
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              disabled
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              disabled
            />
          </div>
          <div className="input-group">
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm Password"
              disabled
            />
          </div>
          <Link to="/login">Already have an account?</Link>
          <button type="submit" disabled>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
