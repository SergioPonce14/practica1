# Memory Game

Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo
Abre index.html en el navegador (o con Live Server):
clica las cartas para darlas la vuelta y encuentra su pareja en el menor numero de intentos posibles,
una vez se encuentren todas las parejas de cartas se podrá jugar de nuevo

## Uso de IA
Usé Gemini  (en navegador) como pareja de programación, fase a fase.
Ejemplo de prompt real: "Ayúdame a crear una ventana emergente que muestre el numero de intentos realizados
 y un botón de reiniciar al encontrar todas las parejas de cartas".

fui verificando los cambios realizados probando el juego con la consola abierta para poder verificar
que cada carta se iba registrando correctamente, el contador de intentos se iba sumando y que al girar 
todas las cartas se supiese que había terminado

Escribí a mano: 
html y gran parte del json se escribieron a mano, la IA se encargó en gran parte del CSS y de ayudarme
a encontrar errores y posibles bugs dentro del juego


## Autopsia
1. No metí un addEventListener dentro de cada carta para evitar tener un gran numero de listeners,
   decidí meter un listener en el tablero que escuchase los clics de cada carta mediante evento.target

2.  En un principio decidí dejar el numero de columnas fijo en el css con `grid-template-columns: repeat(4, 100px)`
    conforme fuí desarrollando la web decidí que era buena idea añadir dificultades dentro de la web en las que el tablero
    fuera mas grande, por eso al final decidí calcular el numero de columnas dentro del javascript e inyectar el estilo 
    de la cuadrícula dinamicamente con `tablero.style.gridTemplateColumns`