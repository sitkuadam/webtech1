var manufacturersTmpl = function (manufacturer) {
    return `<tr class = "manufacturerRow">
                <td>${manufacturer.name}</td>
                <td>${manufacturer.country}</td>
                <td>${manufacturer.founded}</td>
                <td><button onclick="getCars(\'${manufacturer.name}'\)" class = "show-button">Show</button></td>
            </tr>`
}

function getManufacturers() {
    $.getJSON("manufacturers", function (manufacturers) {
        for (var manufacturer of manufacturers) {
            $("#manufacturerTable").append(manufacturersTmpl(manufacturer));
        }
    }).fail(function(){
        alert("Cannot get the manufacturers");
    })
}

function addManufacturer() {
    $("#error").empty();
    var name = $("#name").val();
    var country = $("#country").val();
    var founded = $("#founded").val();
    if (name == '' || country == '' || founded == '') {
        $('#error').append('You must fill every input!');
    } else {
        var manufacturer = {
            name: name,
            country: country,
            founded: founded
        }
        $.post("addManufacturers", manufacturer)
            .done(function(msg){  
                    alert("Success")
                    $("#content").load('manufacturers.html');
                })
            .fail(function(xhr, status, error) {
                alert("Fail");
                $("#content").load('manufacturerForm.html');
            });
    }
}