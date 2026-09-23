
const simbolos = ['🚀', '🚀', '👽', '👽', '👾', '👾', '🤖', '🤖', '👻', '👻', '🍕', '🍕', '🎮', '🎮', '⚡', '⚡'];


const cartasBarajadas = simbolos.sort(() => Math.random() - 0.5);


const tablero = document.querySelector('#tablero');


function iniciarTablero() {
    cartasBarajadas.forEach((simbolo, indice) => {
        
        const carta = document.createElement('div');
        
        //  añadimos la clase de CSS
        carta.classList.add('carta');
        
        
        carta.dataset.valor = simbolo;
        
        // Insertamos el simbolo 
        carta.textContent = simbolo;
        
       
        tablero.appendChild(carta);
    });
}


iniciarTablero();

let primeraCarta = null;
let segundaCarta = null;



tablero.addEventListener('click', (evento) => {
    // elementio que ha sido clicado
    const cartaClicada = evento.target;

    // Comprobaciones 
    
    //carta ya girada 
    if (cartaClicada.classList.contains('volteada')) return; 
    // Ya hay dos cartas levantadas
    if (primeraCarta && segundaCarta) return; 
    // No se puede clicar la misma carta dos veces
    if (cartaClicada === primeraCarta) return; 

    // giiramos la carta
    cartaClicada.classList.add('volteada');

    
    if (!primeraCarta) {
        
        primeraCarta = cartaClicada;
    } else {
        
        segundaCarta = cartaClicada;
        
        console.log("Comprobando:", primeraCarta.dataset.valor, "y", segundaCarta.dataset.valor);
    }
});