$(document).ready(function() {
    $('#more').click(function() {
        event.preventDefault();
        $('#moreExercises').append(`<textarea type="text" name="exercise" placeholder="Enter Exercise"></textarea>`);
    });
})