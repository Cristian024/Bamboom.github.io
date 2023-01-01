let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}

function pantallacompleta() {
    var modelviewer = document.getElementById("modv")
    var info = document.getElementById("info")
    var icon = document.getElementById("pantallacompleta")
    var contenedor = document.getElementById("model-info")
    var divespa = document.getElementById("divespa")
    switch (icon.textContent) {
        case "fullscreen":
            modelviewer.setAttribute("style", "width: 100%; transition: 1s;")
            info.setAttribute("style", "overflow: hidden; transition: 1s; ")
            icon.innerHTML = "close"
            break;
        case "close":
            modelviewer.setAttribute("style", "transition: 1s;")
            info.setAttribute("style", "transition: 1s; overflow: hidden")
            icon.innerHTML = "fullscreen"
            break;
    }

}

function tutorial() {
    var tutorial = document.getElementById("tuto")
    var tutoboton = document.getElementById("tutorial")
    switch (tutoboton.getAttribute("style", "background-color")) {
        case "transition: 1s;":
            tutoboton.setAttribute("style", "background-color: #75a16d; color: white; transition: 1s;")
            tutorial.setAttribute("style", "visibility: visible; opacity: 0; transition: 0.5s;")
            setTimeout(function () {
                tutorial.setAttribute("style", "visibility: visible; opacity: 1; transition: 0.5s;")
            }, 100);
            break;
        case "background-color: #75a16d; color: white; transition: 1s;":
            tutoboton.setAttribute("style", "transition: 1s;")
            tutorial.setAttribute("style", "visibility: visible; opacity: 0; transition: 0.5s;")
            setTimeout(function () {
                tutorial.setAttribute("style", "visibility: hidden; opacity: 0; transition: 0.5s;")
            }, 100);
            break;
    }
}
