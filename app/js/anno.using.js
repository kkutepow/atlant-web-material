var anno2timing = 400;
var anno5timing = 400;
var anno11timing = 400;

function annoHide(anno, $target, $annoElem, returnFromOnShow) {
    var handler = returnFromOnShow
    $target[0].removeEventListener('click', handler)
};

function annoShow(anno, $target, $annoElem) {
    var handler = function () { anno.hide(); setTimeout(function () { anno2timing = 0; }, 400) }
    $target[0].addEventListener('click', handler)
    return handler
};

var anno1 = new Anno({
    target: '#hl1',
    content: "При строительстве дома нужно учитывать стоимость "
        + "земельного участка, которая зависит от расположения и "
        + "удаленности от Краснодара<br/><br/><span class='bold'>"
        + "Выберите подходящее условие...</span>",
    buttons: [],
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); setTimeout(function () { anno2timing = 0; }, 400) }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow
        $target[0].removeEventListener('click', handler)
    }
})

var anno2 = new Anno({
    target: '#hl2',
    content: "Здесь отображается средняя стоимость подбора участка",
    buttons: [],
    className: "align-center",
    position: "center-bottom",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno2.hide(); anno3.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow
        $target[0].removeEventListener('click', handler);
        setTimeout(function () {
            anno3.show();
        }, 400);
    }
})

var anno3 = new Anno({
    target: '#hl3',
    content: "Выберите расположение участка",
    buttons: [],
    className: "align-center",
    position: "center-right",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
    }
})

var anno4 = new Anno({
    target: '#hl4',
    content: "Дом невозможно построить без проекта, а это тоже затраты и их нужно учитывать<br/><br/><span class='bold'>"
        + "Выберите подходящее условие...</span>",
    buttons: [],
    className: "center-align",
    position: "center-bottom",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); setTimeout(function () { anno5timing = 0; }, 400) }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow
        $target[0].removeEventListener('click', handler)
    }
})

var anno5 = new Anno({
    target: '#hl5',
    content: "У нас очень большая база типовых проектов, из "
        + "которой вы можете выбрать подходящий вам вариант"
        + "<br/><br/> А также отличные проетировщики, которые "
        + "воплотят в проекте любую вашу мечту",
    buttons: [],
    className: "align-center",
    position: "center-bottom",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
    }
})

var anno6 = new Anno({
    target: '#hl6',
    content: "Непосредственно стоимость дома зависит от множества факторов:"
        + "<br/>- стоимость стройматериалов"
        + "<br/>- комплектация дома"
        + "<br/>- площадь"
        + "<br/>- этажность и другие факторы"
        + "<br/><br/>На данном сайте мы можем вас сориентировать "
        + "по средней стоимости строительства основанной на нашем опыте"
        + "<br/><br/><span class='bold'>Выберите необходимые вам опции</span>"
    ,
    buttons: [],
    className: "align-center",
    position: "center-right",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
    }
})

var anno7 = new Anno({
    target: '#hl7',
    content: "Мы можем оформить всю разрешительную документацию, либо вы можете это сделать сами"
        + "<br/><br/><span class='bold'>Используйте перключатели, чтобы выбрать, какую документацию вам необходимо оформить</span>"
    ,
    buttons: [],
    className: "align-center",
    position: "center-right",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
    }
})

var anno8 = new Anno({
    target: '#hl8',
    content: "Ваш ориентировочный расчет готов.<br/><br/>Вы можете прямо в формах"
        + " изменить значение, чтобы получить новую итоговую сумму",
    buttons: [],
    className: "align-center",
    position: "center-top",
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
        setTimeout(function () {
            anno9.show();
        }, 400);
    }
})

var anno9 = new Anno({
    target: '#hl9',
    content: "Здесь отображается итоговая стоимость по вашим параметрам",
    buttons: [],
    className: "align-center",
    position: "center-top",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
        setTimeout(function () {
            anno10.show();
        }, 400);
    }
})

var anno10 = new Anno({
    target: '#hl10',
    content: "<span class='bold'>После уточнения деталей утвердите свой выбор.</span>"
        + "<br/><br/>Мы предоставим вам каталог наших реализованных объектов с реальной"
        + " стоимостью, чтобы вы смогли более точно рассчитать свой бюджет",
    buttons: [],
    className: "align-center",
    position: "center-top",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); setTimeout(function () { anno11timing = 0; }, 400) }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
    }
})

var anno11 = new Anno({
    target: '#hl11',
    content: "Чтобы избежать отправки каталога роботам и конкурентам, "
        + "у нас выполняется ручная проверка каждой заявки"
        + "<br/><br/>Поэтому, если вы действительно заинтересованы, "
        + "то заполните форму ниже и дождитесь звонка нашего менеджера",
    buttons: [],
    className: "align-center",
    position: "center-top",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
    }
})

function annoInit() {
    anno1.show();
}