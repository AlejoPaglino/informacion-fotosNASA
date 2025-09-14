const API_KEY = "DEMO_KEY";  
const fechaInicioInput = document.getElementById("fechaInicio");
const fechaFinInput = document.getElementById("fechaFin");
const buscarBtn = document.getElementById("buscarBtn");
const resultado = document.getElementById("resultado");
const error = document.getElementById("error");

// Limitar fechas al día actual
const hoy = new Date().toISOString().split("T")[0];
fechaInicioInput.max = hoy;
fechaFinInput.max = hoy;

buscarBtn.addEventListener("click", () => {
  const fechaInicio = fechaInicioInput.value;
  const fechaFin = fechaFinInput.value;

  if (!fechaInicio || !fechaFin) {
    mostrarError("Por favor, selecciona ambas fechas.");
    return;
  }

  if (fechaInicio > fechaFin) {
    mostrarError("La fecha de inicio no puede ser mayor que la fecha de fin.");
    return;
  }

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${fechaInicio}&end_date=${fechaFin}`;
  obtenerFotos(url);
});

function obtenerFotos(url) {
  resultado.innerHTML = "Cargando...";
  error.textContent = "";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      resultado.innerHTML = "";

      if (!Array.isArray(data)) {
        mostrarError("Esta fecha todavia no ha llegado.");
        return;
      }

      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = item.title;

        const date = document.createElement("p");
        date.textContent = item.date;

        let mediaElement;

        if (item.media_type === "image") {
          mediaElement = document.createElement("img");
          mediaElement.src = item.url;
          mediaElement.alt = item.title;
          mediaElement.style.maxWidth = "100%";
        } else if (item.media_type === "video") {
          mediaElement = document.createElement("iframe");
          mediaElement.src = item.url;
          mediaElement.width = "560";
          mediaElement.height = "315";
          mediaElement.allowFullscreen = true;
        }

        const explanation = document.createElement("p");
        explanation.textContent = item.explanation;

        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(mediaElement);
        card.appendChild(explanation);

        resultado.appendChild(card);
      });
    })
    .catch(() => {
      mostrarError("Error al conectar con la API de la NASA.");
    });
}

function mostrarError(msg) {
  resultado.innerHTML = "";
  error.textContent = msg;
}
