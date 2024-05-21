import logo from "./logo.svg";
import "./App.css";
import StudentLogin from "./components/Studentlogin/Studentlogin";
import {
  Addtask,
  Adminhomepage,
  Adminlogin,
  PendingTasks,
  Studenthomepage,
  Studentsignin,
  SubmittedWork,
} from "./components";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="studentlogin" element={<StudentLogin />} />
        <Route path="studentsignin" element={<Studentsignin />} />
        <Route path="adminlogin" element={<Adminlogin />} />
        <Route path="studenthomepage/:id" element={<Studenthomepage />} />
        <Route path="pendingtasks/:id" element={<PendingTasks />} />
        <Route path="adminhomepage" element={<Adminhomepage />} />
        <Route path="addtask/:id" element={<Addtask />} />
        <Route path="/submittedwork" element={<SubmittedWork />} />
      </Routes>
    </div>
  );
}

export default App;
