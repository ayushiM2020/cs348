// frontend/src/components/LoginForm.js

import React, { useState } from "react";
import axios from "./api";
import "./LoginForm.css"; // Import CSS file for LoginForm styling

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);

      setUser(response.data.user);
    } catch (error) {
      console.error("Error logging in:", error.response.data);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-form-container">
      {/* <h2>Login</h2> */}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input-field"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
