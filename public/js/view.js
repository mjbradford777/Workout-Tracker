$(document).ready(function() {
    let newDiv;
    let title;
    let weight;
    let calories;
    let workouts;

    $.get('/view', function(data, status) {
        data.forEach(element => {
            console.log(element);
            newDiv = (`<div id="${element._id}"></div>`);
            $('#loadingzone').append(newDiv);
            title = (`<h3>${element.title}</h3>`);
            weight = (`<p>Weight: ${element.weight}</p>`);
            calories = (`<p>Caloric Intake: ${element.calories}</p>`);
            workouts = (`<ul></ul>`);
            for (let i = 0; i < element.workout.length; i++) {
                $(workouts).append(`<li>${element.workout[i]}</li>`);
            }
            $(`#${element._id}`).append(title);
            $(`#${element._id}`).append(weight);
            $(`#${element._id}`).append(calories);
            $(`#${element._id}`).append(workouts);           
        });
    })
})