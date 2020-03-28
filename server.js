const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;

const Workout = require('./models/Workout.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workouttrackerdb', { useNewUrlParser: true });

app.get('/view', (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
});

app.post('/submit', ({ body }, res) => {
    Workout.create(body)
        .then(res.redirect('/view'))
        .catch(err => {
            res.json(err);
        })
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});