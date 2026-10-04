const bancoSimbolos = ['🚀', '👽', '👾', '🤖', '👻', '🍕', '🎮', '⚡', '🌟', '🍄', '🍎', '🐱', '🐶', '🚗', '🎈', '💎'];


let cartasBarajadas = [];
let paresActuales = 8; 

const tablero = document.querySelector('#tablero');
const modal = document.querySelector('#victoria');
const textoIntentos = document.querySelector('#numIntentos');
const btnReiniciar = document.querySelector('#btnReiniciar');
const controlesDificultad = document.querySelector('#controles'); 


function iniciarTablero() {
    tablero.innerHTML = ''; 

   
    const seleccion = bancoSimbolos.slice(0, paresActuales);
   // Duplicamos los símbolos para tener parejas
    const simbolosJuego = [...seleccion, ...seleccion];

    cartasBarajadas = simbolosJuego.sort(() => Math.random() - 0.5);

    // Calcular columnas
    
    let columnas = 4; 
    if (cartasBarajadas.length > 16) columnas = 5; 
    if (cartasBarajadas.length > 20) columnas = 6; 
    
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 100px)`;

    cartasBarajadas.forEach((simbolo) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.valor = simbolo;
        carta.textContent = simbolo;
        tablero.appendChild(carta);
    });
}


controlesDificultad.addEventListener('click', (evento) => {

    if (evento.target.classList.contains('btnDificultad')) {
        // Actualizamos la variable global paresActuales según el botón clicado
        paresActuales = parseInt(evento.target.dataset.pares);
        reiniciarJuego();
    }
});

// Arrancamos el primer tablero
iniciarTablero();

let primeraCarta = null;
let segundaCarta = null;
let intentos = 0;
tablero.addEventListener('click', (evento) => {
    const cartaClicada = evento.target;

    // Comprobaciones 
    if (!cartaClicada.classList.contains('carta')) return;
    if (cartaClicada.classList.contains('volteada')) return; 
    // Si ya hay dos cartas giradas, no hacer nada
    if (primeraCarta && segundaCarta) return; 
    if (cartaClicada === primeraCarta) return; 

    // Giramos la carta
    cartaClicada.classList.add('volteada');

    if (!primeraCarta) {
        primeraCarta = cartaClicada;
    } else {
        segundaCarta = cartaClicada;
        
        intentos++; 
        
        if (primeraCarta.dataset.valor === segundaCarta.dataset.valor) {
            primeraCarta = null;
            segundaCarta = null;
            
            if (document.querySelectorAll('.volteada').length === cartasBarajadas.length) {
                setTimeout(() => {
                    mostrarVentanaVictoria();
                }, 500); 
            }
        } else {
            // girar si no son iguales al pasar 1 segundo con un setTimeout
            setTimeout(() => {
                primeraCarta.classList.remove('volteada');
                segundaCarta.classList.remove('volteada');
                primeraCarta = null;
                segundaCarta = null;
            }, 1000);
        }
    }
});

function mostrarVentanaVictoria() {
    textoIntentos.textContent = intentos;
    modal.classList.remove('oculto');
}

btnReiniciar.addEventListener('click', () => {
    modal.classList.add('oculto');
    reiniciarJuego();
});

function reiniciarJuego() {
    intentos = 0;
    primeraCarta = null;
    segundaCarta = null;
    iniciarTablero(); 
}

document.addEventListener('keydown', (evento) => {
    if (evento.key.toLowerCase() === 'n') {

        // classList.toggle añade la clase si no esta, y la quita si ya esta
        document.body.classList.toggle('modo-oscuro');
    }
});