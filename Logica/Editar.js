var materiales = [];
var files = [];

function cargar() {
  carga();
}

var carga = async () => {
  await db
    .collection("Construcciones")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        document.getElementById("titulo").value = doc.data().titulo;
        materiales = doc.data().materiales;
        for (i = 0; i < materiales.length; i++) {
          var material = document.createElement("input");
          material.value = materiales[i];
          document.getElementById("materiales").append(material);
        }
        document.getElementById("tiempo").value = doc.data().tiempo;
        document.getElementById("coste").value = doc.data().coste;
        document.getElementById("altura").value = doc.data().altura;
        document.getElementById("ancho").value = doc.data().ancho;
        document.getElementById("descripcion").innerHTML =
          doc.data().descripcion;
        console.log(doc.data().Imagenes)
        files = doc.data().Imagenes;
      });
    });

  console.log(files);

  if(files.length != 0){
    for (let i = 0; i < files.length; i++) {
      for (a = 0; a < files.length; a++) {
        let pos = await files[a].data.pos;
        if (parseInt(pos) == i + 1) {
          imgcar({ cont: a });
        }
      }
    }
  }
};

const image_input = document.querySelector("#fileimage");
var uploaded_image = "";

image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.getElementById(
      "imgmos"
    ).style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(image_input.files[0]);
});

function cargarimg() {
  cargarurl();
}

var cargarurl = async () => {
  let storageRef = await upload({ file: image_input.files[0] });
  var ar = new Object();
  ar.url = await database.ref(storageRef.fullPath).getDownloadURL();
  var dat = new Object();
  dat.posx = 50;
  dat.posy = 50;
  dat.tam = 100;
  dat.pos = files.length + 1;
  ar.data = dat;
  ar.path = await storageRef.fullPath;
  files.push(ar);
  document.getElementById("imagenes").innerHTML = "";
  document
    .getElementById("imagenes")
    .setAttribute("class", "cont" + files.length);
  for (i = 0; i < files.length; i++) {
    for (a = 0; a < files.length; a++) {
      if (parseInt(files[a].data.pos) == i + 1) {
        imgcar({ cont: a });
      }
    }
  }
  console.log(files);
};

function editar() {
  var titulo = document.getElementById("titulo").value;
  var tiempo = document.getElementById("tiempo").value;
  var coste = document.getElementById("coste").value;
  var altura = document.getElementById("altura").value;
  var ancho = document.getElementById("ancho").value;
  var descripcion = document.getElementById("descripcion").value;

  console.log(files);
  db.collection("Construcciones").doc("Construccion1").set({
    titulo: titulo,
    tiempo: tiempo,
    materiales: materiales,
    coste: coste,
    altura: altura,
    ancho: ancho,
    descripcion: descripcion,
  });

  let collectionRef = db.collection("Construcciones");

  filestempo = []
  uploadfiles();
}

var uploadfiles = async () => {
  for (i = 0; i < files.length; i++) {
    let file = files[i].url;
    let data = files[i].data;
    let path = files[i].path;
    publish({ file: file, data: data, path: path });
  }
};

var imgcar = async ({ cont }) => {
  var div = document.createElement("div");
  div.setAttribute("id", "Imagen" + files[cont].data.pos);
  div.setAttribute("onclick", "editarimagen(this)");
  var span = document.createElement("span");
  span.innerHTML = files[cont].data.pos;
  div.append(span);

  div.setAttribute("style", "background-image: url(" + files[cont].url + ")");
  div.style.backgroundPositionX = parseInt(files[cont].data.posx) + "%";
  div.style.backgroundPositionY = parseInt(files[cont].data.posy) + "%";
  div.style.backgroundSize = parseInt(files[cont].data.tam) + "%";

  document
    .getElementById("imagenes")
    .setAttribute("class", "cont" + files.length);

  document.getElementById("imagenes").append(div);
};

function editarimagen(x) {
  numimagen.innerHTML = x.id;
  const numimgtemp = x.firstChild.textContent;
  let numimg = 0;
  for (i = 0; i < files.length; i++) {
    if (files[i].data.pos == numimgtemp) {
      numimg = i;
      console.log(files);
    }
  }
  document.getElementById("posicionx").value = files[numimg].data.posx;
  document.getElementById("posx").innerHTML =
    "Posición X: " + files[numimg].data.posx;
  document.getElementById("posiciony").value = files[numimg].data.posy;
  document.getElementById("posy").innerHTML =
    "Posición Y: " + files[numimg].data.posy;
  document.getElementById("tamano").value = files[numimg].data.tam;
  document.getElementById("tam").innerHTML = "Tamaño: " + files[numimg].data.tam;
  document.getElementById("posicion").value = files[numimg].data.pos;
}

