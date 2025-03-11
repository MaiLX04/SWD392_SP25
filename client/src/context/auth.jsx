import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setUsername(localStorage.getItem("username") || "User");
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Your MockAPI endpoint
      const apiUrl =
        "https://67c7faf7c19eb8753e7bae06.mockapi.io/api/huy/users";

      // Fetch all users with GET request
      const response = await fetch(apiUrl, {
        method: "GET", // Use GET to retrieve users, not create them
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      // Parse the response (array of users)
      const users = await response.json();

      // Find a user with matching email and password
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Successful login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", user.username); // Assuming your API returns a username
        setIsLoggedIn(true);
        setUsername(user.username);
        navigate("/");
        return true;
      } else {
        console.log("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  const register = async (username, email, password) => {
    try {
      const apiUrl =
        "https://67c7faf7c19eb8753e7bae06.mockapi.io/api/huy/users";

      // Check if email already exists
      const checkResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!checkResponse.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await checkResponse.json();
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        throw new Error("Email already registered");
      }

      // Create new user with POST request
      const newUser = { username, email, password };
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const createdUser = await response.json();

      // Log the user in after successful registration
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", createdUser.username);
      setIsLoggedIn(true);
      setUsername(createdUser.username);
      return true; // Success
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Throw error to be caught in Register.jsx
    }
  };

  const updateTrades = (currentUser) => {
    const allTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    return allTrades.filter((trade) => trade.owner === currentUser);
  };

  const createTrade = (sender, offer, request, owner) => {
    const tradeRequest = {
      id: Date.now(),
      sender,
      offer,
      request,
      owner,
      status: "pending",
    };
    const existingTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    const updatedTrades = [...existingTrades, tradeRequest];
    localStorage.setItem("trades", JSON.stringify(updatedTrades));
    return tradeRequest;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        login,
        logout,
        register,
        updateTrades,
        createTrade,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
