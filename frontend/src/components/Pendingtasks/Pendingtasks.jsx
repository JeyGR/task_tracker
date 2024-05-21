import React, { useState, useEffect } from "react";
import "./Pendingtasks.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Pendingtasks = () => {
  const [tasks, setTasks] = useState([]);
  const [workLinks, setWorkLinks] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/asignedtasks/${id}`
        );
        setTasks(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate(`/studenthomepage/${id}`);
  };

  const handleWorkLinkChange = (taskId, value) => {
    setWorkLinks((prevLinks) => ({
      ...prevLinks,
      [taskId]: value,
    }));
  };

  const handleSubmitWorkLink = async (taskId) => {
    try {
      const workLink = workLinks[taskId] || "";
      await axios.post(`http://localhost:3000/api/v1/tasks/${taskId}/submit`, {
        workLink,
      });
      alert("Work link submitted successfully");
      setWorkLinks((prevLinks) => ({
        ...prevLinks,
        [taskId]: "",
      }));
      window.location.reload();
    } catch (err) {
      console.log("Error submitting work link:", err);
    }
  };

  return (
    <div className="topdiv">
      <div className="nav-bar">
        <button className="backbtn" onClick={handleBack}>
          Back
        </button>
        <h2 className="pendingtxt">Your Pending Tickets</h2>
        <button className="noveltybtn">Novelty Cooking</button>
      </div>
      <div className="pending">
        <br />
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Work Link</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tasks) &&
                tasks.map((task) => {
                  const deadlineDate = task.deadline.split("T")[0];
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.category}</td>
                      <td>{task.priority}</td>
                      <td>{deadlineDate}</td>
                      <td>
                        <input
                          type="text"
                          value={workLinks[task.id] || ""}
                          onChange={(e) =>
                            handleWorkLinkChange(task.id, e.target.value)
                          }
                          placeholder="Enter work link"
                        />
                      </td>
                      <td>
                        <button onClick={() => handleSubmitWorkLink(task.id)}>
                          Submit Work Link
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pendingtasks;
