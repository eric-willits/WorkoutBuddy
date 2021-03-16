const express = require("express");
const router = express.Router();

//import Workout model
const Workout = require("../../models/Workout");

//import auth middleware
const auth = require('../../middleware/auth');

//Index - get all workouts
router.get("/", auth, (req, res) => {
    Workout.find({user: req.user.id})
    .sort('date')
    .populate('exercises.exerciseId')
    .then(workouts => res.json(workouts));
});

//Create - create new workout
router.post("/", auth, (req, res) => {
    const newWorkout = new Workout({
        ...req.body,
        user: req.user.id
    });
    newWorkout.save(() => {
        Workout.populate(newWorkout, {path: "exercises.exerciseId"})
            .then(workout => res.json(workout));
    })
});

//Update - update specific workout
router.put("/", (req, res) => {
    Workout.findByIdAndUpdate(req.body.id, {"$set": req.body.data}, {new: true})
    .populate('exercises.exerciseId')
        .then(workout => res.json(workout));
})

//Delete - delete workout
router.delete("/", (req, res) => {
    Workout.findByIdAndDelete(req.body.workoutId)
        .then(() => res.json({workoutId: req.body.workoutId}))
})

module.exports = router;