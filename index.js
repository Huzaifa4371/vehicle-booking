const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const body_parser = require("body-parser");

const app = express();
app.use(cors());
app.use(body_parser.json());

let database;
try {
  database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pass@123",
    database: "vehiclebooking",
  }).promise();

  console.log("Server Connected");
} catch (error) {
  console.log(`Error : ${error}`);
}

// Api created to get Number of wheels from database
app.get("/vehicleinfo/:wheels", async (req, res) => {
  try {
    const wheels = req.params.wheels;
    const [rows] = await database.query(
      "SELECT * FROM vehicleType where wheels = ? ",
      [wheels]
    );
    // console.log(wheels);
    res.send(rows);  
  } catch (error) {
    res.send({"Error" : error});
  }
});

app.listen(3000, () => {
  console.log("server active at port 3000");
});
