import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const API = "http://127.0.0.1:5000/workouts";

  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const [form, setForm] = useState({
    user_id: "",
    exercise_name: "",
    sets: "",
    reps: "",
    duration_minutes: "",
    workout_date: ""
  });

  const [editId, setEditId] = useState(null);

  // Fetch workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(API);
        setWorkouts(res.data);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    fetchWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((w) =>
    w.exercise_name.toLowerCase().includes(search.toLowerCase())
  );

  // Dashboard calculations
  const totalWorkouts = filteredWorkouts.length;
  const totalSets = filteredWorkouts.reduce((sum, w) => sum + w.sets, 0);
  const totalReps = filteredWorkouts.reduce((sum, w) => sum + w.reps, 0);
  const totalDuration = filteredWorkouts.reduce(
    (sum, w) => sum + w.duration_minutes,
    0
  );

  const handleSubmit = async () => {

    if (
      !form.user_id ||
      !form.exercise_name ||
      !form.sets ||
      !form.reps ||
      !form.duration_minutes ||
      !form.workout_date
    ) {
      alert("Please fill all fields!");
      return;
    }

    const formattedData = {
      user_id: Number(form.user_id),
      exercise_name: form.exercise_name,
      sets: Number(form.sets),
      reps: Number(form.reps),
      duration_minutes: Number(form.duration_minutes),
      workout_date: form.workout_date
    };

    try {
      if (editId !== null) {
        await axios.put(`${API}/${editId}`, formattedData);
      } else {
        await axios.post(API, formattedData);
      }

      const res = await axios.get(API);
      setWorkouts(res.data);

      setEditId(null);
      setForm({
        user_id: "",
        exercise_name: "",
        sets: "",
        reps: "",
        duration_minutes: "",
        workout_date: ""
      });

    } catch (error) {
      console.log("Submit Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${API}/${id}`);
      const res = await axios.get(API);
      setWorkouts(res.data);
    }
  };

  const handleEdit = (item) => {
    setForm({
      user_id: item.user_id,
      exercise_name: item.exercise_name,
      sets: item.sets,
      reps: item.reps,
      duration_minutes: item.duration_minutes,
      workout_date: item.workout_date?.split("T")[0]
    });
    setEditId(item.workout_id);
  };

  // CSV Export
  const exportCSV = () => {
    const headers = ["Exercise", "Sets", "Reps", "Duration", "Date"];
    const rows = filteredWorkouts.map(w => [
      w.exercise_name,
      w.sets,
      w.reps,
      w.duration_minutes,
      w.workout_date?.split("T")[0]
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "workouts.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className={darkMode ? "container dark" : "container light"}>

      <h2>Fitness Workout Tracker</h2>

      {/* Dark Mode Toggle */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Form */}
      <div className="form-grid">
        <input placeholder="User ID"
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
        />
        <input placeholder="Exercise"
          value={form.exercise_name}
          onChange={(e) => setForm({ ...form, exercise_name: e.target.value })}
        />
        <input placeholder="Sets"
          value={form.sets}
          onChange={(e) => setForm({ ...form, sets: e.target.value })}
        />
        <input placeholder="Reps"
          value={form.reps}
          onChange={(e) => setForm({ ...form, reps: e.target.value })}
        />
        <input placeholder="Duration"
          value={form.duration_minutes}
          onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
        />
        <input type="date"
          value={form.workout_date}
          onChange={(e) => setForm({ ...form, workout_date: e.target.value })}
        />
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={handleSubmit}>
          {editId !== null ? "Update Workout" : "Add Workout"}
        </button>
      </div>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="card">Workouts: {totalWorkouts}</div>
        <div className="card">Sets: {totalSets}</div>
        <div className="card">Reps: {totalReps}</div>
        <div className="card">Duration: {totalDuration} mins</div>
      </div>

      {/* Search + Export */}
      <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0" }}>
        <input
          placeholder="Search Exercise..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={exportCSV}>Export CSV</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredWorkouts.map((w) => (
            <tr key={w.workout_id}>
              <td>{w.exercise_name}</td>
              <td>{w.sets}</td>
              <td>{w.reps}</td>
              <td>{w.duration_minutes}</td>
              <td>{w.workout_date?.split("T")[0]}</td>
              <td>
                <button onClick={() => handleEdit(w)}>Edit</button>
                <button onClick={() => handleDelete(w.workout_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;