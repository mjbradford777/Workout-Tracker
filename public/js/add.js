$(document).ready(function() {
    let count = 1; 
    let exerciseArr = [];

    $('#more').click(function() {
        event.preventDefault();
        $('#moreExercises').append(`<div class="form-group" id="formGroup${count}"></div>`);
        $(`#formGroup${count}`).append(`<label for="${count}">Exercise ${count + 1}</label>`);
        $(`#formGroup${count}`).append(`<textarea type="text" name="exercise" class="exercise form-control" id="${count}" rows="3" placeholder="Enter Exercise"></textarea>`);
        $('<div class="col-sm-1"></div>').insertAfter(`#formGroup${count}`);
        count++;
    });

    $('#submit').click(function() {
        event.preventDefault();
        for (let i = 0; i < count; i++) {
            exerciseArr.push($(`#${i}`).val());
        }
        console.log(exerciseArr);
        $.post('/submit', {
            title: $('#title').val(),
            weight: $('#weight').val(),
            calories: $('#calories').val(),
            workout: exerciseArr
        }, function(data) {
            console.log(data);
            location.replace('./view.html');
        })
    })
})