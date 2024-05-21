const express = require("express");
const router = express.Router();
const {
  studentlogin,
  studentsignin,
  asignedTasks,
  unAsignedTasks,
  allStudents,
  asignnewTask,
  finishTask,
  asignTask,
  completedTasks,
  submitWorkLink,
  getSubmittedTasks,
  updateTaskStatus,
} = require("./controller");

router.route("/studentlogin").post(studentlogin);
router.route("/studentsignin").post(studentsignin);
router.route("/asignedtasks/:id").get(asignedTasks);
router.route("/unasignedtasks").get(unAsignedTasks);
router.route("/allstudents").get(allStudents);
router.route("/asignnewtask").post(asignnewTask);
router.route("/finishtask").post(finishTask);
router.route("/asigntask").post(asignTask);
router.route("/completedtasks/:id").get(completedTasks);
router.post("/tasks/:id/submit", submitWorkLink);
router.get("/submittedtasks", getSubmittedTasks);
router.get("/submittedtasks", updateTaskStatus);
router.post("/updatetaskstatus", updateTaskStatus);

module.exports = { router };
