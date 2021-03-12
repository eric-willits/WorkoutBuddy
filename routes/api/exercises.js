const express = require("express");
const router = express.Router();
//import exercise
const Exercise = require("../../models/Exercise");

//Index - show all exercises
router.get("/", (req, res) => {
    Exercise.find()
        .sort('name')
        .then(exercises => res.json(exercises));
});

//Update - update currentWeight field
router.put("/currentweight", (req, res) => {
    Exercise.findByIdAndUpdate(req.body.id, {currentWeight: req.body.currentWeight})
        .then(exercise => res.json(exercise));
})

//Create - create new exercise
router.post("/", (req, res) => {
    const newExercise = new Exercise(req.body);
    Exercise.create(newExercise)
        .then(exercise => res.json(exercise));
});

module.exports = router;