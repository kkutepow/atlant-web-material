$(document).ready(function () {
    initializeComponents();
});


var initializeComponents = function () {
    $(".step-wizard").fadeOut(0);


    $(".start-button").click(function () {
        $(".welcome").fadeOut(150);
        $(".step-wizard").fadeIn(150);
    });
}