import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SubmittedWork.css";

const SubmittedWork = () => {
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmittedTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/submittedtasks"
        );
        setSubmittedTasks(response.data.data);
        console.log("Submitted data ", response.data.data);
        submittedTasks.map((task) => {
          console.log("status", task.status);
        });
      } catch (err) {
        console.log("Error fetching submitted tasks:", err);
      }
    };
    fetchSubmittedTasks();
  }, []);
  const handlebackbtn = () => {
    navigate("/adminhomepage");
  };

  const handleStatusChange = async (name, category, priority, status) => {
    try {
      await axios.post("http://localhost:3000/api/v1/updatetaskstatus", {
        name,
        category,
        priority,
        status,
      });
      setSubmittedTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.name === name &&
          task.category === category &&
          task.priority === priority
            ? { ...task, status }
            : task
        )
      );
    } catch (err) {
      console.log("Error updating task status:", err);
    }
  };

  return (
    <div className="topdiv">
      <div className="navit">
        <button className="backbtn" onClick={handlebackbtn}>
          Back
        </button>
        <h3 className="admintxt">Submitted Work</h3>
      </div>
      <br />
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Work Link</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedTasks.map((task) => (
              <tr key={`${task.name}-${task.category}-${task.priority}`}>
                <td>{task.name}</td>
                <td>{task.category}</td>
                <td>{task.priority}</td>
                <td>{task.deadline.split("T")[0]}</td>
                <td>
                  <p>{task.worklink}</p>
                </td>
                <td>{task.status}</td>
                <td>
                  <button
                    onClick={() =>
                      handleStatusChange(
                        task.name,
                        task.category,
                        task.priority,
                        "Completed"
                      )
                    }
                  >
                    Mark as Done
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(
                        task.name,
                        task.category,
                        task.priority,
                        "assigned"
                      )
                    }
                  >
                    Need Changes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedWork;
