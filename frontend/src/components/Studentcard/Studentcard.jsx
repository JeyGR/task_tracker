import React from "react";
import "./Studentcard.css";
import { useNavigate } from "react-router-dom";

const Studentcard = ({ data }) => {
  const navigate = useNavigate();
  const movetoaddtask = (id) => {
    navigate(`/addtask/${id}`);
  };
  return (
    <div className="card">
      <div className="stylediv">
        <h2>Name : {data.username}</h2>
        <h2>DEPT : {data.dept}</h2>
        <h2>ID : {data.id}</h2>
      </div>
      <div className="style2">
        <button
          onClick={() => {
            movetoaddtask(data.id);
          }}
        >
          Add Ticket
        </button>
      </div>
    </div>
  );
};

export default Studentcard;
