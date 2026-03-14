// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");

// const app = express();

// app.use(cors());
// app.use(express.json());

// /* ================= DATABASE CONNECTION ================= */

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Varsh@17",   // ← change this
//   database: "fitness_db"      // ← change if different
// });

// db.connect((err) => {
//   if (err) {
//     console.log("DB CONNECTION ERROR:", err);
//   } else {
//     console.log("MySQL Connected Successfully ");
//   }
// });

// /* ================= GET ALL WORKOUTS ================= */

// app.get("/workouts", (req, res) => {

//   db.query("SELECT * FROM workouts", (err, result) => {

//     if (err) {
//       console.log("GET ERROR:", err);
//       return res.status(500).json({ error: err.message });
//     }

//     res.json(result);
//   });
// });

// /* ================= ADD WORKOUT ================= */

// app.post("/workouts", (req, res) => {

//   console.log("Received Data:", req.body);

//   const { user_id, exercise_name, sets, reps, duration_minutes, workout_date } = req.body;

//   const sql = `
//     INSERT INTO workouts 
//     (user_id, exercise_name, sets, reps, duration_minutes, workout_date)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     sql,
//     [user_id, exercise_name, sets, reps, duration_minutes, workout_date],
//     (err, result) => {

//       if (err) {
//         console.log("POST ERROR:", err);
//         return res.status(500).json({ error: err.message });
//       }

//       res.json({ message: "Workout Added Successfully " });
//     }
//   );
// });

// /* ================= UPDATE WORKOUT ================= */

// app.put("/workouts/:id", (req, res) => {

//   const { id } = req.params;
//   const { user_id, exercise_name, sets, reps, duration_minutes, workout_date } = req.body;

//   const sql = `
//     UPDATE workouts 
//     SET user_id=?, exercise_name=?, sets=?, reps=?, duration_minutes=?, workout_date=? 
//     WHERE workout_id=?
//   `;

//   db.query(
//     sql,
//     [user_id, exercise_name, sets, reps, duration_minutes, workout_date, id],
//     (err, result) => {

//       if (err) {
//         console.log("PUT ERROR:", err);
//         return res.status(500).json({ error: err.message });
//       }

//       res.json({ message: "Workout Updated Successfully " });
//     }
//   );
// });

// /* ================= DELETE WORKOUT ================= */

// app.delete("/workouts/:id", (req, res) => {

//   db.query(
//     "DELETE FROM workouts WHERE workout_id=?",
//     [req.params.id],
//     (err, result) => {

//       if (err) {
//         console.log("DELETE ERROR:", err);
//         return res.status(500).json({ error: err.message });
//       }

//       res.json({ message: "Workout Deleted Successfully " });
//     }
//   );
// });

// /* ================= START SERVER ================= */

// app.listen(5000, () => {
//   console.log("Server running on port 5000 ");
// });


const express = require("express");
const cors = require("cors");

const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/workouts", workoutRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000 ");
});