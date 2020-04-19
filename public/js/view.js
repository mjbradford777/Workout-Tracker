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

    $.get('/view', function(data, status) {
        data.forEach(element => {
            console.log(element);
            newDiv = (`<div id="${element._id}Div"></div>`);
            $('#loadingzone').append(newDiv);
            title = (`<h3>${element.title}</h3>`);
            weight = (`<p>Weight: ${element.weight}</p>`);
            calories = (`<p>Caloric Intake: ${element.calories}</p>`);
            workouts = (`<ul id="${element._id}workouts"></ul>`);
            button = (`<button id="${element._id}" class="render">Update</button>`);
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
        console.log($(event.target));
        if ($(event.target)[0].className === 'render') {
            console.log('click');
            console.log($(event.target)[0].id)
            $.get(`/update/${$(event.target)[0].id}`, function(data, status) {
                console.log(data);
                $('#loadingzone').empty();
                newDiv = (`<div id="${data._id}UpdateDiv" class="updateDiv"></div>`)
                $('#loadingzone').append(newDiv);
                title = (`<input type="text" name="title" id="title" value="${data.title}">`);
                weight = (`<input type="text" name="weight" id="weight" value="${data.weight}">`);
                calories = (`<input type="text" name="calories" id="calories" value="${data.calories}">`);
                $(`#${data._id}UpdateDiv`).append(title);
                $(`#${data._id}UpdateDiv`).append(weight);
                $(`#${data._id}UpdateDiv`).append(calories);
                for (let i = 0; i < data.workout.length; i++) {
                    $(`#${data._id}UpdateDiv`).append(`<textarea type="text" name="exercise" class="exercise" id="${i}">${data.workout[i]}</textarea>`)
                    count++;
                }
                button = ('<button id="more">Add Another Exercise</button>');
                $(`#${data._id}UpdateDiv`).append(button);
                button = (`<button id="${data._id}" class="update">Submit</button>`);
                $(`#${data._id}UpdateDiv`).append(button);
            })
        } else if ($(event.target)[0].id === 'more') {
            for (let i = 0; i < $(event.target)[0].parentElement.children.length; i++) {
                if ($(event.target)[0].parentElement.children[i].type === 'textarea') {
                    refID = parseInt($(event.target)[0].parentElement.children[i].id);
                } else if ($(event.target)[0].parentElement.children[i].type === 'button') {
                    nodeIndex = i;
                }
            }
            refID++;
            textarea = (`<textarea type="text" name="exercise" class="exercise" placeholder="Enter Exercise" id="${refID}"></textarea>`);
            $(textarea).insertAfter(`#${refID - 1}`);
            count++;
        } else if ($(event.target)[0].className === 'update') {
            console.log($(event.target)[0].id);
            let exerciseArr = [];
            for (let i = 0; i < count; i++) {
                exerciseArr.push($(`#${i}`).val());
            }
            console.log(exerciseArr);
            $.post('/submit', {
                _id: $(event.target)[0].id,
                title: $('#title').val(),
                weight: $('#weight').val(),
                calories: $('#calories').val(),
                workout: exerciseArr
            }, function(data) {
                console.log(data);
                // location.reload();
            })
        }
    })
})