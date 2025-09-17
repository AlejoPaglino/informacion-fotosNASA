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
