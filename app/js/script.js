"use strict";

var yaCounter47830858 = new Ya.Metrika({ id: 47830858, triggerEvent: true });
var mobileConfirmed = false;

function reach(goal, params) {
    if (!params) {
        params = {};
    }
    yaCounter47830858.reachGoal(goal, params, function () {
        // console.log("YaCounter: the goal '" + goal + "' has been reached");
    });
};

$(document).on('yacounter47830858inited', function () {
    // console.log('счетчик yaCounter можно использовать');
});

$(document).ready(function () {
    $('select').formSelect();

    var os = getMobileOperatingSystem();
    switch (os) {
        case "iOS": {
            $(".toggles").show();
            break;
        }
        case "Android": {
            $(".switch").css("opacity", "1");
            break;
        }
        default: {
            $("i.material-icons").css("opacity", "1");
            break;
        }
    }


    $(".start-btn").click(function (event) {
        $(event.currentTarget).hide();
        $("#wizard").show();
        $(".slogan.welcome").hide();
        setTimeout(function () {
            anno1.show();
        }, 500);
        $("body").css({
            "overflow": "auto",
            "max-height": "auto"
        });
    });
    $("body").css({
        "overflow": "hidden",
        "max-height": "100%"
    });

    $("#subtext").addClass("hide-on-large-only");
    $("#wizard").hide();
    $(".regions").hide();
    $(".projs").hide();
    $(".step").hide();
    $(".contact-form-wrapper").hide();
    $("#step1").show();
    $(".confirm").click(function () {
        $("#wizard, #wizard-mobile").hide();
        $(".contact-form-wrapper").show();
        setTimeout(function () {
            anno11.show();
        }, anno11timing);
    });
    $(".nextpage").click(nextPage);
    $("[data-group]").click(selectButtonInGroup);
    $("select").change(selectDropdownItem);
    $("#contact_phone").keypress(phoneInput);
    $("#step1 .nextpage, #step2 .nextpage, #step3 .nextpage").hide();
    $("#step1 #hl3 button").click(function () {
        setTimeout(function () {
            anno3.show();
        }, anno3timing);
    });
    $("#step1 .nextpage").click(function () {
        anno4.show();
    });
    $("#step2 .nextpage").click(function () {
        anno6.show();
    });
    $("#step3 .nextpage").click(function () {
        anno7.show();
    });
    $("#step4 .nextpage").click(function () {
        anno8.show();
    });
    $(".step button").click(function (event) {
        $(event.currentTarget).closest(".step").find(".nextpage").show();
    });

    $("#wizard-mobile .toggle, #wizard-mobile .confirm").click(function (event) {
        var goalName = $(event.currentTarget).attr("data-info") + "_Input_Changed";
        reach(goalName);
    });
    $("#wizard-mobile select").change(function (event) {
        var goalName = $(event.currentTarget).attr("data-info") + "_Input_Changed";
        reach(goalName);
    });

    $("#wizard-mobile .confirm").click(function () {
        mobileConfirmed = true;
    });

    $("#wizard .nextpage, #wizard .confirm").click(function (event) {
        var goalName = $(event.currentTarget).closest(".step").attr("data-info") + "_Settings_Passed";
        reach(goalName);
    });

    $(".socialweb").click(function (event) {
        var goalName = $(event.currentTarget).attr("data-info") + "_Social_Direct";
        reach(goalName);
    });

    $(".send").click(function () {
        var validerror = validContacts();
        if (validerror) {
            $("#contact_phone").css("border", "inset thin red");
            $(".valid-message").show();
            return;
        }
        reach(mobileConfirmed ? "Mobile_Contacts_Passed" : "Contacts_Passed");

        var data = [];
        data.push("---------------------");
        data.push("Информация о клиенте:");
        data.push("---------------------");
        data.push("Имя: " + $("#contact_name").val());
        data.push("Почта: " + $("#contact_email").val());
        data.push("Телефон: " + $("#contact_phone").val());
        data.push("---------------------");
        data.push("Информация о заказе:");
        data.push("---------------------");
        data = data.concat(groups.map(function (g) {
            return g.name + ": " + (g.selectedIndex != null ? g.selectedIndex === -1 ? "не выбрано" : g.items[g.selectedIndex] : g.selected ? "да" : "нет");
        }));

        //console.log($("#contact_name").val(), data);
        $.ajax({
            method: "post",
            url: "send.php",
            data: { data: data },
            error: function error(res) {
                M.toast({
                    html: 'Произошли технические неполадки. Попробуйте еще раз'
                });
                //console.log("Failed", res);
            },
            success: function success(res) {
                $(".thanks").show();
                $(".contacts").hide();
                //console.log("OK", res);
            }
        });
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

    var gr = groups.map(function (x) {
        return x.group;
    });
    gr = gr.filter(function (x, i) {
        return gr.indexOf(x) === i;
    }).map(function (x) {
        return groups.find(function (g) {
            return g.group === x;
        }).name;
    });
    gr.forEach(function (g) {
        return $(".price-" + getGroup(g)).text(getPrice(g));
    });
    $(".price-total").text(getTotalPrice());
});

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function nextPage(event, sender) {
    var stepid = $(event.currentTarget).closest(".step").attr("id").slice(-1);
    $("#step" + stepid).hide();
    $("#step" + ++stepid).show();
}

function selectDropdownItem(event, sender) {

    var id = event.currentTarget.className.split('-')[0];
    var index = $(event.currentTarget).val();
    var group = groups.find(function (x) { return x.id === id }).name;
    var target = $('[data-index="' + index + '"][data-group="' + group + '"]').attr("data-target");

    if (index == -1) {
        if (group === "тип проекта") {
            $(".projs").hide();
            selectItemInGroup("нужен проект", 0);
        }
        if (group === "тип участка") {
            $(".regions").hide();
            selectItemInGroup("нужен участок", 0);
            $(".additional").hide();
        }
    } else {
        $("[data-group='" + group + "']").removeClass("selected");
        $('[data-index="' + index + '"][data-group="' + group + '"]').addClass("selected");
        if (group === "тип проекта") {
            $(".projs").show();
            selectItemInGroup("нужен проект", 1);
        }
        if (group === "тип участка") {
            $(".regions").show();
            selectItemInGroup("нужен участок", 1);
            $(".additional").show();
        }
    }
    selectItemInGroup(group, index);

    $("#" + target).css("background-image", "url(\"images/" + target + "/" + index + ".png\")");
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
        var checked = index != null ? index === "1" : !$(event.currentTarget).find("input[type=checkbox]").prop("checked");
        $(event.currentTarget).find("i").text(checked ? "check_circle" : "radio_button_unchecked");
        $("button.toggle[data-group='" + group + "']").find("i").text(checked ? "check_circle" : "radio_button_unchecked");
        $("button.toggle[data-group='" + group + "']").find("input[type=checkbox]").prop("checked", checked);
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
        $(".additional").hide();
    }
    if (group === "нужен проект" && index === "0") {
        group = "тип проекта";
        index = "-1";
        $("button[data-group='" + group + "']").removeClass("selected");
    }
    if (group === "нужен проект" && index === "1") {
        setTimeout(function () {
            anno5.show();
        }, anno5timing);
    }
    if (group === "нужен участок" && index === "1") {
        $(".additional").show();
        setTimeout(function () {
            anno2.show();
        }, anno2timing);
    }
    selectItemInGroup(group, index);

    $("#" + target).css("background-image", "url(\"images/" + target + "/" + index + ".png\")");
    $(".price-" + getGroup(group)).text(getPrice(group));
    $(".price-total").text(getTotalPrice());
    $("." + getId(group) + "-dropdown").val(index).formSelect();
}

function validContacts() {
    if ($("#contact_phone").val().length == 0) {
        return "Укажите номер телефона";
    };

    if ($("#contact_phone").val().indexOf("_") > 0) {
        return "Укажите корректный номер телефона";
    };
}

function isToggle(groupName) {
    return !Array.isArray(groups.find(function (x) {
        return x.name === groupName;
    }).items);
}

function selectItemInGroup(groupName, index) {
    if (isToggle(groupName)) {
        groups.find(function (x) {
            return x.name === groupName;
        }).selected = index != null ? !!+index : !groups.find(function (x) {
            return x.name === groupName;
        }).selected;
        // //console.log("here", groups.find(x => x.name === groupName).selected);
    } else {
        groups.find(function (x) {
            return x.name === groupName;
        }).selectedIndex = index;
    }
}

function getPrice(groupName) {
    var g = groups.find(function (x) {
        return x.name === groupName;
    });
    return isToggle(groupName) ? g.selected ? convertToString(g.value, g.fixed) : "" : convertToString(groups.filter(function (x) {
        return x.group === g.group;
    }).reduce(function (prev, curr) {
        return prev * (curr.values[curr.selectedIndex] ? curr.values[curr.selectedIndex] : 0);
    }, 1), g.fixed);
}

function getTotalPrice() {
    var gr = groups.map(function (x) {
        return x.group;
    });
    gr = gr.filter(function (x, i) {
        return gr.indexOf(x) === i;
    });
    return convertToString(gr.reduce(function (prev, c) {
        return Math.round(prev + groups.filter(function (x) {
            return x.group === c;
        }).reduce(function (prev, curr) {
            //console.log(curr.id, (curr.values ? curr.values[curr.selectedIndex] : (curr.selected ? curr.value : 0)));
            return prev * (curr.values ? curr.values[curr.selectedIndex] ? curr.values[curr.selectedIndex] : 0 : curr.selected ? curr.value : 0);
        }, 1));
    }, groups.find(function (x) {
        return x.name === "тип участка";
    }).selectedIndex > -1 ? 30000 : 0));
}

function getGroup(groupName) {
    var g = groups.find(function (x) {
        return x.name === groupName;
    });
    return g.group;
}

function getId(groupName) {
    var g = groups.find(function (x) {
        return x.name === groupName;
    });
    return g.id;
}

function convertToNumber(str) {
    return +str.replace(/\D/g, "");
}

function convertToString(num, fixed) {
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
    return s !== "0" ? (fixed ? "" : "От ") + s + " рублей" : "";
}
function formatPhoneNumber(raw) {
    return raw.replace(/[^\d\+]/g, "").replace(/$8/);
}
function phoneInput(key, sender) {
    $("#contact_phone").css("border", "inset 0px red");
    $(".valid-message").hide();
    if (key.target.value.length === 0 && key.charCode === 56) return false;
    //console.log(key.target.value);
}

var groups = [{
    "group": "regions",
    "name": "нужен участок",
    "id": "regionNeeded",
    "items": ["Участок есть", "Нужен подбор"],
    "values": [0, 1],
    "selectedIndex": 1
}, {
    "group": "regions",
    "name": "тип участка",
    "id": "region",
    "items": ["Прикубанский округ", "Центральный округ", "Западный округ", "Карасунский округ", "0-15 км (за городом)", "15-35 км (за городом)", "35-100 км (за городом)", "Побережье черного моря"],
    "values": [300000, 2000000, 2000000, 1000000, 200000, 100000, 50000, 300000],
    "selectedIndex": 0
}, {
    "group": "projects",
    "name": "нужен проект",
    "id": "projectNeeded",
    "items": ["Проект есть", "Требуется разработка"],
    "values": [0, 1],
    "selectedIndex": 1
}, {
    "group": "projects",
    "name": "тип проекта",
    "id": "project",
    "items": ["Типовой проект", "Индивидуальный проект"],
    "values": [20000, 30000],
    "selectedIndex": 0
}, {
    "group": "building",
    "name": "комплектация",
    "id": "building",
    "items": ["Коробка", "Предчистовая отделка", "Дом с ремонтом"],
    "values": [20000, 25000, 32000],
    "selectedIndex": 0
}, {
    "group": "building",
    "name": "площадь",
    "id": "area",
    "items": ["100-150M2", "150-200M2", "200-250M2", ">250M2"],
    "values": [10, 15, 20, 25],
    "selectedIndex": 0,
    "step": 3
}, {
    "group": "building",
    "name": "этажность",
    "id": "floors",
    "items": ["1 этаж", "2 этажа", "3 этажа"],
    "values": [12, 20, 27],
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
    "fixed": true,
    "value": 20000,
    "selected": true
}, {
    "group": "electro",
    "name": "подключение электричества",
    "id": "electro",
    "fixed": true,
    "value": 20000,
    "selected": true
}, {
    "group": "usability",
    "name": "разрешение на эксплуатацию",
    "id": "usability",
    "fixed": true,
    "value": 20000,
    "selected": true
}, {
    "group": "water",
    "name": "подключение воды",
    "id": "water",
    "value": 50000,
    "selected": true
}, {
    "group": "gas",
    "name": "подключение газа",
    "id": "gas",
    "value": 150000,
    "selected": true
}];

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        },
        configurable: true,
        writable: true
    });
}


Number.isNaN = Number.isNaN || function (value) {
    return typeof value === 'number' && isNaN(value);
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.scrollTop = null;
