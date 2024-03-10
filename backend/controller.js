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
  await client.query(
    "select * from studentsignin where username=$1 and pass=$2",
    [name, pass],
    (err, ress) => {
      const [username] = ress.rows;
      if (err) {
        console.log("Login error", err);
      } else if (!username) {
        console.log("user not found");
        res.json({ msg: "User not found" });
      } else {
        console.log(ress.rows[0].id);
        res.json({ msg: "Success", id: ress.rows[0].id });
      }
    }
  );
};

const studentsignin = async (req, res) => {
  const { name, dept, dob, id, pass } = req.body;
  if (name == "admin") {
    res.json({ msg: "Username can't be admin" });
  }
  try {
    const studentexist = await client.query(
      "select * from studentsignin where username =$1",
      [name]
    );
    if (studentexist.rowCount != 0) {
      res.json({ msg: "User Already Exists" });
    }
    await client.query("insert into studentsignin values($1,$2,$3,$4,$5)", [
      name,
      dept,
      dob,
      id,
      pass,
    ]);
    res.json({ msg: "Success" });
  } catch (err) {
    console.log("Student sign in err:", err);
  }
};

const asignedTasks = async (req, res) => {
  console.log("sfs");
  const id = req.params.id;
  try {
    await client.query(
      "select * from taskdetails where id =$1 and status='Not completed' ",
      [id],
      (err, ress) => {
        if (err) {
          console.log("Asigned task :", err);
        } else if (ress.rowCount == 0) {
          console.log("No data found");
          res.send("No data");
        } else {
          console.log("Successfully retrieved");
          res.send(ress.rows);
        }
      }
    );
  } catch (err) {
    console.log("asignedTasks err:", err);
  }
};

const unAsignedTasks = async (req, res) => {
  try {
    await client.query(
      "select * from taskdetails where id is null",
      (err, ress) => {
        if (ress.rowCount == 0) {
          console.log("No data found");
          res.send("No data");
        } else {
          console.log("Successfully retrieved unasigned tasks");
          res.send(ress.rows);
        }
      }
    );
  } catch (err) {
    console.log("UnasignedTasks err:", err);
  }
};

const allStudents = async (req, res) => {
  try {
    await client.query("select * from studentsignin", (err, ress) => {
      if (ress.rowCount == 0) {
        console.log("No data found");
        res.send("No data");
      } else {
        console.log("Successfully retrieved");
        res.send(ress.rows);
      }
    });
  } catch (err) {
    console.log("AllStudents err:", err);
  }
};

const asignnewTask = async (req, res) => {
  const { name, category, priority, deadline, id } = req.body;
  try {
    if (id == "00") {
      await client.query(
        "insert into taskdetails(name,category,priority,deadline,status) values ($1, $2,$3,$4,'Not completed')",
        [name, category, priority, deadline]
      );
      res.json({ msg: "Success" });
      console.log("Inserted and asigned Open task successfully");
    } else {
      await client.query(
        "insert into taskdetails values($1, $2,$3,$4,$5,'Not completed')",
        [name, category, priority, deadline, id]
      );
      res.json({ msg: "Success" });
      console.log("Inserted and asigned new task successfully");
    }
  } catch (err) {
    console.log("asignnewtask err:", err);
  }
};

const finishTask = async (req, res) => {
  const { name, category, priority } = req.body;
  console.log(name, category, priority);
  try {
    await client.query(
      "update taskdetails set status='Completed' where name=$1 and category=$2 and priority=$3 ",
      [name, category, priority]
    );
    res.json({ msg: "Success" });
    console.log("Task finished successfully");
  } catch (err) {
    console.log("finishTask err:", err);
  }
};

const asignTask = async (req, res) => {
  const { id, name, category, deadline, priority } = req.body;
  console.log(deadline);
  try {
    await client.query(
      "UPDATE taskdetails SET id=$1 WHERE name=$2 AND category=$3 AND priority=$4",
      [id, name, category, priority]
    );
    const updatedTask = await client.query(
      "SELECT * FROM taskdetails WHERE name=$1 AND category=$2 AND priority=$3",
      [name, category, priority]
    );
    console.log(updatedTask.rows);
    res.json({ msg: "Success" });
    console.log("Assigned successfully");
  } catch (err) {
    console.log("asign Task err:", err);
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
      "select * from taskdetails where id=$1 and status=$2 ",
      [id, com]
    );
    console.log(data.rows);
    res.send(data.rows);
  } catch (err) {
    console.log("Error in compeleted task :", err);
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
};
