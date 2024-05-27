require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  host: "monorail.proxy.rlwy.net",
  user: "postgres",
  port: "27999",
  password: process.env.pass,
  database: "ticketmanager",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { client };
