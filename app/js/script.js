"use strict";

var yaCounter47830858 = new Ya.Metrika({ id: 47830858, triggerEvent: true });
var mobileConfirmed = false;
var step3passed = false;

var reach = function (goal, params) {
    if (!params) {
        params = {};
    }
    goal = "Sales_" + goal;
    yaCounter47830858.reachGoal(goal, params, function () {
        // console.log("YaCounter: the goal '" + goal + "' has been reached");
    });
};

$(document).ready(function () {
    initializeComponents();
});

var initializeComponents = function () {
    // $(".welcome").fadeOut(0);
    $(".step-wizard").fadeOut(0);

    $(".socialweb").click(function (event) {
        var goalName = $(event.currentTarget).attr("data-info") + "_Social_Direct";
        reach(goalName);
    });

    $(".start-button").click(function () {
        $(".welcome").slideUp();
        $(".step-wizard").show("slow");
        reach("Wizard_Opened");

        initializeTracker();
        initializeCurrentStepForm();
        updateTracker();
        updateSubtotals();
    });

    $(".control.forward").click(function () {
        selectedStep = Math.min(5, ++selectedStep);
        if (selectedStep === 4) {
            $(".subtotals").addClass("alt left-side");
            $(".subtotals").removeClass("right-side");
            $(".step-form").addClass("alt right-side");
            $(".step-form").removeClass("left-side");
            $(".control.back").addClass("alt");
            $(".control.forward").addClass("alt");

            $(".control.forward").removeClass("accent");
            $(".control.forward").addClass("lgreen");
            $(".step-form").addClass("valign-wrapper");
            $(".step-wizard .col.m8").addClass("right");
            reach("Step3_Passed");
        } else if (selectedStep === 5) {
            sendContacts(function () {
                $(".step-wizard .tracker").animate({ opacity: 0 }, 150);
                $(".step-wizard .content").empty();
                $(".step-wizard .content").addClass("lgrey valign-wrapper");
                $(".step-wizard .content").append(' <div class="valign thanks container"> <p class="center-align large uppercase"> Благодарим за проявленный интерес </p> <p class="thin center-align"> В ближайшее время вам вышлют базу недвижимости на продажу, а пока узнайте больше о нашей компании в удобной для вас социальной сети </p> <p class="thin center-align"> <a class="socialweb" data-info="VK" href="https://vk.com/atlant_23"> <img src="images/social/if_vk_3780548.png" alt=""> </a> <a class="socialweb" data-info="OK" href="https://ok.ru/atlantdevelopment"> <img src="images/social/if_ok_3780540.png" alt=""> </a> <a class="socialweb" data-info="FB" href="https://www.facebook.com/domvkrasnodare/"> <img src="images/social/if_facebook_3780531.png" alt=""> </a> <a class="socialweb" data-info="IG" href="https://www.instagram.com/atlantkrd/"> <img src="images/social/if_instagram-round-flat_1620009.png" alt=""> </a> <a class="socialweb" data-info="YT" href="https://www.youtube.com/channel/UCVeIvsGzDhIuz77N6OuKlKw"> <img src="images/social/if_youtube_3780555.png" alt=""> </a> </p> </div> ');
            });
            return;
        } else {
            reach("Step" + (selectedStep - 1) + "_Passed");
        }
        initializeCurrentStepForm();
        updateTracker();
        updateSubtotals();
        $("body, html").animate({
            scrollTop: 0
        }, 250);
    });

    $(".control.back").click(function () {
        selectedStep = Math.max(1, --selectedStep);
        if (selectedStep === 3) {
            $(".subtotals").removeClass("alt left-side");
            $(".subtotals").addClass("right-side");
            $(".step-form").removeClass("alt right-side");
            $(".step-form").addClass("left-side");
            $(".control.back").removeClass("alt");
            $(".control.forward").removeClass("alt");

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
    $($(".tracker .tracker-item.selected")[selectedStep - 1]).addClass("current");
};

var objectsCount = 3;

var initializeCurrentStepForm = function () {
    var $stepform = $(".step-form");
    $stepform.empty();
    $(".control.back").show();
    switch (selectedStep) {
        case 4:
            $stepform.append($('<div class="container contacts valign"> <div class="dgrey-text center"> <p class="large accent-text bold"> По вашим параметрам подобрано </p> <p class="large lgreen-text bold"> <span class="large">' + objectsCount + '</span> объекта </p> <p class="large bold"> Заполните форму ниже, чтобы получить доступ к базе объектов </p> <p class="small accent-text italic"> * Базу высылаем только на реальные данные</p> <br/> </div> <div class="input-field"> <input type="text" id="contact_name" placeholder="Олег" /> </div> <div class="input-field"> <input type="text" id="contact_email" placeholder="OLEG@pochta.Ru" /> </div> <div class="input-field"> <input type="text" id="contact_phone" placeholder="+7 (911) 299 22 11" /> <div class="accent-text valid-message center-align">Введите корректный номер</div> </div> </div>'));
            $("#contact_phone").keypress(function (key, sender) {
                $("#contact_phone").css("border", "inset 0px red");
                $(".valid-message").hide();
                if (key.target.value.length === 0 && key.charCode === 56) return false;
                ////console.log(key.target.value);
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
        case 5:
            return;
        case 1:
            $(".control.back").hide();
        case 2:
        case 3:
            var stepControls = steps[selectedStep - 1].controls;
            steps[selectedStep - 1].passed = true;

            var $header = $("<div></div>").addClass("subheader").text(steps[selectedStep - 1].description);
            $stepform.append($header);

            if (steps[selectedStep - 1].subdescription) {
                var $subheader = $("<div></div>").addClass("subheader thin small").text("* " + steps[selectedStep - 1].subdescription);
                $stepform.append($subheader);
            }

            stepControls.forEach(function (control) {
                control.items.forEach(function (item) {
                    var $item = null;
                    switch (item.type) {
                        case "legend":
                            $item = $("<div></div>").addClass("group-name").text(item.value);
                            break;
                        case "number":
                            $item = $("<div></div>").addClass("group-name").text(item.value);
                            break;
                        case "radio":
                        case "checkbox":
                            $item = $("<label></label>")
                                .append(
                                    $("<input></input>")
                                        .addClass("filled-in with-gap")
                                        .attr("type", item.type)
                                        .prop("checked", item.checked)
                                        .attr("name", item.group + (item.type === "radio" ? "" : "[]"))
                                        .attr("value", item.value)
                                        .attr("data-index", item.index)
                                ).append($("<span></span>").text(item.label))
                                .append($("<span class='grey-text'></span>").text(item.additionalLabel));
                            break;
                        case "divider":
                            $item = $("<div></div>").addClass("divider");
                            break;
                    }
                    $stepform.append($("<div></div>").append($item));
                });
            });

            $("[type='radio'],[type='checkbox']").change(function (event, sender) {
                var group = $(event.currentTarget).attr("name");
                var i = $(event.currentTarget).attr("data-index");
                var type = $(event.currentTarget).attr("type");
                var allChecked = !steps[selectedStep - 1].groups ||
                    steps[selectedStep - 1].groups - 1 === $("form").serialize().replace(/[^&]/g, "").length;
                $(".control.forward").prop("disabled", !allChecked);
                objectsCount = 3 + Math.round(Math.random());
                if (selectedStep === 3) {
                    step3passed = true;
                }
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

            var allChecked = !steps[selectedStep - 1].groups ||
                steps[selectedStep - 1].groups - 1 === $("form").serialize().replace(/[^&]/g, "").length;

            $(".control.forward").prop("disabled", !allChecked);
            break;
        default:
            break;
    }
};

var updateSubtotals = function () {
    var $subtotals = $(".subtotals");
    var totalprice = 0;
    $subtotals.empty();
    steps.forEach(function (step, stepIndex) {
        if (stepIndex > 3) return;
        $subtotals.append($("<p></p>").addClass(selectedStep - 1 === stepIndex ? "currentStep" : "").addClass("bold " + (selectedStep - 1 === stepIndex ? "accent-text" : (step.passed ? " lgreen-text " : " grey-text"))).text(step.name))
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
            // $subtotals.append($("<p></p>").addClass(selectedStep - 1 === stepIndex ? "currentStep" : "").addClass("nowrap " + (selectedStep - 1 === stepIndex ? "accent-text" : (step.passed ? " lgreen-text " : " grey-text")) + " bold right-align").text(convertToString((step.multiplyPrice ? mulprice : price), stepIndex === 1)))
        }
    });
    // $subtotals.append($("<p></p>").addClass("divider"))
    // $subtotals.append($("<p></p>").addClass("lgreen-text currentStep nowrap bold large right-align").text(convertToString(totalprice)))
};

var updateTracker = function () {
    $(".current").removeClass("current");
    $(".tracker .tracker-item").each(function (index, item) {
        if (index < selectedStep && !$(item).hasClass("selected")) {
            $(item).addClass("selected");
        }
        if (index >= selectedStep && $(item).hasClass("selected")) {
            $(item).removeClass("selected");
        }
    });
    $($(".tracker .tracker-item.selected")[selectedStep - 1]).addClass("current");

};

var validContacts = function () {
    if ($("#contact_phone").val().length == 0) {
        return "Укажите номер телефона";
    };

    if ($("#contact_phone").val().indexOf("_") > 0) {
        return "Укажите корректный номер телефона";
    };
};

var collectDataFromSteps = function () {
    var data = "";
    var totalprice = 0;
    steps.forEach(function (step, stepIndex) {
        if (Array.isArray(step.controls)) {
            data += '"' + step.name + '": ';
            // var mulprice = step.passed ? 1 : 0;
            // var price = 0;
            var items = [];
            step.controls.forEach(function (control) {
                if (Array.isArray(control.items)) {
                    control.items.forEach(function (item) {
                        if (item.checked) {
                            // price += item.value;
                            // mulprice *= item.value;
                            items.push(item.label);
                        }
                    })
                }
            });
            // totalprice += (step.multiplyPrice ? mulprice : price);
            data += (items.length > 0 ? items.join(", ") : "ничего не выбрано");
            // + " - " + convertToString(step.multiplyPrice ? mulprice : price, stepIndex === 1) + "\r\n";
        }
    });
    //data += "\r\nИтого: " + convertToString(totalprice);
    return data;
};

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
};

var sendContacts = function (callback) {

    var dataHtml = "Заявка (продажи)  \r\n" +
        $("#contact_phone").val() + "\r\n"
        + $("#contact_email").val() + "\r\n"
        + $("#contact_name").val() + "\r\n\r\n"
        + collectDataFromSteps();

    // console.log(dataHtml);

    var validerror = validContacts();
    if (validerror) {
        $("#contact_phone").css("border", "inset thin red");
        $(".valid-message").show();
        return;
    }
    reach("Lead_Confirmed");
    callback();
    return;
    $.ajax({
        method: "post",
        url: "send.php",
        data: { data: dataHtml },
        error: function error(res) {
            M.toast({
                html: 'Произошли технические неполадки. Попробуйте еще раз'
            });
            ////console.log("Failed", res);
        },
        success: function success(res) {
            if (callback) {
                callback();
            }
        }
    });
};

var selectedStep = 1;
var steps = [{
    "name": "Выбор участка",
    "groups": 2,
    "description": "Выберите район, в котором хотите приобести жилье",
    "img": "images/Атлант-01.png",
    "passed": false,
    "controls": [
        {
            "items": [{
                type: "legend",
                value: "В черте города"
            }, {
                type: "radio",
                index: 0,
                label: "Прикубанский округ",
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 1,
                label: "Центральный округ",
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 2,
                label: "Западный округ",
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 3,
                label: "Карасунский округ",
                group: "region",
                checked: false
            }, {
                type: "legend",
                value: "За городом"
            }, {
                type: "radio",
                index: 4,
                label: "0-15 км",
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 5,
                label: "15-35 км",
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 6,
                label: "35-100 км",
                group: "region",
                checked: false
            }, {
                type: "radio",
                index: 7,
                label: "Побережье Черного моря",
                group: "region",
                checked: false
            }, {
                type: "legend",
                value: "Тип поселения"
            }, {
                type: "radio",
                index: 0,
                label: "Новый коттеджный поселок до 2х лет",
                group: "locality",
                checked: false
            }, {
                type: "radio",
                index: 1,
                label: "Развитый коттеджный поселок от 2х лет",
                group: "locality",
                checked: false
            }, {
                type: "radio",
                index: 2,
                label: "Частный сектор от 5ти лет",
                group: "locality",
                checked: false
            }]
        }
    ]
}, {
    "name": "Строительство",
    "groups": 5,
    "description": "Выберите конфигурацию вашего будущего дома",
    "img": "images/Атлант-03.png",
    "passed": false,
    "multiplyPrice": true,
    "controls": [{
        "items": [{
            type: "legend",
            value: "Площадь"
        }, {
            type: "radio",
            index: 0,
            label: "100-150М2",

            group: "area",
            checked: false
        }, {
            type: "radio",
            index: 1,
            label: "150-200М2",

            group: "area",
            checked: false
        }, {
            type: "radio",
            index: 2,
            label: "200-250М2",

            group: "area",
            checked: false
        }, {
            type: "radio",
            index: 3,
            label: ">250М2",

            group: "area",
            checked: false
        }]
    }, {
        "items": [{
            type: "legend",
            value: "Этажность"
        }, {
            type: "radio",
            index: 0,
            label: "1 этаж",

            group: "floors",
            checked: false
        }, {
            type: "radio",
            index: 1,
            label: "2 этажа",

            group: "floors",
            checked: false
        }, {
            type: "radio",
            index: 2,
            label: "3 этажа",

            group: "floors",
            checked: false
        }, {
            type: "legend",
            value: "Коммуникации"
        }, {
            type: "radio",
            index: 0,
            label: "Газ",

            group: "communication",
            checked: false
        }, {
            type: "radio",
            index: 1,
            label: "Электричество",

            group: "communication",
            checked: false
        }, {
            type: "radio",
            index: 2,
            label: "Электричество + газ",

            group: "communication",
            checked: false
        }, {
            type: "legend",
            value: "Требования"
        }, {
            type: "radio",
            index: 0,
            label: "С ремонтом",

            group: "design",
            checked: false
        }, {
            type: "radio",
            index: 1,
            label: "Без ремонта",

            group: "design",
            checked: false
        }, {
            type: "divider"
        }, {
            type: "radio",
            index: 0,
            label: "С мебелью",

            group: "furniture",
            checked: false
        }, {
            type: "radio",
            index: 1,
            label: "Без мебели",

            group: "furniture",
            checked: false
        }]
    }
    ]
}, {
    "name": "Документация",
    "description": "Выберите объекты инфраструктуры, которые для вас важны",
    "img": "images/Атлант-04.png",
    "passed": false,
    "controls": [
        {
            "items": [{
                type: "legend",
                value: "Объекты"
            }, {
                type: "checkbox",
                index: 0,
                label: "Поликлиника",

                group: "documents",
                checked: false
            }, {
                type: "checkbox",
                index: 1,
                label: "Детский сад",

                group: "documents",
                checked: false
            }, {
                type: "checkbox",
                index: 2,
                label: "Школа",

                group: "documents",
                checked: false
            }, {
                type: "checkbox",
                index: 3,
                label: "Торговый центр",

                group: "documents",
                checked: false
            }, {
                type: "checkbox",
                index: 4,
                label: "Парковая зона",

                group: "documents",
                checked: false
            }, {
                type: "checkbox",
                index: 5,
                label: "Река",

                group: "documents",
                checked: false
            }]
        }
    ]
}, {
    "name": "Результат",
    "img": "images/Атлант-05.png",
    "passed": false
}]