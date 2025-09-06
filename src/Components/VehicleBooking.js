import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Input,
  TextField,Alert
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "./style.css";
import React, { useState, useEffect } from "react";

export default function VehicleBooking() {
  const [step, setStep] = useState(1);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [wheels, setWheels] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (wheels) {
      fetch(`http://localhost:8080/vehicleinfo/${wheels}`)
        .then((res) => res.json())
        .then((data) => setVehicleTypes(data))
        .catch((err) => console.error(err));
    }
  }, [wheels]);

  useEffect(() => {
    if (selectedType) {
      fetch(`http://localhost:8080/vehicleinfo/type/${selectedType}`)
        .then((res) => res.json())
        .then((data) => setVehicles(data))
        .catch((err) => console.error(err));
    }
  }, [selectedType]);

  const handleSubmit = async () => {
    if (!fName || !lName || !selectedVehicle || !startDate || !endDate) {
      setMessage("Please fill all fields!");
      return;
    }

    function formatDateLocal(dateString) {
      const date = new Date(dateString);
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
    
      return `${year}-${month}-${day}`;
    }

    const booking = {
      first_name: fName,
      last_name: lName,
      vehicle_id: selectedVehicle,
      start_date: formatDateLocal(startDate).toString(),
      end_date: formatDateLocal(endDate).toString(),
    };

    // console.log(booking);

    try {
      const response = await fetch("http://localhost:8080/createbooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        // console.log("message",result)
      } else {
        setMessage(result.message);
        // console.log("message",result)
      }
    } catch (error) {
      console.error(error.message);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="maindiv">
      <h1 className="heading">Vehicle Booking</h1>
      {message && <Alert severity="info" style={{ marginBottom: 10 }}>{message}</Alert>}
      <div className="box">
        {step === 1 && (
          <>
            <blockquote class="blockquote">
              <p>Please Enter Your First Name And Last Name!</p>
            </blockquote>
            <Input
              color="neutral"
              placeholder="Enter Your First Name"
              size="lg"
              variant="soft"
              className="margin-b-10"
              onChange={(e) => setFName(e.target.value)}
            />
            <Input
              color="neutral"
              placeholder="Enter Your Last Name"
              size="lg"
              variant="soft"
              className="margin-b-10"
              onChange={(e) => setLName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => setStep(2)}
              disabled={fName.trim().length === 0 || lName.trim().length === 0}
              className="margin-t-10"
            >
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <blockquote class="blockquote">
              <p>Select Wheels</p>
            </blockquote>
            <RadioGroup
              value={wheels}
              onChange={(e) => setWheels(e.target.value)}
            >
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="2 Wheels"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="4 Wheels"
              />
            </RadioGroup>
            <Button
              variant="contained"
              onClick={() => setStep(3)}
              disabled={!wheels}
            >
              Next
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <blockquote class="blockquote">
              <p>Select Vehicle Type</p>
            </blockquote>
            <RadioGroup
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {vehicleTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id.toString()}
                  control={<Radio />}
                  label={type.name}
                />
              ))}
            </RadioGroup>
            <Button
              variant="contained"
              onClick={() => setStep(4)}
              disabled={!selectedType}
            >
              Next
            </Button>
          </>
        )}
        {step === 4 && (
          <>
            <blockquote class="blockquote">
              <p>Select Vehicle</p>
            </blockquote>
            <RadioGroup
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            >
              {vehicles.map((v) => (
                <FormControlLabel
                  key={v.id}
                  value={v.id.toString()}
                  control={<Radio />}
                  label={v.model}
                />
              ))}
            </RadioGroup>
            <Button
              variant="contained"
              onClick={() => setStep(5)}
              disabled={!selectedVehicle}
            >
              Next
            </Button>
          </>
        )}
        {step === 5 && (
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </LocalizationProvider>
            <Button variant="contained" onClick={handleSubmit} 
            disabled={
              !startDate || !endDate || new Date(startDate) >= new Date(endDate)
            }
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
