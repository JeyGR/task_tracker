import React, { useState, useEffect } from "react";
import "./Pendingtasks.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Pendingtasks = () => {
  const [ress, setress] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/asignedtasks/${id}`
        );
        setress(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);
  const handleback = () => {
    navigate(`/studenthomepage/${id}`);
  };
  const handlemarkascompleted = (name, category, priority) => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/finishtask`,
          { name, category, priority }
        );
        setress(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
    window.location.reload();
  };

  return (
    <div className="topdiv">
      <div className="nav-bar">
        <button className="backbtn" onClick={handleback}>
          Back
        </button>
        <h2 className="pendingtxt">Your Pending Tasks</h2>
        <button className="noveltybtn">Novelty Cooking</button>
      </div>
      <div className="pending">
        <br />
        <div className="table">
          <table>
            <tr>
              <th>Task</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Update Staus</th>
            </tr>
            {Array.isArray(ress) &&
              ress.map((d, index) => {
                const dd = d.deadline.split("T")[0];
                return (
                  <tr>
                    <td>{d.name}</td>
                    <td>{d.category}</td>
                    <td>{d.priority}</td>
                    <td>{dd}</td>
                    <td>
                      <button
                        onClick={() => {
                          handlemarkascompleted(d.name, d.category, d.priority);
                        }}
                      >
                        Mark as Completed
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pendingtasks;
