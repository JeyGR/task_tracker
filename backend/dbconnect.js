require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  host: "myfirstdb.c34iimaqwkda.ap-south-1.rds.amazonaws.com",
  user: "postgres",
  port: "5432",
  password: process.env.pass,
  database: "task_management",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { client };
