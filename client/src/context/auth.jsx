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

  const register = (username, email, password) => {
    // Mock registration logic (placeholder)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    setUsername(username);
    navigate("/");
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
