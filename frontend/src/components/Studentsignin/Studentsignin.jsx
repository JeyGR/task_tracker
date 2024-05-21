import React, { useState } from "react";
import "./Studentsignin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Studentsignin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSignin = async () => {
    console.log(dob);
    const today = new Date();
    const year = today.getFullYear();
    const dobyear = parseInt(dob.split("-")[0]);
    const data = {
      name: username,
      dept: department,
      dob: dob,
      id: id,
      pass: password,
    };
    if (year - dobyear > 10) {
      if (
        username.length === 0 ||
        department.length === 0 ||
        dob.length === 0 ||
        id.length === 0
      ) {
        alert("Must fill all details");
      } else {
        try {
          console.log("Working");
          const ress = await axios.post(
            "https://task-tracker-ozsp.onrender.com/api/v1/studentsignin",
            data
          );
          if (ress.data.msg == "Success") {
            console.log("Signin success");
            navigate("/studentlogin");
          } else {
            console.log(ress.data.msg);
            alert(ress.data.msg);
          }
        } catch (err) {
          console.log("Signin err:", err);
        }
      }
    } else {
      alert("Invalid DOB");
    }
  };

  const handleAdminLogin = () => {
    console.log("Admin login clicked");
    navigate("/adminlogin");
  };
  const redirectLoginPage = () => {
    console.log("Redirecting to login page");
    navigate("/studentlogin");
  };
  return (
    <div className="container">
      <button className="admin-login-button" onClick={handleAdminLogin}>
        Lead Login
      </button>
      <div className="form">
        <h2>Member Signin</h2>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={handleDepartmentChange}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" value={dob} onChange={handleDobChange} />
        </div>
        <div className="form-group">
          <label>ID:</label>
          <input type="text" value={id} onChange={handleIdChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="signin-button" onClick={handleSignin}>
          Sign In
        </button>
      </div>
      <div className="login-section">
        <p>Already have an account?</p>
        <button className="login-button" onClick={redirectLoginPage}>
          Try Login
        </button>
      </div>
    </div>
  );
};

export default Studentsignin;
