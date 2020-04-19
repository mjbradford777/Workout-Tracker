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

app.get('/update/:id', (req, res) => {
    Workout.findOne({ '_id': req.params.id })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/submit', ({ body }, res) => {
    Workout.create(body)
        .then(res.json('success'))
        .catch(err => {
            console.log(err);
        })
});

app.post('/resubmit', ({ body }, res) => {
    // Workout.findOneAndUpdate({ '_id': body._id }, { '_id': body._id, 'title': body.title, 'weight': body.weight, 'calories': body.calories, 'workout': body.workout }, { new: true })
    Workout.findOneAndUpdate({ '_id': body._id }, body, { new: true })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        console.log(err);
    })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});