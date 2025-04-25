// Use `pg` for Postgres and `mysql2` for MySQL, based on environment
if (process.env.NODE_ENV === "production") {
  // Use PostgreSQL for production
  const { Client } = require("pg");

  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  client.connect((err) => {
    if (err) {
      console.error("Error connecting to PostgreSQL database: " + err.stack);
      return;
    }
    console.log("Connected to PostgreSQL database");
  });
} else {
  // Use MySQL for local development
  const mysql = require("mysql2");

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL database: " + err.stack);
      return;
    }
    console.log("Connected to MySQL database as id " + connection.threadId);
  });
}
