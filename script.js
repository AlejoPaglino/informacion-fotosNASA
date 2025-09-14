const API_KEY = "DEMO_KEY"; // Reemplaza por tu API Key si tienes una
const fechaInput = document.getElementById("fecha");
const buscarBtn = document.getElementById("buscarBtn");
const resultado = document.getElementById("resultado");
const error = document.getElementById("error");

// Establecer fecha máxima (hoy)
fechaInput.max = new Date().toISOString().split("T")[0];

buscarBtn.addEventListener("click", () => {
  const fecha = fechaInput.value;

  if (!fecha || new Date(fecha) > new Date()) {
    mostrarError("Por favor, selecciona una fecha válida que no sea futura.");
    return;
  }

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fecha}`;
  obtenerFoto(url);
});

function obtenerFoto(url) {
  resultado.innerHTML = "Cargando...";
  error.textContent = "";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.media_type !== "image") {
        mostrarError("esta fecha todavia no ha llegado.");
        return;
      }

      resultado.innerHTML = `
        <div class="card">
          <h2>${data.title}</h2>
          <img src="${data.url}" alt="${data.title}">
          <p>${data.date}</p>
          <p>${data.explanation}</p>
        </div>
      `;
    })
    .catch(() => {
      mostrarError("No se pudo conectar con la API de la NASA.");
    });
}

function mostrarError(msg) {
  resultado.innerHTML = "";
  error.textContent = msg;
}

