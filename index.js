const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const body_parser = require("body-parser");

const app = express();
app.use(cors());
app.use(body_parser.json());

try {
  const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pass@123",
    database: "vehiclebooking",
  });

  console.log("Server Connected");
} catch (error) {
  console.log(`Error : ${error}`);
}

app.listen(3000, () => {
  console.log("server active at port 3000");
});
