$(document).ready(function() {
    $.ajax({
        method: 'GET',
        data: data
    }).then(data => {
        console.log(data);
    })
})