var anno2timing = 400;
var anno3timing = 400;
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
    content: "При строительстве дома прежде всего нужно учитывать стоимость "
        + "земельного участка, которая зависит от расположения и "
        + "удаленности от Краснодара"
        + "<br/><br/><span class='bold'>У вас уже есть участок?</span>",
    buttons: [],
    position: "center-top",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); setTimeout(function () { anno2timing = 0; }, 400) }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow
        $target[0].removeEventListener('click', handler);
        anno1 = {};
    }
})

var anno3 = new Anno([{
    target: '#hl2',
    content: "Здесь отображается средняя стоимость земли",
    buttons: [{ text: 'Далее' }],
    className: "align-center",
    position: "center-top"
}, {
    target: '#hl3_1',
    content: "Когда определитесь с параметрами, нажмите здесь, чтобы перейти к проектированию",
    buttons: [{ text: 'Понятно', click: function (anno, evt) { anno.hide(); } }],
    className: "align-center",
    position: "center-top",
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        anno3 = {};
    }
}])

var anno2 = new Anno({
    target: '#hl3',
    content: "Выберите расположение участка",
    buttons: [],
    className: "align-center",
    position: "center-top",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); setTimeout(function () { anno3timing = 0; }, 400) }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
        anno2 = {};
    }
})

var anno4 = new Anno({
    target: '#hl4',
    content: "Дом невозможно построить без проекта, а это тоже затраты и их нужно учитывать"
        + "<br/><br/><span class='bold'>У вас уже есть проект?</span>",
    buttons: [],
    className: "center-align",
    position: "center-top",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); setTimeout(function () { anno5timing = 0; }, 400) }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow
        $target[0].removeEventListener('click', handler)
        anno4 = {};
    }
})

var anno5 = new Anno({
    target: '#hl5',
    content: "У нас очень большая база типовых проектов, из "
        + "которой вы можете выбрать подходящий вам вариант"
        + "<br/><br/> А также отличные проектировщики, которые "
        + "воплотят в проекте любую вашу мечту",
    buttons: [{ text: 'Понятно', click: function (anno, evt) { anno.hide(); } }],
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
        anno5 = {};
    }
})

var anno6 = new Anno({
    target: '#hl6',
    content: "Стоимость дома зависит от множества факторов:"
        + "<br/>- стоимости стройматериалов"
        + "<br/>- площади"
        + "<br/>- этажности и т.д."
        + "<br/><br/>Выберите параметры, и мы сможем вас "
        + "сориентировать по средней цене, исходя из нашего опыта"
    ,
    buttons: [{ text: 'Понятно', click: function (anno, evt) { anno.hide(); } }],
    className: "align-center",
    position: "right",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
        anno6 = {};
    }
})

var anno7 = new Anno({
    target: '#hl7',
    content: "Мы можем оформить всю разрешительную документацию, либо вы можете это сделать сами"
        + "<br/><br/><span class='bold'>Используйте переключатели, чтобы выбрать, какую документацию вам необходимо оформить</span>"
    ,
    buttons: [{ text: 'Понятно', click: function (anno, evt) { anno.hide(); } }],
    className: "align-center",
    position: "right",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
        anno7 = {};
    }
})

var anno8 = new Anno([{
    target: '#hl8',
    content: "Ваш ориентировочный расчет готов.<br/><br/>Вы можете прямо в формах"
        + " изменить значения полей, чтобы получить новую итоговую сумму",
    buttons: [{ text: 'Далее' }],
    className: "align-center",
    position: "center-top"
}, {
    target: '#hl9',
    content: "Здесь отображается итоговая стоимость по вашим параметрам",
    buttons: [{ text: 'Далее' }],
    className: "align-center",
    position: "center-top"
}, {
    target: '#hl10',
    content: "Более точно сориентироваться по цене вам помогут примеры наших "
        + "выполненных работ, которые мы предоставляем со стоимостью реализации",
    buttons: [{ text: 'Понятно', click: function (anno, evt) { anno.hide(); } }],
    className: "align-center",
    position: "center-top"
}])

var anno11 = new Anno({
    target: '#hl11',
    content: "Чтобы избежать отправки каталога роботам и конкурентам, "
        + "у нас выполняется ручная проверка каждой заявки"
        + "<br/><br/>Поэтому, если вы действительно заинтересованы, "
        + "то заполните форму ниже и дождитесь звонка нашего менеджера",
    buttons: [{ text: 'Понятно', click: function (anno, evt) { anno.hide(); } }],
    className: "align-center",
    position: { "left":"auto", "top": "120px" },
    arrowPosition: "right",
    onShow: function (anno, $target, $annoElem) {
        var handler = function () { anno.hide(); }
        $target[0].addEventListener('click', handler)
        return handler
    },
    onHide: function (anno, $target, $annoElem, returnFromOnShow) {
        var handler = returnFromOnShow;
        $target[0].removeEventListener('click', handler);
        anno11 = {};
    }
})