import React, { useState } from "react";
import "./Studentlogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Studentlogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    const name = username;
    const pass = password;
    console.log({ username, password });
    try {
      const data = await axios.post(
        "https://task-tracker-ozsp.onrender.com/api/v1/studentlogin",
        {
          name,
          pass,
        }
      );
      console.log(data.data.msg);
      if (data.data.msg == "Success") {
        console.log(data.data.id);
        const id = data.data.id;
        navigate(`/studenthomepage/${id}`);
      } else {
        alert(data.data.msg);
      }
    } catch (err) {
      console.log("Login err:", err);
    }
  };

  const handleAdminLogin = () => {
    console.log("Admin login clicked");
    navigate("/adminlogin");
  };

  const handleRedirectToStudentSignIn = () => {
    console.log("Redirecting to student sign-in page");
    navigate("/studentsignin");
  };

  return (
    <div className="container">
      <button className="admin-login-button" onClick={handleAdminLogin}>
        Lead Login
      </button>
      <div className="form">
        <h2>Member Login</h2>
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
        <button className="signin-button" onClick={handleSignIn}>
          Login In
        </button>
      </div>
      <div className="login-section">
        <p>Don't have an account?</p>
        <button
          className="login-button"
          onClick={handleRedirectToStudentSignIn}
        >
          Try Sign In
        </button>
      </div>
    </div>
  );
};

export default Studentlogin;
