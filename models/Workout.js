const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    title: String,
    weight: String,
    calories: String,
    workout: Array
})

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;