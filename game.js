//CANVAS
//modificación del canvas a partir de js

const canvas = document.querySelector('#game');
//tengo que acceder  los métodos para dibujar en el canvas y eso lo hacemos con:
const game = canvas.getContext('2d'); //para decirle que olo tenemos dos coordenadas

let canvasSize;
let elementsSize;

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
    elementsSize = canvasSize / 10; //para darle el valor del 10% en un canvas de 100% y quepan 10 del 10%

    startGame();
};

function startGame() {

    game.font = elementsSize + 'px Poppins';// esto es para darle tamaño a los emojis
    game.textAlign = 'end'; //esto es para posicionar el elemento en la posición que nosotros queramos

    const map = maps[0]; //el número de aquí nos dice que mapas tenemos en el canvas, es decir, entra a la posición 0, 1 0 2 de maps en maps.js 
    const mapRow = map.trim().split('\n');// esto es para crear unn mapa más limpio. El .trim() nos elimina los espacios vacíos al inicio y final de cada row (nos lo limpia) y con el .split('\n') le estamos diciendo que haga un salto  de linea (creando un nuevo elemento) cuando aparezca el '\n'
    const mapRowColums = mapRow.map(row => row.trim().split(''));// aquí estamos creando un arreglo de cada row en el que le estamos diciendo que por cada row, sea cada una de ella, no solo un string y ya, sino que sea un arreglo donde cada letra es un elemento

    //el código a continuación, sustituye de una manera más legible el for
    mapRowColums.forEach((row, rowIndex) => {//con el método forEach recorremos el array mapRowColums y estamos enviando como parámetros las filas y el indice de cada fila
        row.forEach((colums, columsIndex) => {//a partir de cada fila anterior, estamos recorriendo las columnas para encontrar la columna y su índice
            const emoji = emojis[colums];// aquí estamos obteniendo el emoji por cada elemento de la columna que estemos leyendo en el código
            const positionX = elementsSize * (columsIndex + 1);
            const positionY = elementsSize * (rowIndex + 1);// las positionX y positionY nos dan las posiciones de cada uno de los emojis y a estos le sumamos 1 porque siempre empezamos a contar desde el 0 y los elementos, en este caso los emojis, sus inicios son el propio final del emoji, por tanto si queremos que aparezcan enteros tenemos que sumarle uno para que así estén en la posición visible. (Seria como empezar en la posición dos y acabar en la 1 ya que el inicio de la columna es el propio final del mismo) 
            game.fillText(emoji, positionX, positionY);
        });
    });

    // for (let i = 1; i <= 10; i++) { //el ciclo es para por los 10 elementos con menos código y empezamos con i = 1 para que nos de los 10 elementos y no 9 y un conjunto vacío que sería el 10
    //     for (let j = 1; j <= 10; j++){ //colocamos un for dentro de otro para tener las columsnas y filas a la vez
    //         // game.fillText(emojis['X'], elementsSizee * j, elementsSizee * i)//esto es para colocar el emoji que esté guardado como X y le estamos dando un posición elementSize y cada vez que añadimos un elemento lo corremos el elemento anterios tanto a la darecha (primer elementSize * i) como hacia abajo
    //         game.fillText(emojis[mapRowColums[i - 1][j - 1]], elementsSizee * j, elementsSizee * i);// lo que hacemos aquí es dar a cada elemento del mapa el emoji que le correponde y le estamos restando a i y j 1 porque aquí es donde deben empezar desde la posición cero y no desde la 1 como le habiamos dicho en los ciclos for
    //     };
    // };
};
