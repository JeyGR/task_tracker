import React, { useState, useEffect } from "react";
import "./Adminhomepage.css";
import Studentcard from "../Studentcard/Studentcard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Adminhomepage = () => {
  const [ress, setress] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://task-tracker-ozsp.onrender.com/api/v1/allstudents"
        );
        setress(response.data);
      } catch (err) {
        console.log("Error in fetching:", err);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();

  const handlebackbtn = () => {
    navigate("/studentlogin");
  };
  const handleaddopentask = () => {
    navigate("/addtask/00");
  };
  const handlesubmittedwork = () => {
    navigate("/submittedwork");
  };

  return (
    <div className="topdiv">
      <div className="navit">
        <button
          className="
        backbtn"
          onClick={handlebackbtn}
        >
          Back
        </button>
        <h3 className="admintxt">Lead Access</h3>
        <button onClick={handleaddopentask} className="addopentaskbtn">
          Add open Ticket
        </button>
        <button onClick={handlesubmittedwork} className="submittedworkbtn">
          View Submitted Work
        </button>
      </div>
      <br />
      <div className="grid">
        {ress.map((d, index) => {
          return <Studentcard data={d} key={index} />;
        })}
      </div>
      <br />
    </div>
  );
};

export default Adminhomepage;
