"use strict";


var yaCounter51054509 = new Ya.Metrika({ id: 51054509, triggerEvent: true });
var mobileConfirmed = false;

var reach = function (goal, params) {
    if (!params) {
        params = {};
    }
    yaCounter51054509.reachGoal(goal, params, function () {
        console.log("YaCounter: the goal '" + goal + "' has been reached");
    });
};

$(document).ready(function () {
    initializeComponents();
});


var initializeComponents = function () {
    // $(".welcome").fadeOut(0);
    $(".step-wizard").fadeOut(0);

    $(".start-button").click(function () {
        $(".welcome").fadeOut("left");
        $(".step-wizard").fadeIn(150);
        reach("Wizard_Opened");

        initializeTracker();
        initializeCurrentStepForm();
        updateSubtotals();
    });

    $(".control.forward").click(function () {
        selectedStep = Math.min(6, ++selectedStep);
        if (selectedStep === 5) {
            $(".step-form").animate({
                left: "33.33%",
                width: "66.66%"
            }, 150);
            $(".subtotals").animate({
                left: 0,
                width: "33.33%"
            }, 150);
            $(".control.back").animate({
                width: "33.33%"
            }, 150);
            $(".control.forward").animate({
                width: "66.66%"
            }, 150);
            $(".control.forward").removeClass("accent");
            $(".control.forward").addClass("lgreen");
            $(".step-form").addClass("valign-wrapper");
            $(".step-wizard .col.m8").addClass("right");
            reach("Step4_Passed");
        } else if (selectedStep === 6) {
            sendContacts(function () {
                $(".step-wizard .tracker").animate({ opacity: 0 }, 150);
                $(".step-wizard .content").empty();
                $(".step-wizard .content").addClass("lgrey valign-wrapper");
                $(".step-wizard .content").append(' <div class="valign thanks container"> <p class="center-align large uppercase"> Благодарим за проявленный интерес </p> <p class="thin center-align"> В ближайшее время вам вышлют примеры наших работ со стоимостью реализации, а пока узнайте больше о нашей компании в удобной для вас социальной сети </p> <p class="thin center-align"> <a class="socialweb" data-info="VK" href="https://vk.com/atlant_23"> <img src="images/social/if_vk_3780548.png" alt=""> </a> <a class="socialweb" data-info="OK" href="https://ok.ru/atlantdevelopment"> <img src="images/social/if_ok_3780540.png" alt=""> </a> <a class="socialweb" data-info="FB" href="https://www.facebook.com/domvkrasnodare/"> <img src="images/social/if_facebook_3780531.png" alt=""> </a> <a class="socialweb" data-info="IG" href="https://www.instagram.com/atlantkrd/"> <img src="images/social/if_instagram-round-flat_1620009.png" alt=""> </a> <a class="socialweb" data-info="YT" href="https://www.youtube.com/channel/UCVeIvsGzDhIuz77N6OuKlKw"> <img src="images/social/if_youtube_3780555.png" alt=""> </a> </p> </div> ');
            });
            return;
        } else {
            reach("Step" + (selectedStep - 1) + "_Passed");
        }
        initializeCurrentStepForm();
        updateTracker();
        updateSubtotals();
    });

    $(".control.back").click(function () {
        selectedStep = Math.max(1, --selectedStep);
        if (selectedStep === 4) {
            $(".subtotals").animate({
                left: "66.66%",
                width: "33.33%"
            }, 150);
            $(".step-form").animate({
                left: 0,
                width: "66.66%"
            }, 150);
            $(".control.back").animate({
                width: "66.66%"
            }, 150);
            $(".control.forward").animate({
                width: "33.33%"
            }, 150);
            $(".control.forward").removeClass("lgreen");
            $(".control.forward").addClass("accent");
            $(".step-form").removeClass("valign-wrapper");
            $(".step-wizard .col.m8").removeClass("right");
        }
        initializeCurrentStepForm();
        updateTracker();
        updateSubtotals();
    });

    // initializeTracker();

};

