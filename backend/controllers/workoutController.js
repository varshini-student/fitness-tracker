const db = require("../db");

/* GET */
exports.getWorkouts = (req, res) => {
  db.query("SELECT * FROM workouts", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

/* POST */
exports.addWorkout = (req, res) => {
  const { user_id, exercise_name, sets, reps, duration_minutes, workout_date } = req.body;

  const sql = `
    INSERT INTO workouts 
    (user_id, exercise_name, sets, reps, duration_minutes, workout_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, exercise_name, sets, reps, duration_minutes, workout_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Workout Added Successfully" });
    });
};

/* PUT */
exports.updateWorkout = (req, res) => {
  const { id } = req.params;
  const { user_id, exercise_name, sets, reps, duration_minutes, workout_date } = req.body;

  const sql = `
    UPDATE workouts 
    SET user_id=?, exercise_name=?, sets=?, reps=?, duration_minutes=?, workout_date=? 
    WHERE workout_id=?
  `;

  db.query(sql, [user_id, exercise_name, sets, reps, duration_minutes, workout_date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Workout Updated Successfully" });
    });
};

/* DELETE */
exports.deleteWorkout = (req, res) => {
  db.query("DELETE FROM workouts WHERE workout_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Workout Deleted Successfully" });
    });
};