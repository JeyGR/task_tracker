import React, { useState, useEffect } from "react";
import "./Studenthomepage.css";
import axios from "axios";
import { useParams, useNavigate, Navigate } from "react-router-dom";

const Studenthomepage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handlepending = () => {
    navigate(`/pendingtasks/${id}`);
  };

  const [ress, setRess] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/unasignedtasks/`
        );
        setRess(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [taskss, setTaskss] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datass = await axios.get(
          `http://localhost:3000/api/v1/completedtasks/${id}`
        );
        setTaskss(datass.data);
        console.log("Fetching");
      } catch (err) {
        console.log("Error in fetching Completed task:", err);
      }
    };
    fetchData();
  }, []);

  const handleadd = (name, category, deadline, priority) => {
    console.log("Handling");
    console.log(deadline);
    try {
      const update = async () => {
        const response = await axios.post(
          `http://localhost:3000/api/v1/asigntask/`,
          { id, name, category, deadline, priority }
        );
        console.log(response.data);
      };
      update();
    } catch (err) {
      console.log("handle add", err);
    }
    window.location.reload();
  };
  const handlelogout = () => {
    navigate("/studentlogin");
  };
  return (
    <div className="topdiv">
      <div className="navbar">
        <button className="menubtn" onClick={handlepending}>
          Pending
        </button>
        <h3>Student HomePage</h3>
        <div className="btngrp">
          <button className="profilebtn">Profile</button>
          <button onClick={handlelogout}>Logout</button>
        </div>
      </div>
      <h2 className="taskstxt">Tickets:</h2>
      <div className="tabel">
        <table>
          <tr>
            <th>Ticket</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Deadline</th>
            <th>Add Ticket</th>
          </tr>
          {Array.isArray(ress) &&
            ress.map((d, index) => {
              const dd = d.deadline.split("T")[0];
              return (
                <tr key={index}>
                  <td>{d.name}</td>
                  <td>{d.category}</td>
                  <td>{d.priority}</td>
                  <td>{dd}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleadd(d.name, d.category, d.deadline, d.priority);
                      }}
                    >
                      Add Ticket
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      <h2 className="completedtaskstxt">Completed Tickets:</h2>
      <div className="tabel2">
        <table>
          <tr>
            <th>Ticket</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Deadline</th>
          </tr>
          {Array.isArray(taskss) &&
            taskss.map((d, index) => {
              const dd = d.deadline.split("T")[0];
              return (
                <tr key={index}>
                  <td>{d.name}</td>
                  <td>{d.category}</td>
                  <td>{d.priority}</td>
                  <td>{dd}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default Studenthomepage;
