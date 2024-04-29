// frontend/src/App.js

import React, { useState } from "react";
import "./App.css"; // Import CSS file for styling
import LoginForm from "./components/LoginForm";
import CreateAccountForm from "./components/CreateAccountForm";
import UserInfo from "./components/UserInfo"; // Import UserInfo component

const App = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [user, setUser] = useState(null); // State to store user data

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    setUser(null); // Reset user state to null on logout
  };

  return (
    <div className="app-container">
      <div className="content">
        {user ? ( // Check if user is logged in
          <>
            <UserInfo user={user} />
            <button onClick={handleLogout}>Logout</button>{" "}
            {/* Add logout button */}
          </>
        ) : (
          <>
            <div className="tabs">
              <button
                className={activeTab === "login" ? "active-tab" : ""}
                onClick={() => handleTabChange("login")}
                style={{ fontSize: "18px", fontWeight: "bold" }} // Add inline styles
              >
                Sign In
              </button>
              <button
                className={activeTab === "createAccount" ? "active-tab" : ""}
                onClick={() => handleTabChange("createAccount")}
                style={{ fontSize: "18px", fontWeight: "bold" }} // Add inline styles
              >
                Sign Up
              </button>
            </div>
            {activeTab === "login" && <LoginForm setUser={setUser} />}{" "}
            {/* Pass setUser to LoginForm */}
            {activeTab === "createAccount" && (
              <CreateAccountForm setUser={setUser} />
            )}{" "}
            {/* Pass setUser to CreateAccountForm */}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
