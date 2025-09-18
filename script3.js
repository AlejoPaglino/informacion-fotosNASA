let botonAleatoria = document.getElementById("botonAleatoria");
let resultado = document.getElementById("resultado");
let API_KEY = "DEMO_KEY"; 
let BASE_URL = "https://api.nasa.gov/planetary/apod";

function limpiarContenedor() {
  resultado.innerHTML = "";
}
function mostrarImagen(url, titulo, fecha) {
  resultado.innerHTML = `
    <div class="card">
      <h3>${titulo || "Sin título"}</h3>
      <img src="${url}" alt="${titulo || "APOD"}">
      <p>${fecha || ""}</p>
    </div>
  `;
}
botonAleatoria.onclick = function () {
  limpiarContenedor();
  resultado.innerHTML = "<p>Cargando...</p>";

  fetch(BASE_URL + "?api_key=" + API_KEY + "&count=1&thumbs=true")
    .then(function (res) {
      
      return res.json();
    })
    .then(function (data) {
      let item = data[0];
      if (item.media_type === "image") {
        mostrarImagen(item.url, item.title, item.date);
      } else if (item.media_type === "video") {
        mostrarImagen(item.thumbnail_url || "", (item.title || "APOD") + " (video)", item.date);
      } else {
        resultado.innerHTML = "<p class='error'>Tipo de medio no soportado.</p>";
      }
    })

};