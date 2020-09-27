// definicion de variables

// const errorDiv = document.querySelector(".error");
const API_URL = "https://covid19.mathdro.id/api";
const paisesSelect = document.querySelector("#paises");
const confirmados = document.querySelector("#confirmados");
const recuperados = document.querySelector("#recuperados");
const fallecidos = document.querySelector("#fallecidos");
const pais = document.querySelector("#pais");


// capturo eventos
paisesSelect.onchange = function(e) {
  const elementoSeleccionado = e.target;
  const codigoPais = elementoSeleccionado.value;
  const indiceSeleccionado = elementoSeleccionado.selectedIndex;

  pais.innerHTML = elementoSeleccionado.options[indiceSeleccionado].text;

  obtenerEstadisticas(codigoPais);
};


// definicion de funciones
function obtenerPaises() {
  fetch(`${API_URL}/countries`)
    .then(data => data.json())
    .then(data => {
      mostrarPaises(data.countries);
    })
    .catch(err => {
      console.log(err);
      // errorDiv.innerText = "no se pudo obtener la lista de paises";
    });
}

function mostrarPaises(paises) {
  let option;
  paises.forEach(pais => {
    option = document.createElement("option");
    option.text = pais.name;
    option.value = pais.iso2; // attributo de la api
    paisesSelect.add(option);
  });
}

function obtenerEstadisticas(codigoPais) {
  let url;
  url = codigoPais === "all" ? API_URL : `${API_URL}/countries/${codigoPais}`;

  fetch(url)
    .then(data => data.json())
    .then(estadisticas => {
      mostrarEstadisticas(estadisticas);
    })
    .catch(err => {
      console.log(err);
      // errorDiv.innerText = `no se pudo obtener la informacion de ${codigoPais}`;
    });
}

function mostrarEstadisticas(stats) {
  // errorDiv.innerText = "";
  confirmados.innerHTML = stats.confirmed.value.toLocaleString();
  recuperados.innerHTML = stats.recovered.value.toLocaleString();
  fallecidos.innerHTML = stats.deaths.value.toLocaleString();
}

// ejecucion
obtenerPaises();
obtenerEstadisticas("all");

// ==================================================================================

// Usando callback function para guardar lista de paises en variable

// function getData(url, cb) {
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       cb(data);
//     });
// }

// let listaPaises;
// let nombresPaises = [];

// getData(`${API_URL}/countries`, data => {
//   listaPaises = data.countries;
//   obtenerNombresPaises(listaPaises);
// });

// function obtenerNombresPaises(listaPaises) {
//   listaPaises.forEach(pais => {
//     nombresPaises.push(pais.name);
//   });
// }

// function matchPaises(input) {
//   var reg = new RegExp(
//     input
//       .split("")
//       .join("\\w*")
//       .replace(/\W/, ""),
//     "i"
//   );

//   return nombresPaises.filter(function(paises) {
//     if (paises.match(reg)) {
//       return paises;
//     }
//   });
// }

// function changeInput(val) {
//   if (val.length === 0) {
//     document.querySelector("#resultado").innerHTML = "";
//   }

//   if (val.length < 3) {
//     return;
//   }

//   var autoCompleteResult = matchPaises(val);
//   const resultado = document.querySelector("#resultado");

//   resultado.innerHTML = "";
//   autoCompleteResult.forEach(pais => {
//     li = document.createElement("li");
//     li.innerHTML = pais;

//     resultado.appendChild(li);
//   });

//   if (autoCompleteResult.length == 1) {
//     let paisObjeto = listaPaises.find(o => o.name === autoCompleteResult[0]);

//     pais.innerHTML = autoCompleteResult[0];
//     obtenerEstadisticas(paisObjeto.iso2);
//   }
//}
