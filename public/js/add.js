$(document).ready(function() {
    let count = 1; 
    let exerciseArr = [];

    $('#more').click(function() {
        event.preventDefault();
        $('#moreExercises').append(`<textarea type="text" name="exercise" class="exercise" id="${count}" placeholder="Enter Exercise"></textarea>`);
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