
$('.menu-services-text').hover(function () {
    if ($('#menu-services').hasClass('menu-services-active')) {
        $('#menu-color-fondo-reveal').css({
            "left": "-60%"
        })
    }
})
$('.menu-services-text').mouseleave(function () {
    $('#menu-color-fondo-reveal').css({
        "left": "0"
    })
})

$('#retract-menu').click(function () {
    $('#menu-services').attr('class', "menu-services-inactive")
})
$('#expand-menu-services').click(function () {
    $('#menu-services').attr('class', "menu-services-active")
})

var timeout = setTimeout("updateClock()", 3000)

var totalTime = 1;

function updateClock() {
    var date = document.getElementById('date-pag')
    date.innerHTML = parseInt(date.textContent) + totalTime;
    if (parseInt(date.textContent) >= 2022) {
        date.innerHTML = 2023;
        setTimeout("showTitle()", 500)
    } else {
        totalTime + 1;
        setTimeout("updateClock()", 25);
    }
}

function showTitle(){
    document.getElementById("date-load-num").setAttribute("class", "date-load")
    document.getElementById("titulobamboom").setAttribute("class", "bamboom-screen-title-load")
    setTimeout("showPage()", 1500);
}

function showPage(){
    document.getElementById("pantalla-carga").setAttribute("class", "page-showinfo")
    setTimeout(function(){
        document.getElementById("titulobamboom").setAttribute("style", "z-index: 2000;")
    },1000)
}
