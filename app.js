
 const simbolos = ['🚀', '🚀', '👽', '👽', '👾', '👾', '🤖', '🤖', '👻', '👻', '🍕', '🍕', '🎮', '🎮', '⚡', '⚡'];
//const simbolos = ['🚀', '🚀'];

const cartasBarajadas = simbolos.sort(() => Math.random() - 0.5);

const tablero = document.querySelector('#tablero');
const modal = document.querySelector('#victoria');
const textoIntentos = document.querySelector('#numIntentos');
const btnReiniciar = document.querySelector('#btnReiniciar');

function iniciarTablero() {
    tablero.innerHTML = ''; 

    cartasBarajadas.forEach((simbolo, indice) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.valor = simbolo;
        carta.textContent = simbolo;
        tablero.appendChild(carta);
    });
}

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
        
        console.log("Comprobando:", primeraCarta.dataset.valor, "y", segundaCarta.dataset.valor);
        if (primeraCarta.dataset.valor === segundaCarta.dataset.valor) {
            console.log("Bien!");
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
    cartasBarajadas.sort(() => Math.random() - 0.5);
    iniciarTablero();
}