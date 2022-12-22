//CANVAS
//modificación del canvas a partir de js

const canvas = document.querySelector('#game');
//tengo que acceder  los métodos para dibujar en el canvas y eso lo hacemos con:
const game = canvas.getContext('2d'); //para decirle que olo tenemos dos coordenadas

let canvasSize;
let elementsSizee;

window.addEventListener('load', setCanvasSize); //esta linea nos dice que a venas la pantalla carge (load) inicialice la función startGame
window.addEventListener('resize', setCanvasSize); //este evento lo que nos hace es recargar la página cuando sufra nuestra pantalla un resize. Ya sea en portatil para abir la consola o en el móvil cuando giramos la pantalla. El problema de este es que tenemos que vincular al resize los elementos que ya estaban en la pantalla que ya automaticamente me los elimina todos

//creanos esta función dividiendo el código que estaba antes en startGame para que así esté todo más limpio y ordenado
function setCanvasSize () {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75; //ojo a los puntos, si ponemos comas no funciona
    } else {
        canvasSize = window.innerHeight * 0.75;
    }// este condicional nos hace que cuando la vertical del html sea mayor que el ancho, tome como referencia para calcular el tamaño del canvas el ancho ya que es el más pequeño y es el que será responsive y viceversa con el else.

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    //calculo del ancho y alto de los elementos a partir del ancho y alto del canvas (grilla de 10x10) por tanto necesitamos que nuestros objetos midan 10px para que quepan 10 por fila y columna
    elementsSizee = canvasSize / 10; //para darle el valor del 10% en un canvas de 100% y quepan 10 del 10%

    startGame();
};

function startGame() {
    // setCanvasSize();

    game.font = elementsSizee + 'px Poppins';// esto es para darle tamaño a los emojis
    game.textAlign = 'end'; //esto es para posicionar el elemento en la posición que nosotros queramos

    for (let i = 1; i <= 10; i++) { //el ciclo es para por los 10 elementos con menos código y empezamos con i = 1 para que nos de los 10 elementos y no 9 y un conjunto vacío que sería el 10
        for (let j = 1; j <= 10; j++){
            game.fillText(emojis['X'], elementsSizee * j, elementsSizee * i)//esto es para colocar el emoji que esté guardado como X y le estamos dando un posición elementSize y cada vez que añadimos un elemento lo corremos el elemento anterios tanto a la darecha (primer elementSize * i) como hacia abajo

        };
    };
};