var initializeTracker = function () {
    $(".tracker").empty();
    steps.forEach(function (step, index) {
        var $img = $("<img></img>").attr("src", step.img).attr("alt", step.name);
        var $label = $("<p></p>").text(step.name);
        var $item = $("<div></div>").addClass("tracker-item").append($img).append($label);

        if (index < selectedStep) {
            $item.addClass("selected");
        }
        $(".tracker").append($item);
    });
};

var validContacts = function () {
    if ($("#contact_phone").val().length == 0) {
        return "Укажите номер телефона";
    };

    if ($("#contact_phone").val().indexOf("_") > 0) {
        return "Укажите корректный номер телефона";
    };
}

var collectDataFromSteps = function () {
    var data = {};
    steps.forEach(function (step) {
        if (Array.isArray(step.controls)) {
            data[step.name] = [];
            step.controls.forEach(function (control) {
                if (Array.isArray(control.items)) {
                    control.items.forEach(function (item) {
                        if (item.checked) {
                            data[step.name].push(item.label);
                        }
                    })
                }
            })
        }
    });
    return data;
};

var initializeCurrentStepForm = function () {
    var $stepform = $(".step-form");
    $stepform.empty();
    if (selectedStep === 5) {
        $stepform.append($('<div class="container valign"> <div class="center-align large bold dgrey-text"> Заполните форму и получите примеры выполненных работ со&nbsp;стоимостью реализации! </div> <div class="input-field"> <input type="text" id="contact_name" placeholder="Олег" /> </div> <div class="input-field"> <input type="text" id="contact_email" placeholder="OLEG@pochta.Ru" /> </div> <div class="input-field"> <input type="text" id="contact_phone" placeholder="+7 (911) 299 22 11" /> <div class="accent-text valid-message center-align">Введите корректный номер</div> </div> </div>'));
        $("#contact_phone").keypress(function (key, sender) {
            $("#contact_phone").css("border", "inset 0px red");
            $(".valid-message").hide();
            if (key.target.value.length === 0 && key.charCode === 56) return false;
            //console.log(key.target.value);
        });
        var phones = [{ "mask": "+7 (8##) ###-####" }];
        $('#contact_phone').inputmask({
            mask: phones,
            greedy: true,
            prefix: "+7 ",
            definitions: {
                '8': { validator: "[0-7, 9]" },
                '#': { validator: "[0-9]", cardinality: 1 }
            }
        });
        return;
    }
    if (selectedStep === 6) {
        return;
    }
    var stepControls = steps[selectedStep - 1].controls;
    steps[selectedStep - 1].passed = true;

    stepControls.forEach(function (control) {
        var $control = $("<div></div>").addClass("group-name").text(control.groupName);
        $stepform.append($control);
        control.items.forEach(function (item) {
            var $item = null;
            switch (item.type) {
                case "radio":
                case "checkbox": $item =
                    $("<label></label>")
                        .append(
                            $("<input></input>")
                                .addClass("filled-in with-gap")
                                .attr("type", item.type)
                                .prop("checked", item.checked)
                                .attr("name", item.group + (item.type === "radio" ? "" : "[]"))
                                .attr("value", item.value)
                                .attr("data-index", item.index)
                        ).append($("<span></span>").text(item.label)); break;
                case "divider": $item = $("<div></div>").addClass("divider"); break;
            }
            $stepform.append($("<div></div>").append($item));
        });
    });

    $("[type='radio'],[type='checkbox']").change(function (event, sender) {
        var group = $(event.currentTarget).attr("name");
        var i = $(event.currentTarget).attr("data-index");
        var type = $(event.currentTarget).attr("type");

        steps.forEach(function (step) {
            if (Array.isArray(step.controls)) {
                step.controls.forEach(function (control) {
                    if (Array.isArray(control.items)) {
                        control.items.forEach(function (item) {
                            if ("radio" === type && "radio" === item.type && group === item.group) {
                                item.checked = (i == item.index);
                            }
                            if ("checkbox" === type && "checkbox" === item.type && i == item.index) {
                                item.checked = !item.checked;
                            }
                        })
                    }
                })
            }
        });
        updateSubtotals();
    });
};

