import React, { useState } from "react";
import "./Addtask.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const Addtask = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const { id } = useParams();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handlebackbtn = () => {
    navigate("/adminhomepage");
  };
  const addnewtasktouser = (e) => {
    e.preventDefault();
    const dat = new Date();
    const year = dat.getFullYear();
    const month = dat.getMonth() + 1;
    const day = dat.getDate();
    const deadlinedate = deadline.split("-")[2];
    const deadlinemonth = deadline.split("-")[1];
    const deadlineyear = deadline.split("-")[0];
    const yeardiff = deadlineyear - year;
    const monthdiff = deadlinemonth - month;
    const datediff = deadlinedate - day;
    try {
      if (
        yeardiff > 0 ||
        (yeardiff === 0 && monthdiff > 0) ||
        (yeardiff === 0 && monthdiff === 0 && datediff >= 0)
      ) {
        const fetchData = async () => {
          await axios.post(
            "https://task-tracker-ozsp.onrender.com/api/v1/asignnewtask",
            {
              name,
              category,
              priority,
              deadline,
              id,
            }
          );
          console.log("Data sent to backend");
          alert("Task is assigned");
        };
        fetchData();
      } else {
        console.log(deadlinedate - day);
        alert("Deadline can't be in the past");
      }
    } catch (err) {
      console.log("addnewtasktouser err: ", err);
    }
  };

  return (
    <div className="highdiv">
      <button className="backbtn1" onClick={handlebackbtn}>
        Back
      </button>
      <div className="addcard">
        <form action="">
          <label htmlFor="name">Ticket Name</label>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Taskname"
            value={name}
            onChange={handleNameChange}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Category"
          />
          <br />
          <label htmlFor="priority">Priority</label>
          <br />
          <select
            name="priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Immediate">Immediate</option>
          </select>
          <br />
          <label htmlFor="deadline">Deadline</label>
          <br />
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={handleDeadlineChange}
            placeholder="Deadline"
          />
          <br />
          <br />
          <button
            onClick={(e) => {
              addnewtasktouser(e);
            }}
          >
            Add Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addtask;
