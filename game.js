//CANVAS
//modificación del canvas a partir de js

const canvas = document.querySelector('#game');
//tengo que acceder  los métodos para dibujar en el canvas y eso lo hacemos con:
const game = canvas.getContext('2d'); //para decirle que olo tenemos dos coordenadas
//ahora creamos las const para los botones que me permitirán moverme por el canvas
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

let canvasSize;
let elementsSize;

//creamos una variable con dos posiciones para poder mover a nuestro humano por el campo de minas
//Recordemos!!! 
//Las variables tipo const no se pueden modificar sin embargo, en estas le estamos dando distintas posiiones dependiendo del y esto es posible gracias a que son objetos y son tratados de distinta manera a las const tipo numéricas o de strings
const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};
const enemiesPositions = [];

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

    //Método para borrar los emojis por donde ya habíamos pasado. Como en canvas no se puede eliminar un solo emoji, sino que tenemos que eliminar la capa en las que se encuenta, nuestra puerta de inicio también tendríamos que eliminarla y como no queremos eso, lo que vamos a hacer es borrar todo el canvas e inmediatamente crearlo todo de nuevo pero con la nueva posición
    game.clearRect(0,0, canvasSize, canvasSize);//esto es lo que nos permite borrar todo el canvas dándole como límites desde la posición inicial, la 0,0, hasta la final que es lo que mide el canvas, canvasSize, canvasSize.

    //el código a continuación, sustituye de una manera más legible el for
    mapRowColums.forEach((row, rowIndex) => {//con el método forEach recorremos el array mapRowColums y estamos enviando como parámetros las filas y el indice de cada fila
        row.forEach((colums, columsIndex) => {//a partir de cada fila anterior, estamos recorriendo las columnas para encontrar la columna y su índice
            const emoji = emojis[colums];// aquí estamos obteniendo el emoji por cada elemento de la columna que estemos leyendo en el código
            const positionX = elementsSize * (columsIndex + 1);
            const positionY = elementsSize * (rowIndex + 1);// las positionX y positionY nos dan las posiciones de cada uno de los emojis y a estos le sumamos 1 porque siempre empezamos a contar desde el 0 y los elementos, en este caso los emojis, sus inicios son el propio final del emoji, por tanto si queremos que aparezcan enteros tenemos que sumarle uno para que así estén en la posición visible. (Seria como empezar en la posición dos y acabar en la 1 ya que el inicio de la columna es el propio final del mismo) 
            
            if ( colums == 'O' ) {//condicional para colocar a nuestro jugador
                if (!playerPosition.x && !playerPosition.y) {//este segundo condicional nos sire para decir que si playerPosition es != a undefined, guarde esas variables cuando haga el clearRect
                    playerPosition.x = positionX;
                    playerPosition.y = positionY;
                    console.log({playerPosition});
                } else if ( colums == 'I' ) { //este segundo if es el que colocamos para cuando nuestro jugador se encuentre con el "regalio" del wc
                    giftPosition.x = positionX;
                    giftPosition.y = positionY;
                } else if ( colums == 'X' ) { //

                }
            };

            game.fillText(emoji, positionX, positionY);
        });

    });
    // for (let i = 1; i <= 10; i++) { //el ciclo es para por los 10 elementos con menos código y empezamos con i = 1 para que nos de los 10 elementos y no 9 y un conjunto vacío que sería el 10
    //     for (let j = 1; j <= 10; j++){ //colocamos un for dentro de otro para tener las columsnas y filas a la vez
    //         // game.fillText(emojis['X'], elementsSizee * j, elementsSizee * i)//esto es para colocar el emoji que esté guardado como X y le estamos dando un posición elementSize y cada vez que añadimos un elemento lo corremos el elemento anterios tanto a la darecha (primer elementSize * i) como hacia abajo
    //         game.fillText(emojis[mapRowColums[i - 1][j - 1]], elementsSizee * j, elementsSizee * i);// lo que hacemos aquí es dar a cada elemento del mapa el emoji que le correponde y le estamos restando a i y j 1 porque aquí es donde deben empezar desde la posición cero y no desde la 1 como le habiamos dicho en los ciclos for
    //     };
    // };
    movePlayer();
};

function movePlayer () { //renderizar a nuestro player
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

    //condicional para ver si hubo colision con la giftPosition
    //con tantos condicionales es probable que nos den muchos decimales y a la hora de encontrar la colisión puede que alguno de estos decimales no coincida y nos de un error aunqeu estemos colisionando, por ese motivo ponemos el método .toFixed() para que solo nos cuente los decimales que nosotros le pongamos en el método y no haya errores en el juego
    const giftColisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftColisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftColitions = giftColisionX && giftColisionY;

    if (giftColitions) {
        console.log('Te cagaste wei!😖');
    }
};

//funciones para que los botones duncionen
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
window.addEventListener('keydown', moveByKeys); //esto lo  que hace es escuchar al teclado cuando presionamos una tecla y lo mandamos a ejecutar la funcion moveByKeys

function moveUp() {
    if ((playerPosition.y -elementsSize) < elementsSize) { //esto nor permite no salirnos del canvas por la parte superior y lo que le decimos es que no puede ser mayor que el propio elemento porque sino se nos saldría
        console.warn('Te querés salir pelotudo? 😐');
    } else {
        console.log('ARRIBA');
        playerPosition.y -= elementsSize; //estamos diciendo que se mueva en la posición Y restándole lo que el propio elemento mide. Se lo restamois porque el 0,0 de nuestro canvas es el margen superior izquierda por tanto, en el primer mapa estamos en la posición x=0 e y= -(algo) y el wc está en la posición 0,0
        // movePlayer();//con esto lo que hacemos es renderizar el jugador cada vez que toquemos la tecla hacia arriba pero no nos borra lo anterior
        startGame();//con esta ahora que tenemos el clearRect() si vamos a eliminar nuestros pasos además de poder mover al jugador ya que la función anterior está dentro de startGame
    }
};
function moveDown() {
    if ((playerPosition.y + elementsSize) > canvasSize ){
        console.warn('Te querés salir pelotudo? 😐');
    } else {
        console.log('ABAJO');
        playerPosition.y += elementsSize;
        startGame();
    }
};
function moveLeft() {
    if ((playerPosition.x - elementsSize) < elementsSize) { //esto nor permite no salirnos del canvas por la parte superior y lo que le decimos es que no puede ser mayor que el propio elemento porque sino se nos saldría
        console.warn('Te querés salir pelotudo? 😐');
    } else {
        console.log('LEFT');
        playerPosition.x -= elementsSize;
        startGame();
    }
};
function moveRight() {
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.warn('Te querés salir pelotudo? 😐');
    } else {
        console.log('RIGHT');
        playerPosition.x += elementsSize;
        startGame();
    }
};
function moveByKeys(event) { //est ees el mismo código que el de abajo pero más estético y limpio (solo se puede usar en ocasiones muy específicas)
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
// function moveByKeys (event) {
//     if (event.key == 'ArrowUp') {
//         moveUp();
//     } else if (event.key == 'ArrowDown') {
//         moveDown();
//     } else if (event.key == 'ArrowLeft') {
//         moveLeft();
//     } else if (event.key == 'ArrowRight') {
//         moveRight();
//     } else {
//         console.warn('🤨 No estás entendiendo el juego...');
//     };
// };
}