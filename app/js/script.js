$(document).ready(function () {
    $('select').formSelect();

    $(".step").hide();
    $(".contact-form-wrapper").hide();
    $("#step1").show();
    $(".confirm").click(function () {
        $("#wizard, #wizard-mobile").hide();
        $(".contact-form-wrapper").show();
    });
    $(".nextpage").click(nextPage);
    $("[data-group]").click(selectButtonInGroup);
    $("select").change(selectDropdownItem);
    $("#contact_phone").keypress(phoneInput);
    $(".nextpage").hide();
    $(".step button").click(function(evt){
        console.log($(event.currentTarget).parent(".step"));
        $(event.currentTarget).closest(".step").find(".nextpage").show();        
    });
    $(".send").click(function () {
        var data = [];
        data.push("Информация о клиенте:");
        data.push("Имя: " + $("#contact_name").val());
        data.push("Почта: " + $("#contact_email").val());
        data.push("Телефон: " + $("#contact_phone").val());
        data.push("---------------------");
        data.push("Информация о заказе:");
        data = data.concat(
            groups.map(g => g.name + ": " + (g.selectedIndex != null
                ? (g.selectedIndex === -1 ? "не выбрано" : g.items[g.selectedIndex])
                : (g.selected ? "да" : "нет"))));

                console.log($("#contact_name").val(), data);
        $.ajax({
            method: "post",
            url: "send.php",
            data: { data: data },
            error: (res) => {
                M.toast("Произошли технические неполадки. Попробуйте еще раз", 2000)
            },
            success: (res) => {
                $(".thanks").show();
                $(".contacts").hide();
            }
        })
    })
    var phones = [{ "mask": "+7 (###) ###-####" }];
    $('#contact_phone').inputmask({
        mask: phones,
        greedy: true,
        prefix: "+7 ",
        definitions: { '#': { validator: "[0-9]", cardinality: 1 } }
    });

    var gr = groups.map(x => x.group);
    gr = gr.filter((x, i) => gr.indexOf(x) === i).map(x => {
        return groups.find(g => g.group === x).name
    });
    gr.forEach(g => $(".price-" + getGroup(g)).text(getPrice(g)))
    $(".price-total").text(getTotalPrice());

});

function nextPage(event, sender) {
    var stepid = $(event.currentTarget).parent().parent().parent().parent().parent().attr("id").slice(-1);
    $("#step" + stepid).hide();
    $("#step" + (++stepid)).show();
}

function selectDropdownItem(event, sender) {
    var id = event.currentTarget.className.split('-')[0];
    var index = $(event.currentTarget).val();
    var group = groups.find(x => x.id === id).name;
    var target = $('[data-index="' + index + '"][data-group="' + group + '"]').attr("data-target");

    if (index == -1) {
        if (group === "тип проекта") {
            $(".projects").hide();
            selectItemInGroup("нужен проект", 0);
        }
        if (group === "тип участка") {
            $(".regions").hide();
            selectItemInGroup("нужен участок", 0);
        }
    }
    else {
        $("[data-group='" + group + "']").removeClass("selected");
        $('[data-index="' + index + '"][data-group="' + group + '"]').addClass("selected");
        selectItemInGroup(group, index);
        if (group === "тип проекта") {
            $(".projects").show();
            selectItemInGroup("нужен проект", 1);
        }
        if (group === "тип участка") {
            $(".regions").show();
            selectItemInGroup("нужен участок", 1);
        }
    }

    $("#" + target).css("background-image", `url("images/${target}/${index}.png")`)
    $(".price-" + getGroup(group)).text(getPrice(group));
    $(".price-total").text(getTotalPrice());
    $("." + getId(group) + "-dropdown").val(index).formSelect();
}

function selectButtonInGroup(event, sender) {
    var group = $(event.currentTarget).attr("data-group");
    var index = $(event.currentTarget).attr("data-index");
    var toHide = $(event.currentTarget).attr("data-area-hide");
    var toShow = $(event.currentTarget).attr("data-area-show");
    var target = $(event.currentTarget).attr("data-target");

    $("." + toHide).hide();
    $("." + toShow).show();


    if (isToggle(group)) {
        var checked = index != null ? index === "1" : $(event.currentTarget).find("i").text() === "radio_button_unchecked";
        $(event.currentTarget).find("i").text("radio_button_" + (checked ? "checked" : "unchecked"));
        $("button.toggle[data-group='" + group + "']").find("i").text("radio_button_" + (checked ? "checked" : "unchecked"));
        $("button[data-group='" + group + "']").removeClass("selected");
        $("button[data-group='" + group + "'][data-index='" + (checked ? 1 : 0) + "']").addClass("selected");
    } else {
        $("button[data-group='" + group + "']").removeClass("selected");
        $(event.currentTarget).addClass("selected");
    }
    if (group === "нужен участок" && index === "0") {
        group = "тип участка";
        index = "-1";
        $("button[data-group='" + group + "']").removeClass("selected");
    }
    if (group === "нужен проект" && index === "0") {
        group = "тип проекта";
        index = "-1";
        $("button[data-group='" + group + "']").removeClass("selected");
    }
    selectItemInGroup(group, index);

    $("#" + target).css("background-image", `url("images/${target}/${index}.png")`)
    $(".price-" + getGroup(group)).text(getPrice(group));
    $(".price-total").text(getTotalPrice());
    $("." + getId(group) + "-dropdown").val(index).formSelect();
}

function isToggle(groupName) {
    return !Array.isArray(groups.find(x => x.name === groupName).items);
}

function selectItemInGroup(groupName, index) {
    if (isToggle(groupName)) {
        groups.find(x => x.name === groupName).selected = index != null ? !!+index : !groups.find(x => x.name === groupName).selected;
        // console.log("here", groups.find(x => x.name === groupName).selected);
    } else {
        groups.find(x => x.name === groupName).selectedIndex = index;
    }
}

function getPrice(groupName) {
    var g = groups.find(x => x.name === groupName)
    return isToggle(groupName)
        ? (g.selected ? convertToString(g.value) : "")
        : convertToString(groups.filter(x => x.group === g.group).reduce((prev, curr) => {
            return prev * (curr.values[curr.selectedIndex] ? curr.values[curr.selectedIndex] : 0);
        }, 1));
}

function getTotalPrice() {
    var gr = groups.map(x => x.group);
    gr = gr.filter((x, i) => gr.indexOf(x) === i);
    return convertToString(gr
        .reduce((prev, c) =>
            prev +
            groups.filter(x => x.group === c)
                .reduce((prev, curr) => {
                    // console.log(curr.id, (curr.values ? curr.values[curr.selectedIndex] : (curr.selected ? curr.value : 0)));
                    return prev * (curr.values ? (curr.values[curr.selectedIndex] ? curr.values[curr.selectedIndex] : 0) : (curr.selected ? curr.value : 0));
                }, 1),
            0));
}

function getGroup(groupName) {
    var g = groups.find(x => x.name === groupName)
    return g.group;
}

function getId(groupName) {
    var g = groups.find(x => x.name === groupName)
    return g.id;
}

function convertToNumber(str) {
    return +str.replace(/\D/g, "");
}

function convertToString(num) {
    var s = "";
    if (!Number.isNaN(num)) {
        for (var i = 0; i < 10; i++) {
            s = (num % 10) + s;
            num = Math.floor(num / 10);
            if (num <= 0) break;

            s = (num % 10) + s;
            num = Math.floor(num / 10);
            if (num <= 0) break;

            s = (num % 10) + s;
            num = Math.floor(num / 10);
            if (num <= 0) break;

            s = " " + s;
        }
    }
    else {
        s = "0"
    }
    return "От " + s + " рублей";
}
function formatPhoneNumber(raw) {
    return raw.replace(/[^\d\+]/g, "").replace(/$8/);
}
function phoneInput(key, sender) {
    if (key.charCode < 48 || key.charCode > 57) return false;

}

var groups = [{
    "group": "regions",
    "name": "нужен участок",
    "id": "regionNeeded",
    "items": [
        "Участок есть",
        "Нужен подбор"
    ],
    "values": [
        0,
        1
    ],
    "selectedIndex": 1
}, {
    "group": "regions",
    "name": "тип участка",
    "id": "region",
    "items": [
        "Прикубанский округ",
        "Центральный округ",
        "Западный округ",
        "Карасунский округ",
        "0-15 км (за городом)",
        "15-35 км (за городом)",
        "35-100 км (за городом)",
        "Побережье черного моря"
    ],
    "values": [
        300000,
        2000000,
        2000000,
        1000000,
        200000,
        100000,
        50000,
        300000
    ],
    "selectedIndex": -1
}, {
    "group": "projects",
    "name": "нужен проект",
    "id": "projectNeeded",
    "items": [
        "Проект есть",
        "Требуется разработка"
    ],
    "values": [
        0,
        1
    ],
    "selectedIndex": 1
}, {
    "group": "projects",
    "name": "тип проекта",
    "id": "project",
    "items": [
        "Типовой проект",
        "Индивидуальный проект"
    ],
    "values": [
        20000,
        30000
    ],
    "selectedIndex": -1
}, {
    "group": "building",
    "name": "комплектация",
    "id": "building",
    "items": [
        "Коробка",
        "Предчистовая отделка",
        "Дом с ремонтом"
    ],
    "values": [
        20000,
        25000,
        32000
    ],
    "selectedIndex": 0
}, {
    "group": "building",
    "name": "площадь",
    "id": "area",
    "items": [
        "100-150M2",
        "150-200M2",
        "200-250M2",
        ">250M2",
    ],
    "values": [
        100,
        150,
        200,
        250
    ],
    "selectedIndex": 0,
    "step": 3
}, {
    "group": "building",
    "name": "этажность",
    "id": "floors",
    "items": [
        "1 этаж",
        "2 этажа",
        "3 этажа",
    ],
    "values": [
        1.2,
        2,
        3.8
    ],
    "selectedIndex": 0,
    "step": 3
}, {
    "group": "underground",
    "name": "цокольный этаж",
    "id": "underground",
    "value": 0,
    "selected": false
}, {
    "group": "garage",
    "name": "гараж",
    "id": "garage",
    "value": 0,
    "selected": false
}, {
    "group": "monsarde",
    "name": "монсарда",
    "id": "monsarde",
    "value": 0,
    "selected": false
}, {
    "group": "permission",
    "name": "разрешение на строительство",
    "id": "permission",
    "value": 20000,
    "selected": false
}, {
    "group": "electro",
    "name": "подключение электричества",
    "id": "electro",
    "value": 20000,
    "selected": false
}, {
    "group": "usability",
    "name": "разрешение на эксплуатацию",
    "id": "usability",
    "value": 20000,
    "selected": false
}, {
    "group": "water",
    "name": "подключение воды",
    "id": "water",
    "value": 50000,
    "selected": false
}, {
    "group": "gas",
    "name": "подключение газа",
    "id": "gas",
    "value": 150000,
    "selected": false
}];