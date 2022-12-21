//CANVAS
//modificación del canvas a partir de js
const canvas = document.querySelector('#game');
//tengo que acceder  los métodos para dibujar en el canvas y eso lo acemos con:
const game = canvas.getContext('2d'); //para decirle que olo tenemos dos coordenadas

window.addEventListener('load', startGame); //esta linea nos dice que a venas la pantalla carge (load) inicialice la función startGame

function startGame() {
    //Métodos para dibujar en canvas
    // game.fillRect(0, 0, 100, 100); //crea un objeto en el canvas dependiendo la longitud que nosotros le demos. Los dos primeros ceros son las posiciones, X e Y, y los dos últimos son las dimensiones en los ejes respectivos a las posiciones
    // game.clearRect(0, 0, 0, 0); //borra el elemento que hayamos creado con el método anterior y las coordenadas funcionan igual que el anterior
    // game.fillText('MrJark', 65, 55); //para poner el texto que queremos y su posición
    // game.fillStyle = 'purple'; //para poner el color del texto
    // game.font = '20px Poppins'; //para poner la font
    // game.textAlign = 'center'; // de dónde queremos que parta nuestro texto (respeta el .fillText() )

    //Definición del tamaño del canvas y sus contenidos (responsive)
    // window.innerHeight
    // window.innerWidth
    //estos dos métodos anteriores son los que me dan la medida éxta de mi html, no dependen del dispositivo sino de la pnatalla en sí, porque podemos estar en Mac y tener abierta la consola y por tanto no es Mac, sino el tamaño del html. Es el window el que me modifica el height o el width

    let canvasSize;

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75; //ojo a los puntos, si ponemos comas no funciona
    } else {
        canvasSize = window.innerHeight * 0.75;
    }// este condicional nos hace que cuando la vertical del html sea mayor que el ancho, tome como referencia para calcular el tamaño del canvas el ancho ya que es el más pequeño y es el que será responsive y viceversa con el else.
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    //calculo del ancho y alto de los elementos a partir del ancho y alto del canvas (grilla de 10x10) por tanto necesitamos que nuestros objetos midan 10px para que quepan 10 por fila y columna
    const elementsSizee = canvasSize / 10; //para darle el valor del 10% en un canvas de 100% y quepan 10 del 10%
    game.font = elementsSizee + 'px Poppins';// esto es para darle tamaño a los emojis
    game.textAlign = 'end'; //esto es para posicionar el elemento en la posición que nosotros queramos
    for (let i = 1; i <= 10; i++) { //el ciclo es para por los 10 elementos con menos código y empezamos con i = 1 para que nos de los 10 elementos y no 9 y un conjunto vacío que sería el 10
        game.fillText(emojis['X'], elementsSizee, elementsSizee * i)//esto es para colocar el emoji que esté guardado como X y le estamos dando un posición elementSize y cada vez que añadimos un elemento lo corremos el elemento anterios tanto a la darecha (primer elementSize * i) como hacia abajo
        
    }



};

