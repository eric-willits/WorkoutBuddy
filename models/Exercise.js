const mongoose = require("mongoose");

let ExerciseSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    muscleGroups: [String]
})

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;