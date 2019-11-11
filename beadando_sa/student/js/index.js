window.onload = function() {
    jQuery(document).ready(function() {

        $("#content").load("pages/main.html");

        $("#home").click(function () {
            $("#content").load("pages/main.html");
        });

        $("#carsButton").click(function () {
            $("#content").load("pages/cars.html", function () {
                getCars();
                $("#addCarButton").click(function () {
                    $("#content").load("pages/carForm.html");
                })
            });
        });

        $("#manufacturersButton").click(function () {
            $("#content").load("pages/manufacturers.html", function () {
                getManufacturers();
                $("#addManufacturerButton").click(function () {
                    $("#content").load("pages/manufacturerForm.html");
                })
            });
        });
    })
};