import React, { useState } from "react";
import "./Adminlogin.css";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log("Attempting to login with:", username, password);
    if (username === "admin" && password === "admin@123") {
      navigate("/adminhomepage");
    } else {
      alert("You are not an admin");
    }
  };

  const handleStudentLogin = () => {
    console.log("Student login clicked");
    navigate("/studentlogin");
  };

  return (
    <div className="container">
      <button className="student-login-button" onClick={handleStudentLogin}>
        Member Login
      </button>
      <div className="form">
        <h2>Lead Login</h2>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Adminlogin;
