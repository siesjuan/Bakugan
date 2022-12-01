const seccionAtaque = document.getElementById("seleccion-ataque")
const seccionReiniciar = document.getElementById("seccion-reiniciar")
const botonBakugan = document.getElementById("boton-bakugan")
const botonPyrus = document.getElementById("boton-pyrus")
const botonAquos = document.getElementById("boton-aquos")
const botonSubterra = document.getElementById("boton-subterra")
const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionBakugan = document.getElementById("seleccion-bakugan")
const spanBakugan = document.getElementById("bakugan-jugador")
const spanBakuganEnemigo = document.getElementById("bakugan-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanvidasEnemigo = document.getElementById("vidas-enemigo")

const seccionMensaje = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-enemigo")

const contenedorTarjetas = document.getElementById("contenedorTarjetas")

let bakugans = []
let ataqueJugador
let ataqueEnemigo
let opcionBakugan
let inputBakugan1
let inputBakugan2
let inputBakugan3
let vidasJugador = 3
let vidasEnemigo = 3
let unidad = "g"

class Bakugan {
    constructor(nombre, img, vida) {
        this.nombre = nombre
        this.img = img
        this.vida = vida
        this.ataques = []
    }
}

let dragonoid = new Bakugan("Dragonoid", "./assets/bakugan-dragonoid.png", 5)
let preyas = new Bakugan("Preyas", "./assets/bakugan-preyas.png", 5)
let rexVulcan = new Bakugan("Rex-Vulcan", "./assets/bakugan-rex-vulcan.png", 5)

dragonoid.ataques.push(
    { nombre: "Flaming Uppercut 火", id: "boton-pyrus" },
    { nombre: "Wildfire 火", id: "boton-pyrus" },
    { nombre: "Burning Spite 火", id: "boton-pyrus" },
    { nombre: "Crushing Surf 水", id: "boton-aquos" },
    { nombre: "Bonecrusher 土", id: "boton-subterra" },
)

preyas.ataques.push(
    { nombre: "Crushing Surf 水", id: "boton-aquos" },
    { nombre: "Overflow 水", id: "boton-aquos" },
    { nombre: "Flash Flood 水", id: "boton-aquos" },
    { nombre: "Flaming Uppercut 火", id: "boton-pyrus" },
    { nombre: "Bonecrusher 土", id: "boton-subterra" },
)

rexVulcan.ataques.push(
    { nombre: "Bonecrusher 土", id: "boton-subterra" },
    { nombre: "Earthquake 土", id: "boton-subterra" },
    { nombre: "Earth Splitter 土", id: "boton-subterra" },
    { nombre: "Crushing Surf 水", id: "boton-aquos" },
    { nombre: "Flaming Uppercut 火", id: "boton-pyrus" },
)

bakugans.push(dragonoid,preyas,rexVulcan)

function iniciarJuego() {
    seccionAtaque.style.display = "none"
    seccionReiniciar.style.display = "none"

    bakugans.forEach((Bakugan) => {
        opcionBakugan = `
        <input type="radio" name="bakugan" class="inputCheck" id=${Bakugan.nombre} />
        <label class="tarjeta-bakugan" for=${Bakugan.nombre}>
            <p>${Bakugan.nombre}</p>
            <img src=${Bakugan.img} alt=${Bakugan.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionBakugan

        inputBakugan1 = document.getElementById("Dragonoid")
        inputBakugan2 = document.getElementById("Preyas")
        inputBakugan3 = document.getElementById("Rex-Vulcan")
    })

    botonBakugan.addEventListener("click", seleccionBakuganJugador)

    botonPyrus.addEventListener("click", ataquePyrus)
    botonAquos.addEventListener("click", ataqueAquos)
    botonSubterra.addEventListener("click", ataqueSubterra)

    botonReiniciar.addEventListener("click", reiniciarJuego)
}
function seleccionBakuganJugador() {
    seccionBakugan.style.display = "none"
    seccionAtaque.style.display = "flex"

    if(inputBakugan1.checked) {
        spanBakugan.innerHTML = "Dragonoid"
    } else if(inputBakugan2.checked) {
        spanBakugan.innerHTML = "Preyas"
    } else if(inputBakugan3.checked) {
        spanBakugan.innerHTML = "Rex-Vulcan"
    } else {
        alert("Por favor, selecciona un bakugan para poder luchar")
    }

    if(seleccionEnemigo(1, 3) == 1) {
        spanBakuganEnemigo.innerHTML = "Dragonoid"    
    } else if(seleccionEnemigo(1,3) == 2) {
        spanBakuganEnemigo.innerHTML = "Preyas"
    } else {
        spanBakuganEnemigo.innerHTML = "Rex-Vulcan"
    }
}
function seleccionEnemigo(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ataquePyrus() {
    ataqueJugador = "Flaming Uppercut 火"
    ataqueAleatorioEnemigo()
}
function ataqueAquos() {
    ataqueJugador = "Crushing Surf 水"
    ataqueAleatorioEnemigo()
}
function ataqueSubterra() {
    ataqueJugador = "Bonecrusher 土"
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo() {
    if(seleccionEnemigo(1, 3) == 1) {
        ataqueEnemigo = "Flaming Uppercut 火"
    } else if(seleccionEnemigo(1, 3) == 2) {
        ataqueEnemigo = "Crushing Surf 水"
    } else {
        ataqueEnemigo = "Bonecrusher 土"
    }

    combate()
}
function combate() {
    if(ataqueJugador == ataqueEnemigo) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == "Crushing Surf 水" && ataqueEnemigo == "Flaming Uppercut 火" || ataqueJugador == "Bonecrusher 土" && ataqueEnemigo == "Crushing Surf 水" || ataqueJugador == "Flaming Uppercut 火" && ataqueEnemigo == "Bonecrusher 土") {
        crearMensaje("La victoria es tuya")
        vidasEnemigo--
        spanvidasEnemigo.innerHTML = vidasEnemigo + unidad
    } else {
        crearMensaje("Has sido derrotado")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador + unidad
    }
    revisionVidas()
}
function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")

    seccionMensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo
    
    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}
function crearMensajeFinal(resultadoFinal) {
    seccionMensaje.innerHTML = resultadoFinal

    botonPyrus.disabled = true
    botonAquos.disabled = true
    botonSubterra.disabled = true

    seccionReiniciar.style.display = "block"
}
function revisionVidas() {
    if(vidasJugador == 0) {
        crearMensajeFinal("Tu Bakugan ha sido derrotado, mejor suerte la proxima")
    } else if(vidasEnemigo == 0) {
        crearMensajeFinal("Felicidades jugador, la victoria es tuya")
    }
}
function reiniciarJuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego)