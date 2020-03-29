$(document).ready(function() {
    let newDiv;
    let title;
    let weight;
    let calories;
    let workouts;
    let button;

    $.get('/view', function(data, status) {
        data.forEach(element => {
            console.log(element);
            newDiv = (`<div id="${element._id}Div"></div>`);
            $('#loadingzone').append(newDiv);
            title = (`<h3>${element.title}</h3>`);
            weight = (`<p>Weight: ${element.weight}</p>`);
            calories = (`<p>Caloric Intake: ${element.calories}</p>`);
            workouts = (`<ul id="${element._id}workouts"></ul>`);
            button = (`<button id="${element._id} class="render">Update</button>`);
            $(`#${element._id}Div`).append(title);
            $(`#${element._id}Div`).append(weight);
            $(`#${element._id}Div`).append(calories);
            $(`#${element._id}Div`).append(workouts);  
            for (let i = 0; i < element.workout.length; i++) {
                $(`#${element._id}workouts`).append(`<li>${element.workout[i]}</li>`);
            }  
            $(`#${element._id}Div`).append(button);       
        });
    })

    $(document).click(function() {
        console.log('test');
        if ($(event.target).children('.render')) {
            console.log('click');
            $.get(`/update/${$(event.target).id}`, function(data, status) {
                console.log(data);
                $('#loadingzone').empty();
                newDiv = (`<div id="${data._id}UpdateDiv"></div>`)
                $('#loadingzone').append(newDiv);
                title = (`<input type="text" name="title" id="title" value="${data.title}">`);
                weight = (`<input type="text" name="weight" id="weight" value="${data.weight}">`);
                calories = (`<input type="text" name="calories" id="calories" value="${data.calories}">`);
                $(`#${data._id}UpdateDiv`).append(title);
                $(`#${data._id}UpdateDiv`).append(weight);
                $(`#${data._id}UpdateDiv`).append(calories);
                for (let i = 0; i < data.workouts.length; i++) {
                    $(`#${data._id}UpdateDiv`).append(`<textarea type="text" name="exercise" class="exercise" id="0" value="${data.workouts[i]}"></textarea>`)
                }
                button = ('<button id="more">Add Another Exercise</button>');
                $(`#${data._id}UpdateDiv`).append(button);
                button = (`<button id="${element._id} class="update">Submit</button>`);
                $(`#${data._id}UpdateDiv`).append(button);
            })
        }
    })
})