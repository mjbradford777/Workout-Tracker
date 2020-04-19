$(document).ready(function() {
    let newDiv;
    let title;
    let weight;
    let calories;
    let workouts;
    let button;
    let refID;
    let textarea;
    let nodeIndex;
    let count = 0;
    let label;

    $.get('/view', function(data, status) {
        data.forEach(element => {
            newDiv = (`<div id="${element._id}Div"></div>`);
            $('#loadingzone').append(newDiv);
            newDiv = (`<div id="${element._id}TitleDiv" class="row justify-content-center"></div>`);
            $(`#${element._id}Div`).append(newDiv);
            title = (`<h3>${element.title}</h3>`);
            $(`#${element._id}TitleDiv`).append(title);
            newDiv = (`<div id="${element._id}WeightDiv" class="row justify-content-center"></div>`);
            $(`#${element._id}Div`).append(newDiv);
            weight = (`<p>Weight: ${element.weight}</p>`);
            $(`#${element._id}WeightDiv`).append(weight);
            newDiv = (`<div id="${element._id}CaloriesDiv" class="row justify-content-center"></div>`);
            $(`#${element._id}Div`).append(newDiv);
            calories = (`<p>Caloric Intake: ${element.calories}</p>`);
            $(`#${element._id}CaloriesDiv`).append(calories);
            newDiv = (`<div id="${element._id}WorkoutsDiv" class="row justify-content-center"></div>`);
            $(`#${element._id}Div`).append(newDiv);
            workouts = (`<ul id="${element._id}workouts"></ul>`);
            $(`#${element._id}WorkoutsDiv`).append(workouts);  
            for (let i = 0; i < element.workout.length; i++) {
                $(`#${element._id}workouts`).append(`<li>${element.workout[i]}</li>`);
            }  
            newDiv = (`<div id="${element._id}ButtonDiv" class="row justify-content-center"></div>`);
            $(`#${element._id}Div`).append(newDiv);
            button = (`<button id="${element._id}" class="render btn btn-warning">Update</button>`);
            $(`#${element._id}ButtonDiv`).append(button); 
            $('#loadingzone').append('<br>');      
        });
    })

    $(document).click(function() {
        if ($(event.target)[0].className === 'render btn btn-warning') {
            console.log($(event.target)[0].id)
            $.get(`/update/${$(event.target)[0].id}`, function(data, status) {
                $('#loadingzone').empty();
                newDiv = (`<div id="${data._id}UpdateDiv" class="updateDiv"></div>`)
                $('#loadingzone').append(newDiv);
                newDiv = (`<div id="${data._id}TitleDiv" class="row justify-content-center"></div>`)
                $(`#${data._id}UpdateDiv`).append(newDiv);
                newDiv = ('<div class="form-group" id="titleForm"></div>');
                $(`#${data._id}TitleDiv`).append(newDiv);
                label = ('<label for="title">Title</label>');
                $('#titleForm').append(label);
                title = (`<input type="text" name="title" id="title" class="form-control" value="${data.title}">`);
                $('#titleForm').append(title);
                newDiv = (`<div id="${data._id}WeightDiv" class="row justify-content-center"></div>`)
                $(`#${data._id}UpdateDiv`).append(newDiv);
                newDiv = ('<div class="form-group" id="weightForm"></div>');
                $(`#${data._id}WeightDiv`).append(newDiv);
                label = ('<label for="weight">Weight</label>');
                $('#weightForm').append(label);
                weight = (`<input type="text" name="weight" id="weight" value="${data.weight}">`);
                $('#weightForm').append(weight);
                newDiv = (`<div id="${data._id}CaloriesDiv" class="row justify-content-center"></div>`)
                $(`#${data._id}UpdateDiv`).append(newDiv);
                newDiv = ('<div class="form-group" id="caloriesForm"></div>');
                $(`#${data._id}CaloriesDiv`).append(newDiv);
                label = ('<label for="calories">Calories</label>');
                $('#caloriesForm').append(label);
                calories = (`<input type="text" name="calories" id="calories" value="${data.calories}">`);
                $('#caloriesForm').append(calories);
                newDiv = (`<div id="WorkoutsDiv" class="row justify-content-center"></div>`)
                $(`#${data._id}UpdateDiv`).append(newDiv);
                for (let i = 0; i < data.workout.length; i++) {
                    newDiv = (`<div class="form-group" id="${i}WorkoutsForm"></div>`);
                    $(`#WorkoutsDiv`).append(newDiv);
                    label = (`<label for="exercise">Exercise ${i + 1}</label>`);
                    $(`#${i}WorkoutsForm`).append(label);
                    $(`#${i}WorkoutsForm`).append(`<textarea type="text" name="exercise" class="exercise form-control" rows="3" id="${i}">${data.workout[i]}</textarea>`);
                    $(`#WorkoutsDiv`).append('<div class="col-sm-1"></div>');
                    count++;
                }
                newDiv = (`<div id="moreButtonDiv" class="row justify-content-center"></div>`)
                $(`#${data._id}UpdateDiv`).append(newDiv);
                button = ('<button class="btn btn-warning" id="more">Add Another Exercise</button>');
                $(`#moreButtonDiv`).append(button);
                newDiv = (`<div id="submitButtonDiv" class="row justify-content-center"></div>`)
                $(`#${data._id}UpdateDiv`).append(newDiv);
                button = (`<button id="${data._id}" class="update btn btn-warning">Submit</button>`);
                $(`#submitButtonDiv`).append(button);
            })
        } else if ($(event.target)[0].id === 'more') {
            console.log('click');
            // for (let i = 0; i < $(event.target)[0].parentElement.children.length; i++) {
            //     if ($(event.target)[0].parentElement.children[i].type === 'textarea') {
            //         refID = parseInt($(event.target)[0].parentElement.children[i].id);
            //     } else if ($(event.target)[0].parentElement.children[i].type === 'button') {
            //         nodeIndex = i;
            //     }
            // }
            // refID++;
            newDiv = (`<div class="form-group" id="${count}WorkoutsForm"></div>`);
            $(`#WorkoutsDiv`).append(newDiv);
            label = (`<label for="exercise">Exercise ${count + 1}</label>`);
            $(`#${count}WorkoutsForm`).append(label);
            $(`#${count}WorkoutsForm`).append(`<textarea type="text" name="exercise" class="exercise form-control" rows="3" id="${count}"></textarea>`);
            $(`#WorkoutsDiv`).append('<div class="col-sm-1"></div>');
            // textarea = (`<textarea type="text" name="exercise" class="exercise" placeholder="Enter Exercise" id="${refID}"></textarea>`);
            // $(textarea).insertAfter(`#${refID - 1}`);
            count++;
        } else if ($(event.target)[0].className === 'update btn btn-warning') {
            let exerciseArr = [];
            for (let i = 0; i < count; i++) {
                exerciseArr.push($(`#${i}`).val());
            }
            $.post('/resubmit', {
                _id: $(event.target)[0].id,
                title: $('#title').val(),
                weight: $('#weight').val(),
                calories: $('#calories').val(),
                workout: exerciseArr
            }, function(data) {
                console.log(data);
                location.reload();
            })
        }
    })
})