function cambiopos(x) {
  var id = document.getElementById(
    document.getElementById("numimagen").textContent
  );
  let postemp = id.firstChild.textContent;
  let pos = 0;
  let posrem = 0;
  for (i = 0; i < files.length; i++) {
    if (files[i].data.pos == postemp) {
      pos = i;
    }
    if (files[i].data.pos == x.value) {
      posrem = i;
    }
  }

  if (id.textContent != "Imagen") {
    var imgact = new Array(2);
    imgact = files[pos];
    var imgrem = new Array(2);
    imgrem = files[posrem];

    files[pos] = imgrem;
    files[pos].data.pos = parseInt(postemp);
    files[posrem] = imgact;
    files[posrem].data.pos = parseInt(x.value);

    document.getElementById("imagenes").innerHTML = "a";
    document.getElementById("numimagen").textContent = "Imagen" + x.value;
    document
      .getElementById("imagenes")
      .setAttribute("class", "cont" + files.length);

    for (i = 0; i < files.length; i++) {
      for (a = 0; a < files.length; a++) {
        if (parseInt(files[a].data.pos) == i + 1) {
          imgcar({ cont: a });
        }
      }
    }
  }
}

function rangeSlider(x) {
  var id = document.getElementById("numimagen").textContent;

  if (id != "Imagen") {
    var img = document.getElementById(id);
    const postemp = img.firstChild.textContent;
    let pos = 0;
    for (i = 0; i < files.length; i++) {
      if (files[i].data.pos == postemp) {
        pos = i;
      }
    }
    switch (x.id) {
      case "posicionx":
        document.getElementById("posx").innerHTML = "Posición X: " + x.value;
        img.style.backgroundPositionX = x.value + "%";
        files[pos].data.posx = x.value;
        break;
      case "posiciony":
        document.getElementById("posy").innerHTML = "Posición Y: " + x.value;
        img.style.backgroundPositionY = x.value + "%";
        files[pos].data.posy = x.value;
        break;
      case "tamano":
        document.getElementById("tam").innerHTML = "Tamaño: " + x.value;
        img.style.backgroundSize = x.value + "%";
        files[pos].data.tam = x.value;
        break;
    }
  }
}

var filestempo = [];
const addDoc = async ({ collection, url, dataimg, path }) => {
  var document = {
    url: url,
    data: dataimg,
    path: path,
  };

  filestempo.push(document);

  let collectionRef = db.collection(collection);
  let documentRef = collectionRef.doc("Construccion1");

  return documentRef.update({ Imagenes: filestempo });
};

const upload = async ({ file }) => {
  let storageRef = database.ref().child(`images/construcción1/${file.name}`);
  await storageRef.put(file);
  return storageRef;
};

const publish = async ({ file, data, path }) => {
  return addDoc({
    collection: "Construcciones",
    url: file,
    dataimg: data,
    path: path,
  });
};

const queryImages = async () => {
  let collection = db.collection("files").orderBy("createdAt", "desc");
  collection.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added" || change.type === "modified") {
        showImage(change.doc.data());
      }
    });
  });
};

const showImage = async (docData) => {
  let node = document.createElement("div");
  node.classList.add("item");
  let url = await database.ref(docData.path).getDownloadURL();
  node.innerHTML = `
        <p>${docData.path}</p>
        <img class='image' src='${url}'>
    `;

  let container = document.querySelector("#images");
  container.append(node);
};


///Muestra las imagenes

/* 
main();

async function main() {
    queryImages();
}
*/

window.onscroll = function () {
  scrollimgpan();
};

function scrollimgpan() {
  if (document.documentElement.scrollTop > 1300) {
    document.getElementById("inputsimg").setAttribute("class", "inputfijo");
  } else {
    document.getElementById("inputsimg").setAttribute("class", "inputnor");
  }
}

function CargarModelo(){
  
}

let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.left = "-100%";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.left = "0";
}

setInterval(showSlides, 5000);

let prev = document.getElementById("prev");
let next = document.getElementById("next");

prev.addEventListener("click", function() {
  slideIndex -= 2;
  showSlides();
});

next.addEventListener("click", function() {
  showSlides();
});




