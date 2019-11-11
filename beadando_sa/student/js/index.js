window.onload = function() {
    jQuery(document).ready(function() {

        $("#content").load("pages/main.html");
        initModal();

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

function initModal() {
    $(".close-button").click(function() {
        delModal();
    });

    $(window).click(function(event) {
        if ($(event.target).is($("#modal"))) {
            delModal();
        }
    });
}

function delModal() {
    $("#modal").hide();
    $("#modal-header h2").empty();
    $("#modal-body").empty();
}