var updateSubtotals = function () {
    var $subtotals = $(".subtotals");
    var totalprice = 0;
    $subtotals.empty();
    steps.forEach(function (step, stepIndex) {
        if (stepIndex > 3) return;
        $subtotals.append($("<p></p>").addClass("bold " + (selectedStep - 1 === stepIndex ? "accent-text" : (step.passed ? " lgreen-text " : " grey-text"))).text(step.name))
        if (Array.isArray(step.controls)) {
            var mulprice = step.passed ? 1 : 0;
            var price = 0;
            var selected = !step.passed;
            step.controls.forEach(function (control) {
                if (Array.isArray(control.items) && step.passed) {
                    control.items.forEach(function (item) {
                        if (item.checked) {
                            price += item.value;
                            mulprice *= item.value;
                            selected = true;
                            $subtotals.append($("<p></p>").addClass((selectedStep - 1 === stepIndex || selectedStep === 5) ? "" : "grey-text").append("<span>" + item.label + "</span>").append("<i class='material-icons tiny left'>done</i>"))
                        }
                    })
                }
            })
            totalprice += (step.multiplyPrice ? mulprice : price);
            if (!selected) {
                $subtotals.append($("<p></p>").addClass("accent-text").append("<span>Ничего не выбрано</span>").append("<i class='material-icons tiny left'>remove</i>"))
            }
            $subtotals.append($("<p></p>").addClass((selectedStep - 1 === stepIndex ? "accent-text" : (step.passed ? " lgreen-text " : " grey-text")) + " bold right-align").text(convertToString(step.multiplyPrice ? mulprice : price)))
        }
    });
    $subtotals.append($("<p></p>").addClass("divider"))
    $subtotals.append($("<p></p>").addClass("lgreen-text bold large right-align").text(convertToString(totalprice)))
};

var convertToNumber = function (str) {
    return +str.replace(/\D/g, "");
}

var convertToString = function (num, fixed) {
    var s = "";
    if (!Number.isNaN(num)) {
        for (var i = 0; i < 10; i++) {
            s = num % 10 + s;
            num = Math.floor(num / 10);
            if (num <= 0) break;

            s = num % 10 + s;
            num = Math.floor(num / 10);
            if (num <= 0) break;

            s = num % 10 + s;
            num = Math.floor(num / 10);
            if (num <= 0) break;

            s = " " + s;
        }
    } else {
        s = "0";
    }
    return s !== "0" ? (fixed ? "" : "От ") + s + " рублей" : "0 рублей";
}

var updateTracker = function () {
    $(".tracker .tracker-item").each(function (index, item) {
        if (index < selectedStep && !$(item).hasClass("selected")) {
            $(item).addClass("selected");
        }
        if (index >= selectedStep && $(item).hasClass("selected")) {
            $(item).removeClass("selected");
        }
    });
};
var sendContacts = function (callback) {
    var validerror = validContacts();
    if (validerror) {
        $("#contact_phone").css("border", "inset thin red");
        $(".valid-message").show();
        return;
    }
    reach("Lead_Confirmed");

    var dataHtml = $("#contact_phone").val() + "\r\n"
        + $("#contact_email").val() + "\r\n"
        + $("#contact_name").val() + "\r\n"
        + JSON.stringify(collectDataFromSteps(), null, 3);

    $.ajax({
        method: "post",
        url: "send.php",
        data: { data: dataHtml },
        error: function error(res) {
            M.toast({
                html: 'Произошли технические неполадки. Попробуйте еще раз'
            });
            //console.log("Failed", res);
        },
        success: function success(res) {
            if (callback) {
                callback();
            }
        }
    });
}

