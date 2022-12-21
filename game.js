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
};

