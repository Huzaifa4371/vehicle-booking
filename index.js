const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const body_parser = require("body-parser");

const app = express();
app.use(cors());
app.use(body_parser.json());

let database;
try {
  database = mysql
    .createConnection({
      host: "localhost",
      user: "root",
      password: "Pass@123",
      database: "vehiclebooking",
    })
    .promise();

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
    res.send(rows);
  } catch (error) {
    res.send({ Error: error.message });
  }
});

// Api created for Type of vehicle
app.get("/vehicleinfo/type/:typeid", async (req, res) => {
  try {
    const typeid = req.params.typeid;
    const [rows] = await database.query(
      "SELECT * FROM vehicleAval where typeid = ? ",
      [typeid]
    );
    res.send(rows);
  } catch (error) {
    res.send({ Error: error.message });
  }
});

// Api for Booking Vehicle
app.post("/createbooking", async (req, res) => {
  try {
    const { first_name, last_name, vehicle_id, start_date, end_date } = req.body;
    console.log("Incoming booking:", req.body);
    const checkQuery = `
      SELECT * FROM bookingDetail 
      WHERE vehicleid = ?
        AND NOT (
          end_date < STR_TO_DATE(?, '%Y-%m-%d') OR
          start_date > STR_TO_DATE(?, '%Y-%m-%d')
        )
    `;

    const [existingBookings] = await database.query(checkQuery, [
      vehicle_id,
      start_date,
      end_date,
    ]);

    if (existingBookings.length > 0) {
      return res
        .status(400)
        .json({ message: "Vehicle already booked for these dates" });
    }

    const insertQuery = `
      INSERT INTO bookingDetail (fname, lname, vehicleid, start_date, end_date) 
      VALUES (?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'), STR_TO_DATE(?, '%Y-%m-%d'))
    `;

    await database.query(insertQuery, [
      first_name,
      last_name,
      vehicle_id,
      start_date,
      end_date,
    ]);

    res.json({ message: "Booking successful!" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(8080, () => {
  console.log("server active at port 8080");
});