var selectedStep = 1;
var steps = [{
    "name": "Выбор участка",
    "img": "images/Атлант-01.png",
    "passed": false,
    "controls": [
        {
            "groupName": "В черте города",
            "items": [{
                type: "radio",
                index: 0,
                label: "Прикубанский округ",
                value: 300000,
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 1,
                label: "Центральный округ",
                value: 2000000,
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 2,
                label: "Западный округ",
                value: 2000000,
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 3,
                label: "Карасунский округ",
                value: 1000000,
                group: "region",
                checked: false
            }]
        },
        {
            "groupName": "За городом",
            "items": [{
                type: "radio",
                index: 4,
                label: "0-15 км",
                value: 200000,
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 5,
                label: "15-35 км",
                value: 100000,
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 6,
                label: "35-100 км",
                value: 50000,
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 7,
                label: "Побережье Черного моря",
                value: 300000,
                group: "region",
                checked: false
            }, {
                type: "divider"
            }, {
                type: "radio",
                index: 9,
                label: "Участок есть",
                value: 0,
                group: "region",
                checked: false
            }]
        }
    ]
}, {
    "name": "Проектирование",
    "img": "images/Атлант-02.png",
    "passed": false,
    "controls": [
        {
            "groupName": "Тип проекта",
            "items": [{
                type: "radio",
                index: 0,
                label: "Типовой проект",
                value: 20000,
                group: "projects",
                checked: false
            }, {
                type: "radio",
                index: 1,
                label: "Индивидуальный проект",
                value: 30000,
                group: "projects",
                checked: false
            }, {
                type: "divider"
            }, {
                type: "radio",
                index: 2,
                label: "Проект есть",
                value: 0,
                group: "projects",
                checked: false
            }]
        }
    ]
}, {
    "name": "Строительство",
    "img": "images/Атлант-03.png",
    "passed": false,
    "multiplyPrice": true,
    "controls": [
        {
            "groupName": "Строительство",
            "items": []
        }, {
            "groupName": "Тип конструкции",
            "items": [{
                type: "radio",
                index: 0,
                label: "Коробка",
                value: 20000,
                group: "building",
                checked: true
            }, {
                type: "radio",
                index: 1,
                label: "Предчистовая отделка",
                value: 25000,
                group: "building",
                checked: false
            }, {
                type: "radio",
                index: 2,
                label: "Дом с ремонтом",
                value: 32000,
                group: "building",
                checked: false
            }]
        }, {
            "groupName": "Площадь",
            "items": [{
                type: "radio",
                index: 0,
                label: "100-150М2",
                value: 10,
                group: "area",
                checked: true
            }, {
                type: "radio",
                index: 1,
                label: "150-200М2",
                value: 15,
                group: "area",
                checked: false
            }, {
                type: "radio",
                index: 2,
                label: "200-250М2",
                value: 20,
                group: "area",
                checked: false
            }, {
                type: "radio",
                index: 3,
                label: ">250М2",
                value: 25,
                group: "area",
                checked: false
            }]
        }, {
            "groupName": "Этажность",
            "items": [{
                type: "radio",
                index: 0,
                label: "1 этаж",
                value: 12,
                group: "floors",
                checked: true
            }, {
                type: "radio",
                index: 1,
                label: "2 этажа",
                value: 20,
                group: "floors",
                checked: false
            }, {
                type: "radio",
                index: 2,
                label: "3 этажа",
                value: 27,
                group: "floors",
                checked: false
            }]
        }
    ]
}, {
    "name": "Документация",
    "img": "images/Атлант-04.png",
    "passed": false,
    "controls": [
        {
            "groupName": "Разрешительная документация",
            "items": [{
                type: "checkbox",
                index: 0,
                label: "Разрешение на строительство",
                value: 20000,
                group: "documents",
                checked: true
            }, {
                type: "checkbox",
                index: 1,
                label: "Разрешение на ввод дома в эксплуатацию",
                value: 20000,
                group: "documents",
                checked: true
            }]
        },
        {
            "groupName": "Оформление подключений",
            "items": [{
                type: "checkbox",
                index: 2,
                label: "Электроснабжение",
                value: 20000,
                group: "documents",
                checked: true
            }, {
                type: "checkbox",
                index: 3,
                label: "Водоснабжение",
                value: 50000,
                group: "documents",
                checked: true
            }, {
                type: "checkbox",
                index: 4,
                label: "Газ",
                value: 150000,
                group: "documents",
                checked: true
            }]
        }
    ]
}, {
    "name": "Результат",
    "img": "images/Атлант-05.png",
    "passed": false
}]