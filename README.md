Vehicle Booking System
A full-stack Vehicle Booking application built with React (frontend), Node.js + Express (backend), and MySQL (database). The app allows users to book vehicles for specific dates with validations and prevents double bookings.
________________________________________
Features / Key Points
•	Multi-step booking form with frontend validations:
•	First Name & Last Name must not be empty and contain only alphabets.
•	Steps 2–4 require radio button selection before proceeding.
•	Step 5: Start date must be ≤ End date; both dates required.
•	Submit button disabled until all validations pass.
•	Checks for overlapping bookings:
•	If vehicle already booked → "Vehicle already booked for these dates".
•	If available → "Booking successful!".
•	Database seeding:
•	npm run seed checks if MySQL database exists.
•	Creates database and tables if not present; does nothing if already exists.
•	Frontend built with React, Material-UI, and Date Pickers.
•	Backend built with Node.js, Express.js, and MySQL (mysql2).
________________________________________
Tech Stack
•	Frontend: React, Material-UI, Date Pickers
•	Backend: Node.js, Express.js
•	Database: MySQL with mysql2
•	Other Tools: npm, Node.js
________________________________________
Demo Video :- https://drive.google.com/file/d/1X0JDk0O1k584zQct3LRLr9oCcsJSQATw/view?usp=sharing
