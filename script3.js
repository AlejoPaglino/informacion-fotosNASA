let contenedorImagen = document.querySelector(".contenedor")
let botonCantidad = document.querySelector("#botonCantidad")
let cantidadUsuario = document.querySelector("#cantidad")

botonCantidad.onclick = function () {
    console.log(cantidadUsuario.value)
    fetch (`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY=${key}&count=${cantidadUsuario.value}`)
    .then(res => res.json())
    .then(fotos => {
        contenedorImagen.innerHTML = ""
        for (let i = 0; i < fotos.length; i++) {
             contenedorImagen.innerHTML = `${contenedorImagen.innerHTML} <img scr="${fotos[i].url}" alt="${fotos[i].title}"`
    }
})
}

botonAleatoria.onclick = function() {
    limpiarContenedor();
    let fechaInicio = new Date(1995, 5, 16); 
    let fechaFin = new Date(); let fechaAleatoria = new Date(fechaInicio.getTime() + Math.random() * (fechaFin.getTime() - fechaInicio.getTime())); 
    let fechaFormateada = fechaAleatoria.toISOString().split('T')[0]; 
    fetch(`${urlBase}${clave}&date=${fechaFormateada}`) 
    .then(res => res.json()) 
    .then(data => { 
        if (data.media_type === "image") 
        { mostrarImagen(data.url, data.title); } 
        else { mostrarImagen('https://via.placeholder.com/800x600?text=Contenido+no+disponible', 'Contenido no disponible'); 
    } }) .catch(err => { 
        console.error("Error al obtener imagen aleatoria:", err); 
    }); 
};


