let fotos = document.querySelector('#fotos')
let titulo = document.querySelector(`#titulo`)
let dia = document.querySelector(`#dia`)
console.log('hola')
fetch('https://api.nasa.gov/planetary/apod?api_key=Xecgl1F8ZtSq9Z0e28gZDIyBneU72EkBSA5hbAMb&count=1')
.then(res=>res.json())
.then(datos => {
     fotos.src = datos[0].url
     titulo.textContent = datos[0].title
     dia.textContent = datos[0].date
     console.log(datos)
})