$(document).ready(function () {
    $('select').formSelect();

    $(".step").hide();
    $("#step1").show();
    $(".nextpage").click(nextPage);
    $("[data-group]").click(selectButtonInGroup);

    // var groups = [];
    // $("[data-group]").each((index, item) => {
    //     var g = $(item).attr("data-group");
    //     if (groups.indexOf(g) < 0) {
    //         groups.push(g);
    //     }
    // });
    // console.log(JSON.stringify(groups.map(item => {
    //     return { group: item, items: [] };
    // })));
});

function nextPage(event, sender) {
    var stepId = $(event.currentTarget).parent().parent().parent().parent().parent().attr("id").slice(-1);
    $("#step" + stepId).hide();
    $("#step" + (++stepId)).show();
}

function selectButtonInGroup(event, sender) {
    var group = $(event.currentTarget).attr("data-group");
    $("[data-group='" + group + "']").removeClass("selected");
    $(event.currentTarget).addClass("selected");

    var target = $(event.currentTarget).attr("data-target");
    var index = $(event.currentTarget).attr("data-index");
    var toHide = $(event.currentTarget).attr("data-area-hide");
    var toShow = $(event.currentTarget).attr("data-area-show");

    var price = groups.find(x => x.group === group).items[index];
    $("#" + target).css("background-image", `url("images/${target}/${index}.png")`)
    $("#" + target + "-price").text(price);
    $("#" + target + "-summary-label").text(price);
    $("#" + target + "-summary").val(index).formSelect();
    $("." + toHide).hide();
    $("." + toShow).show();

}


var groups = [{
    "group": "нужен участок",
    "items": [
    ]
}, {
    "group": "тип участка",
    "items": [
        "от 1 500 000 рублей",
        "от 1 000 000 рублей",
        "от 750 000 рублей",
        "от 500 000 рублей",
        "от 1 500 000 рублей",
        "от 1 000 000 рублей",
        "от 750 000 рублей",
        "от 500 000 рублей"
    ]
}, {
    "group": "нужен проект",
    "items": []
}, {
    "group": "тип проекта",
    "items": [
        "30 000 рублей",
        "50 000 рублей"
    ]
}, {
    "group": "комплектация",
    "items": []
}, {
    "group": "площадь",
    "items": []
}, {
    "group": "этажность",
    "items": []
}, {
    "group": "дополнительные опции",
    "items": []
}, {
    "group": "разрешение на строительство",
    "items": [
        "",
        "20 000 рублей"
    ]
}, {
    "group": "подключение электричества",
    "items": [
        "",
        "от 5 000 рублей"
    ]
}, {
    "group": "разрешенние на эксплуатацию",
    "items": [
        "",
        "от 5 000 рублей"
    ]
}, {
    "group": "подключение воды",
    "items": [
        "",
        "от 25 000 рублей"
    ]
}, {
    "group": "подключение газа",
    "items": [
        "",
        "от 25 000 рублей"
    ]
}];