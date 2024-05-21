const { client } = require("./dbconnect");

const connectDb = async () => {
  try {
    await client.connect();
    console.log("DB connected");
  } catch (err) {
    console.log("DB connection error:", err);
  }
};

connectDb();

const studentlogin = async (req, res) => {
  const { name, pass } = req.body;
  console.log("username:", name);
  console.log("pass:", pass);
  try {
    await client.query(
      "SELECT * FROM studentsignin WHERE username=$1 AND pass=$2",
      [name, pass],
      (err, ress) => {
        const [username] = ress.rows;
        if (err) {
          console.log("Login error", err);
        } else if (!username) {
          console.log("User not found");
          res.json({ msg: "User not found" });
        } else {
          console.log(ress.rows[0].id);
          res.json({ msg: "Success", id: ress.rows[0].id });
        }
      }
    );
  } catch (error) {
    console.log("Error in student login:", err);
  }
};

const studentsignin = async (req, res) => {
  const { name, dept, dob, id, pass } = req.body;
  if (name === "admin") {
    res.json({ msg: "Username can't be admin" });
    return;
  }
  try {
    const studentexist = await client.query(
      "SELECT * FROM studentsignin WHERE username =$1",
      [name]
    );
    if (studentexist.rowCount !== 0) {
      res.json({ msg: "User Already Exists" });
      return;
    }
    await client.query("INSERT INTO studentsignin VALUES($1,$2,$3,$4,$5)", [
      name,
      dept,
      dob,
      id,
      pass,
    ]);
    res.json({ msg: "Success" });
  } catch (err) {
    console.log("Student sign in error:", err);
  }
};

const asignedTasks = async (req, res) => {
  const id = req.params.id;
  try {
    await client.query(
      "SELECT * FROM taskdetails WHERE id =$1 AND status='assigned'",
      [id],
      (err, ress) => {
        if (err) {
          console.log("Assigned task error:", err);
        } else if (ress.rowCount === 0) {
          console.log("No data found");
          res.send("No data");
        } else {
          res.send(ress.rows);
        }
      }
    );
  } catch (err) {
    console.log("Assigned tasks error:", err);
  }
};

const unAsignedTasks = async (req, res) => {
  try {
    await client.query(
      "SELECT * FROM taskdetails WHERE id IS NULL",
      (err, ress) => {
        if (ress.rowCount === 0) {
          console.log("No data found");
          res.send("No data");
        } else {
          res.send(ress.rows);
        }
      }
    );
  } catch (err) {
    console.log("Unassigned tasks error:", err);
  }
};

const allStudents = async (req, res) => {
  try {
    await client.query("SELECT * FROM studentsignin", (err, ress) => {
      if (ress.rowCount === 0) {
        console.log("No data found");
        res.send("No data");
      } else {
        res.send(ress.rows);
      }
    });
  } catch (err) {
    console.log("All students error:", err);
  }
};

const asignnewTask = async (req, res) => {
  const { name, category, priority, deadline, id } = req.body;
  try {
    if (id === "00") {
      await client.query(
        "INSERT INTO taskdetails(name,category,priority,deadline,status) VALUES ($1, $2,$3,$4,'open')",
        [name, category, priority, deadline]
      );
      res.json({ msg: "Success" });
    } else {
      await client.query(
        "INSERT INTO taskdetails(name,category,priority,deadline,id,status) VALUES($1, $2,$3,$4,$5,'assigned')",
        [name, category, priority, deadline, id]
      );
      res.json({ msg: "Success" });
    }
  } catch (err) {
    console.log("Assign new task error:", err);
  }
};

const finishTask = async (req, res) => {
  const { name, category, priority } = req.body;
  try {
    await client.query(
      "UPDATE taskdetails SET status='Completed' WHERE name=$1 AND category=$2 AND priority=$3",
      [name, category, priority]
    );
    res.json({ msg: "Success" });
  } catch (err) {
    console.log("Finish task error:", err);
  }
};

const asignTask = async (req, res) => {
  const { id, name, category, deadline, priority } = req.body;
  const stat = "Assigned";
  try {
    await client.query(
      "UPDATE taskdetails SET id=$1 WHERE name=$2 AND category=$3 AND priority=$4 AND status=$5",
      [id, name, category, priority, stat]
    );
    const updatedTask = await client.query(
      "SELECT * FROM taskdetails WHERE name=$1 AND category=$2 AND priority=$3",
      [name, category, priority]
    );
    res.json({ msg: "Success" });
  } catch (err) {
    console.log("Assign task error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while assigning the task" });
  }
};

const completedTasks = async (req, res) => {
  const { id } = req.params;
  const com = "Completed";
  try {
    const data = await client.query(
      "SELECT * FROM taskdetails WHERE id=$1 AND status=$2",
      [id, com]
    );
    res.send(data.rows);
  } catch (err) {
    console.log("Completed tasks error:", err);
  }
};

const updateTaskStatus = async (req, res) => {
  const { name, category, priority, status } = req.body;
  try {
    await client.query(
      "UPDATE taskdetails SET status=$1 WHERE name=$2 AND category=$3 AND priority=$4",
      [status, name, category, priority]
    );
    res.json({ msg: "Task status updated successfully" });
  } catch (err) {
    console.error("Error updating task status:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating task status" });
  }
};

const submitWorkLink = async (req, res) => {
  const { id } = req.params;
  const { workLink } = req.body;
  try {
    await client.query(
      "UPDATE taskdetails SET status='Submitted', worklink=$1 WHERE id=$2",
      [workLink, id]
    );
    res.json({ msg: "Success" });
    console.log("Work link submitted successfully");
  } catch (err) {
    console.log("Error submitting work link:", err);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the work link" });
  }
};

const getSubmittedTasks = async (req, res) => {
  try {
    const response = await client.query(
      "select * from taskdetails where status =$1",
      ["Submitted"]
    );
    if (response.rowCount === 0) {
      res.status(500).json({ msg: "No data found" });
    } else {
      res.status(200).json({ data: response.rows });
    }
  } catch (error) {
    console.log("Error in get submitted tasks:", err);
  }
};

module.exports = {
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
};
