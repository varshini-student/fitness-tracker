const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");

router.get("/", workoutController.getWorkouts);
router.post("/", workoutController.addWorkout);
router.put("/:id", workoutController.updateWorkout);
router.delete("/:id", workoutController.deleteWorkout);

module.exports = router;