const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    date: String,
    muscleGroups: [String],
    exercises: [{
        exerciseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise"
        },
        sets: String,
        reps: String,
        weight: String
    }],
    notes: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;