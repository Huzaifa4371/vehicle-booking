const mysql = require("mysql2");
async function seed() {
  const database = mysql
    .createConnection({
      host: "localhost",
      user: "root",
      password: "Pass@123",
    })
    .promise();

  try {
    await database.query(`CREATE DATABASE IF NOT EXISTS vehiclebooking`);
    await database.query(`USE vehiclebooking`);
    await database.query(`
      CREATE TABLE IF NOT EXISTS vehicleType (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        wheels INT NOT NULL
      )
    `);
    await database.query(`
      CREATE TABLE IF NOT EXISTS vehicleAval (
        id INT AUTO_INCREMENT PRIMARY KEY,
        model VARCHAR(100) NOT NULL,
        typeid INT,
        FOREIGN KEY (typeid) REFERENCES vehicleType(id)
      )
    `);
    await database.query(`
      CREATE TABLE IF NOT EXISTS bookingDetail (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fname VARCHAR(100),
        lname VARCHAR(100),
        vehicleid INT,
        start_date DATE,
        end_date DATE,
        FOREIGN KEY (vehicleid) REFERENCES vehicleAval(id)
      )
    `);
    const [types] = await database.query(
      "SELECT COUNT(*) AS count FROM vehicleType"
    );
    if (types[0].count === 0) {
      await database.query(`
        INSERT INTO vehicleType (name, wheels) VALUES
        ('Hatchback', 4),
        ('SUV', 4),
        ('Sedan', 4),
        ('Cruiser', 2),
        ('Sports', 2)
      `);
      console.log("vehicleType table seeded");
    }

    const [models] = await database.query(
      "SELECT COUNT(*) AS count FROM vehicleAval"
    );
    if (models[0].count === 0) {
      await database.query(`
        INSERT INTO vehicleAval (model, typeid) VALUES
        ('Punch', 1),
        ('Creta', 2),
        ('Chevrolet Cruze', 3),
        ('Royal Enfield', 4),
        ('Yamaha R15', 5)
      `);
      console.log("vehicleAval table seeded");
    }
    console.log("Seeding complete");
    process.exit(0);
  } catch (error) {
    console.log("Error : " + error.message);
    process.exit(1);
  }
}

seed();
