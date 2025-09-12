document.addEventListener("DOMContentLoaded", () => {
    const fechaInicio = document.getElementById("fechaInicio");
    const fechaFin = document.getElementById("fechaFin");
    const buscarBtn = document.getElementById("buscarBtn");
    const resultado = document.getElementById("resultado");
    const error = document.getElementById("error");
  
    // Establecer la fecha máxima como hoy
    const hoy = new Date().toISOString().split("T")[0];
    fechaInicio.max = hoy;
    fechaFin.max = hoy;
  
    buscarBtn.addEventListener("click", async () => {
      const inicio = fechaInicio.value;
      const fin = fechaFin.value;
  
      resultado.innerHTML = "";
      error.textContent = "";
  
      if (!inicio || !fin) {
        error.textContent = "Por favor selecciona ambas fechas.";
        return;
      }
  
      if (inicio > fin) {
        error.textContent = "La fecha de inicio no puede ser después de la fecha de fin.";
        return;
      }
  
      try {
        const apiKey = "DEMO_KEY"; // Reemplaza con tu propia API Key si tienes una
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${inicio}&end_date=${fin}`;
  
        const response = await fetch(url);
        const data = await response.json();
  
        if (data.error) {
          error.textContent = data.error.message;
          return;
        }
  
        data.forEach(item => {
          if (item.media_type === "image") {
            const div = document.createElement("div");
            div.classList.add("foto");
  
            div.innerHTML = `
              <h3>${item.title} (${item.date})</h3>
              <img src="${item.url}" alt="${item.title}">
              <p>${item.explanation}</p>
            `;
  
            resultado.appendChild(div);
          }
        });
  
        if (resultado.innerHTML === "") {
          error.textContent = "No se encontraron imágenes en esas fechas.";
        }
  
      } catch (e) {
        console.error(e);
        error.textContent = "Ocurrió un error al obtener los datos.";
      }
    });
  });