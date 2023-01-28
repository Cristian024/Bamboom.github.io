var files = [];

let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};

function pantallacompleta() {
  var modelviewer = document.getElementById("modv");
  var info = document.getElementById("info");
  var icon = document.getElementById("pantallacompleta");
  var contenedor = document.getElementById("model-info");
  var divespa = document.getElementById("divespa");
  switch (icon.textContent) {
    case "fullscreen":
      modelviewer.setAttribute("style", "width: 100%; transition: 1s;");
      info.setAttribute("style", "overflow: hidden; transition: 1s; ");
      icon.innerHTML = "close";
      break;
    case "close":
      modelviewer.setAttribute("style", "transition: 1s;");
      info.setAttribute("style", "transition: 1s; overflow: hidden");
      icon.innerHTML = "fullscreen";
      break;
  }
}

function tutorial() {
  var tutorial = document.getElementById("tuto");
  var tutoboton = document.getElementById("tutorial");
  switch (tutoboton.getAttribute("style", "background-color")) {
    case "transition: 1s;":
      tutoboton.setAttribute(
        "style",
        "background-color: #75a16d; color: white; transition: 1s;"
      );
      tutorial.setAttribute(
        "style",
        "visibility: visible; opacity: 0; transition: 0.5s;"
      );
      setTimeout(function () {
        tutorial.setAttribute(
          "style",
          "visibility: visible; opacity: 1; transition: 0.5s;"
        );
      }, 100);
      break;
    case "background-color: #75a16d; color: white; transition: 1s;":
      tutoboton.setAttribute("style", "transition: 1s;");
      tutorial.setAttribute(
        "style",
        "visibility: visible; opacity: 0; transition: 0.5s;"
      );
      setTimeout(function () {
        tutorial.setAttribute(
          "style",
          "visibility: hidden; opacity: 0; transition: 0.5s;"
        );
      }, 100);
      break;
  }
}

var materiales = [];
function cargar() {
  setTimeout(function () {
    var contenedor = document.getElementById("contenedor_carga");
    contenedor.style.visibility = "hidden";
    contenedor.style.opacity = 0;
  }, 1500);

  var colect = db.collection("Construcciones").doc("Construccion1");
  colect.get().then((doc) => {
    document.getElementById("ti2").innerHTML = doc.data().titulo;
    materiales = doc.data().materiales;
    for (i = 0; i < materiales.length; i++) {
      var material = document.createElement("h3");
      material.innerHTML = "- " + materiales[i];
      document.getElementById("ifd1").append(material);
    }
    document.getElementById("ifd1").append(document.createElement("br"));
    document.getElementById("tiempo").innerHTML = doc.data().tiempo;
    document.getElementById("coste").innerHTML = doc.data().coste;
    document.getElementById("altura").innerHTML = doc.data().altura;
    document.getElementById("ancho").innerHTML = doc.data().ancho;
    document.getElementById("descripcion").innerHTML = doc.data().descripcion;
  });

  carga();
}

var carga = async () => {
  files = await cargardocs();

  for (let i = 0; i < files.length; i++) {
    for (a = 0; a < files.length; a++) {
      if (parseInt(files[a].data.pos) == i + 1) {
        imgcar({ cont: a });
      }
    }
  }
};

var cargardocs = async () => {
  var filestemp = [];
  var colect = db.collection("Construcciones").doc("Construccion1");
  await colect.get().then((doc) => {
    filestemp = doc.data().Imagenes;
  });
  return filestemp;
};

var imgcar = async ({ cont }) => {
  var div = document.createElement("div");
  div.setAttribute("id", "ft" + files[cont].data.pos);
  div.setAttribute("onclick", "abrirfotos(this)");
  div.setAttribute("data-aos", "zoom-in");
  var span = document.createElement("span");
  div.append(span);

  div.setAttribute("style", "background-image: url(" + files[cont].url + ")");
  div.style.backgroundPositionX = parseInt(files[cont].data.posx) + "%";
  div.style.backgroundPositionY = parseInt(files[cont].data.posy) + "%";
  div.style.backgroundSize = parseInt(files[cont].data.tam) + "%";

  document
    .getElementById("imagenes")
    .setAttribute("class", "cont" + files.length);

  document.getElementById("imagenes").append(div);

  var divinf = document.createElement("div");
  divinf.setAttribute("id", "bi" + files[cont].data.pos);
    divinf.setAttribute("onclick", "cambiar(this)");
  divinf.style.backgroundImage = `url(${files[cont].url})`;
  document.getElementById("contentbarrainf").append(divinf);
};

