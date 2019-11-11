$(document).ready(function () {
    $.getJSON("manufacturers", function(data) {
        for(var i=0; i < data.length; i++) {
            $("#select").append("<option>" + data[i].name + "</option>");
        }
    })
})

var carRowTmpl = function (car) {
    return $(`
    <tr class = "carRow">
        <td>${car.name}</td>
        <td>${car.consumption}</td>
        <td>${car.color}</td>
        <td>${car.manufacturer}</td>
        <td>${car.available}</td>
        <td>${car.year}</td>
        <td colspan="2">${car.horsepower}</td>
        <td></td>
    </tr>
    `)
};

function getCars(manufacturer) {
    $.getJSON("cars", function (cars) {
        for (let car of cars) {
            var row = carRowTmpl(car);
            $("#carsTable").append(row);
        }
    })

    document.cookie="name=" + manufacturer;
    $.getJSON("manufacturer", function(data){
        if(data.length > 0) {
            var tableShownCars = $('<table></table>');
            $(tableShownCars).append('<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>');
            $.each(data, function(key, value){
                var row = $('<tr></tr>');
                var nameCell = $('<td>' + value.name + '</td>');
                var consumptionCell = $('<td>' + value.consumption + '</td>');
                var colorCell = $('<td>' + value.color + '</td>');
                var manufacturerCell = $('<td onclick="openManufacturer(' +
                    "'" +
                    value.manufacturer +
                    "'" +
                    ')">' + value.manufacturer + '</td>');
                var availableCell = $('<td>' + value.available + '</td>');
                var yearCell = $('<td>' + value.year + '</td>');
                var horsepowerCell = $('<td>' + value.horsepower + '</td>');
                $(row).append(nameCell);
                $(row).append(consumptionCell);
                $(row).append(colorCell);
                $(row).append(manufacturerCell);
                $(row).append(availableCell);
                $(row).append(yearCell);
                $(row).append(horsepowerCell);
                $(tableShownCars).append(row);
            })
            $("#shownCars").empty();
            $("#shownCars").append('<h2>' + manufacturer + ' car(s): </h2>')
            $("#shownCars").append(tableShownCars);
        } else {
            $("#shownCars").empty();
            $("#shownCars").append('<h2>' + manufacturer + ' car(s): </h2>')
            $("#shownCars").append('<h3>No cars</h3>');
        }
    });
}

function addCar() {
    $("#error").empty();
    var name = $("#name").val();
    var consumption = $("#consumption").val();
    consumption = consumption + "l/100km";
    var color = $("#color").val();
    var manufacturer = $("#select").val();
    var available = $("#available").val();
    var year = $("#year").val();
    var horsepower = $("#horsepower").val();
    if (name == '' || consumption == '' || color == '' || manufacturer == '' || available == '' || year == '' || horsepower == '') {
        $('#error').append('You must fill every input!');
    } else {
        var car = {
        name: name,
        consumption: consumption,
        color: color,
        manufacturer: manufacturer,
        available: available,
        year: year,
        horsepower: horsepower
        }
        $.post("addCar", car)
            .done(function(msg){  
                    alert("Success")
                    $("#content").load('cars.html');
                })
            .fail(function(xhr, status, error) {
                alert("Fail");
                $("#content").load('carForm.html');
            });
    }
}