// frontend/src/components/CreateAccountForm.js

import React, { useState } from "react";
import axios from "./api";
import "./CreateAccountForm.css"; // Import CSS file for CreateAccountForm styling

const CreateAccountForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.includes(" ")) {
      setError("Username should not contain spaces");
      return;
    }
    if (password.includes(" ")) {
      setError("Password should not contain spaces");
      return;
    }
    if (name.includes("SELECT") || name.includes("INSERT")) {
      setError("Invalid Name parameter");
      return;
    }

    try {
      const response = await axios.post("/api/users", {
        username,
        password,
        name,
      });
      console.log("Account created successfully:", response.data);

      setUser(response.data.user);
    } catch (error) {
      console.error("Error creating account:", error.response.data);
      setError("Error creating account");
    }
  };

  return (
    <div className="create-account-form-container">
      {/* <h2>Create Account</h2> */}
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
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input-field"
          />
        </div>
        <button type="submit" className="create-account-button">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
