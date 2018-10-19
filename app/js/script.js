$(document).ready(function () {
    try {
        $('.dropdown-trigger').dropdown();
    } catch {

    }

    $(".step").hide();
    $("#step1").show();
    $(".nextpage").click(nextPage);
    $("[data-group]").click(selectButtonInGroup);
});

function nextPage(event, sender) {
    stepId = $(event.currentTarget).parent().parent().parent().parent().parent().attr("id").slice(-1);
    // $parent.css( "background", "yellow" )
    $("#step" + stepId).hide();
    $("#step" + (++stepId)).show();
}

function selectButtonInGroup(event, sender) {
    group = $(event.currentTarget).attr("data-group");
    $("[data-group='" + group + "']").removeClass("selected");
    $(event.currentTarget).addClass("selected");
    console.log(group);
}