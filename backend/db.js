const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Varsh@17",
  database: "fitness_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB CONNECTION ERROR:", err);
  } else {
    console.log("MySQL Connected Successfully ");
  }
});

module.exports = db;