function cerrarfotos() {
  var contenedor = document.getElementById("catfotos");
  setTimeout(function () {
    contenedor.setAttribute(
      "style",
      "visibility: hidden; opacity: 0; transition: 0.5s;"
    );
  }, 100);
}

function abrirfotos(x) {
  document.getElementById("fotonum").innerHTML = x.id.substring(2) + "/5";
  const foto = document.getElementById("foto");
  const styles = window.getComputedStyle(x);
  const image = styles.backgroundImage;
  foto.setAttribute("src", image.slice(5, -2));
  var contenedor = document.getElementById("catfotos");
  for (i = 1; i <= files.length; i++) {
    if (i == x.id.substring(2)) {
      document.getElementById("bi" + x.id.substring(2)).style.opacity = 0.5;
    } else {
      document.getElementById("bi" + i).style.opacity = 1;
    }
  }
  setTimeout(function () {
    contenedor.setAttribute("style", "opacity: 1; transition: 0.5s;");
  }, 100);
}

function derecha() {
  let id = parseInt(
    document.getElementById("fotonum").textContent.slice(0, -2)
  );
  if (id >= files.length) {
    id = 1;
  } else {
    id++;
  }
  document.getElementById("fotonum").innerHTML = id + "/5";
  var img = document.getElementById("ft" + id);
  const foto = document.getElementById("foto");
  const styles = window.getComputedStyle(img);
  const image = styles.backgroundImage;
  foto.style.opacity = 0;
  foto.style.transition = 0.5 + "s";
  for (i = 1; i <= files.length; i++) {
    if (i == id) {
      document.getElementById("bi" + id).style.opacity = 0.5;
    } else {
      document.getElementById("bi" + i).style.opacity = 1;
    }
  }
  setTimeout(function () {
    foto.style.opacity = 1;
    foto.style.transition = 0.5 + "s";
    foto.setAttribute("src", image.slice(5, -2));
  }, 300);
}

function izquierda() {
  let id = parseInt(
    document.getElementById("fotonum").textContent.slice(0, -2)
  );
  if (id <= 1) {
    id = files.length;
  } else {
    id--;
  }
  document.getElementById("fotonum").innerHTML = id + "/5";
  var img = document.getElementById("ft" + id);
  const foto = document.getElementById("foto");
  const styles = window.getComputedStyle(img);
  const image = styles.backgroundImage;
  foto.style.opacity = 0;
  foto.style.transition = 0.5 + "s";
  for (i = 1; i <= files.length; i++) {
    if (i == id) {
      document.getElementById("bi" + id).style.opacity = 0.5;
    } else {
      document.getElementById("bi" + i).style.opacity = 1;
    }
  }
  setTimeout(function () {
    foto.style.opacity = 1;
    foto.style.transition = 0.5 + "s";
    foto.setAttribute("src", image.slice(5, -2));
  }, 300);
}

function cambiar(x) {
  document.getElementById("fotonum").innerHTML = x.id.substring(2) + "/5";
  let id = parseInt(
    document.getElementById("fotonum").textContent.slice(0, -2)
  );
  for (i = 1; i <= files.length; i++) {
    if (i == id) {
      document.getElementById("bi" + id).style.opacity = 0.5;
    } else {
      document.getElementById("bi" + i).style.opacity = 1;
    }
  }
  document.getElementById("fotonum").innerHTML = id + "/5";
  var img = document.getElementById("ft" + id);
  const foto = document.getElementById("foto");
  const styles = window.getComputedStyle(img);
  const image = styles.backgroundImage;
  foto.style.opacity = 0;
  foto.style.transition = 0.5 + "s";

  setTimeout(function () {
    foto.style.opacity = 1;
    foto.style.transition = 0.5 + "s";
    foto.setAttribute("src", image.slice(5, -2));
  }, 300);
}

var chooseElement;
const move = function (elementt) {
  const elements = document.querySelector(".arras");

  elements.forEach((element) => {
    element.addEventListener("mousedown", () => {
      chooseElement = elementt;

      document.onmousemove = (e) => {
        var x = e.pageX;

        chooseElement.style.left = x - 50 + "px";
      };
    });
  });
};

function fotinfexp() {
  var barrainf = document.getElementById("barrainf");
  if (barrainf.style.bottom == 0 || barrainf.style.bottom == 0 + "px") {
    barrainf.style.bottom = -17 + "%";
  } else if (barrainf.style.bottom == -17 + "%") {
    barrainf.style.bottom = 0;
  }
}

function zoomIn() {
  var foto = document.getElementById("foto");
  foto.setAttribute("style", "width: 200%; transition: 1s; max-width: none");
}
function zoomOut() {
  var foto = document.getElementById("foto");
  foto.setAttribute("style", "transition: 1s");
}
