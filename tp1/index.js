const linkEj1 = document.getElementById('ej1');
const linkEj2 = document.getElementById('ej2');
const linkEj3 = document.getElementById('ej3');
const linkEj4 = document.getElementById('ej4');
const linkEj5 = document.getElementById('ej5');
const linkEj6 = document.getElementById('ej6');

linkEj1.addEventListener('click', insertResult1);
linkEj2.addEventListener('click', insertResult2);
linkEj3.addEventListener('click', insertResult3);
linkEj4.addEventListener('click', insertResult4);
linkEj5.addEventListener('click', insertResult5);
linkEj6.addEventListener('click', insertResult6);

// Constants
const MATRIX_COLUMNS = 100;
const MATRIX_ROWS = 100;
const MATRIX_MAX_VALUE = 100;


function updateActiveStatus(index) {
    if (index === 1) {
        linkEj1.className = "active";
    } else {
        linkEj1.className = "";
    }

    if (index === 2) {
        linkEj2.className = "active";
    } else {
        linkEj2.className = "";
    }

    if (index === 3) {
        linkEj3.className = "active";
    } else {
        linkEj3.className = "";
    }

    if (index === 4) {
        linkEj4.className = "active";
    } else {
        linkEj4.className = "";
    }

    if (index === 5) {
        linkEj5.className = "active";
    } else {
        linkEj5.className = "";
    }

    if (index === 6) {
        linkEj6.className = "active";
    } else {
        linkEj6.className = "";
    }
}

/*
 *
 *
 *    Ejercicio 1
 *
 *
 */
function insertResult1() {
    const ej1Title = document.createElement('h4');
    ej1Title.textContent = "Javascript: Definir una matriz de 100 elementos x 100 elementos y completarla con valores enteros random, y resuelva los siguientes incisos:";

    const ej1Template = document.createElement('div');
    ej1Template.className = "templateUno";

    const matrixTemplate = document.createElement('div');
    matrixTemplate.className = "matrix";


    const matrix = [];
    for (let row = 0; row < MATRIX_ROWS; row++) {
        let newRow = [];
        const matrixRowTemplate = document.createElement('div');
        matrixRowTemplate.className = "matrixRow";
        for (let column = 0; column < MATRIX_COLUMNS; column++) {
            const newCell = Math.floor(Math.random() * MATRIX_MAX_VALUE);
            newRow.push(newCell);

            const matrixCellTemplate = document.createElement('div');
            matrixCellTemplate.className = "matrixCell";

            matrixCellTemplate.innerHTML = newCell;
            matrixRowTemplate.append(matrixCellTemplate);
        }
        matrix.push(newRow);
        matrixTemplate.append(matrixRowTemplate);
    }

    ej1Template.append(matrixTemplate);
    /*
     *
     *
     *    Ejercicio 1-a
     *
     *
     */
    const ej1Results = document.createElement('div');

    const ej1TextA = document.createElement('p');
    ej1TextA.textContent = "a. Escribir una función que retorne el valor máximo de toda la matriz";
    ej1Results.append(ej1TextA);

    // matrix map crea un arreglo con el maximo de cada fila
    const maxRow = matrix.map(function(row) {
        return Math.max.apply(Math, row);
    });
    // despues obtiene el maximo de maximos
    const max = Math.max.apply(null, maxRow);

    const ej1TextAResult = document.createElement('p');
    ej1TextAResult.textContent = "El valor máximo de toda la matriz es " + max;
    ej1Results.append(ej1TextAResult);
    /*
     *
     *
     *    Ejercicio 1-b
     *
     *
     */

    const ej1TextB = document.createElement('p');
    ej1TextB.textContent = "b. Escribir una función que retorne el valor máximo contenido en las filas pares y el valor mínimo en las filas impares. Por consola se pueden leer los valores de cada fila";
    ej1Results.append(ej1TextB);

    const maxPares = [];
    const minImpares = [];

    for (let row = 0; row < MATRIX_ROWS; row += 2) {
        maxPares.push(Math.max.apply(Math, matrix[row]));
    }
    console.log("Maximos de cada fila de pares:", maxPares);
    const maximoPares = Math.max.apply(null, maxPares);
    for (let row = 1; row < MATRIX_ROWS; row += 2) {
        minImpares.push(Math.min.apply(Math, matrix[row]))
    }
    const minimoImpares = Math.min.apply(null, minImpares);
    console.log("Minimos de cada fila de impares:", minImpares);

    const ej1TextBResult = document.createElement('p');
    ej1TextBResult.textContent = "El valor máximo contenido en las filas pares es " + maximoPares + " y El valor mínimo contenido en las filas impares es " + minimoImpares;
    ej1Results.append(ej1TextBResult);

    /*
     *
     *
     *    Ejercicio 1-c
     *
     *
     */
    const ej1TextC = document.createElement('p');
    ej1TextC.textContent = "c. Calcular el valor promedio de cada fila y guardarlos en un arreglo. Por consola se puede ver el arreglo";
    ej1Results.append(ej1TextC);

    const promedios = [];
    for (let row = 0; row < MATRIX_ROWS; row++) {
        let rowSum = 0;
        for (let column = 0; column < MATRIX_COLUMNS; column++) {
            rowSum += matrix[row][column];
        }
        promedios.push(rowSum / MATRIX_ROWS);
    }

    const ej1TextCResult = document.createElement('p');
    for (let index = 0; index < promedios.length; index++) {
        ej1TextCResult.textContent += promedios[index] + ",        ";
    }
    ej1Results.append(ej1TextCResult);
    console.log("Promedios: ", promedios);

    ej1Template.append(ej1Results);

    const container_block = document.getElementById('demoContainer');
    container_block.innerHTML = '';
    container_block.append(ej1Title);
    container_block.append(ej1Template);
    updateActiveStatus(1);
}

// Common canvas
const canvas = document.createElement('CANVAS');
const ctx = canvas.getContext('2d');
const canvasWidth = 800;
const canvasHeight = 400;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

/*
 *
 *
 *    Ejercicio 2
 *
 *
 */
function insertResult2() {
    const ej2Title = document.createElement('h4');
    ej2Title.textContent = "Pintar una región rectangular de un color utilizando el Contexto de HTML5.";

    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const container_block = document.getElementById('demoContainer');
    container_block.innerHTML = '';
    container_block.append(ej2Title);
    container_block.append(canvas);

    updateActiveStatus(2)
}

/*
 *
 *
 *    Ejercicio 3
 *
 *
 */

function setPixel(imageData, x, y, r, g, b, a) {
    const index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r; // R valor
    imageData.data[index + 1] = g; // G valor
    imageData.data[index + 2] = b; // B valor
    imageData.data[index + 3] = a; // A valor
}

function insertResult3() {
    const ej3Title = document.createElement('h4');
    ej3Title.textContent = "Pintar una región rectangular de un color utilizando la estructura de ImageData.";

    const imageData = ctx.createImageData(canvasWidth, canvasHeight);

    for (let row = 0; row < canvasWidth; row++) {
        for (let column = 0; column < canvasHeight; column++) {
            setPixel(imageData, row, column, 190, 0, 210, 255);
        }
    }

    ctx.putImageData(imageData, 0, 0);
    const container_block = document.getElementById('demoContainer');
    container_block.innerHTML = '';
    container_block.append(ej3Title);

    container_block.append(canvas);
    updateActiveStatus(3)
}


/*
 *
 *
 *    Ejercicio 4
 *
 *
 */
function insertResult4() {
    const ej4Title = document.createElement('h4');
    ej4Title.textContent = "Especificar la función para pintar un rectángulo utilizando un gradiente de la siguiente forma:";

    let BWgradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    BWgradient.addColorStop(0, "black");
    BWgradient.addColorStop(1, "white");
    ctx.fillStyle = BWgradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const container_block = document.getElementById('demoContainer');
    container_block.innerHTML = '';
    container_block.append(ej4Title);

    container_block.append(canvas);
    updateActiveStatus(4)

}

/*
 *
 *
 *    Ejercicio 5
 *
 *
 */
function insertResult5() {
    const ej5Title = document.createElement('h4');
    ej5Title.textContent = "Pintar un rectángulo en pantalla, utilizando un gradiente que vaya de negro a amarillo en la primera mitad del ancho del rectángulo, y de amarillo a rojo, en la segunda mitad. Por otro lado, en Y el degrade se mantiene constante.";

    let multiGradient = ctx.createLinearGradient(0, 0, canvasWidth, 0);
    multiGradient.addColorStop(0, "black");
    multiGradient.addColorStop(0.5, "yellow");
    multiGradient.addColorStop(1, "red");
    ctx.fillStyle = multiGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const container_block = document.getElementById('demoContainer');
    container_block.innerHTML = '';
    container_block.append(ej5Title);

    container_block.append(canvas);
    updateActiveStatus(5)
}

/*
 *
 *
 *    Ejercicio 6
 *
 *
 */
function insertResult6() {
   const ej6Title = document.createElement('h4');
    ej6Title.textContent = "Cargar una Imagen desde disco o URL. Dibujar la imagen dentro del canvas e Implementar una función que aplique el filtro de escala de grises y muestre el resultado en el canvas";

    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    }
    img.src = 'sunset.jpg';

    const buttonChange = document.createElement('button');
    buttonChange.innerHTML = "Black and white"
    buttonChange.addEventListener('click', function() { blackAndWhite() });

    const container_block = document.getElementById('demoContainer');
    container_block.innerHTML = '';
    container_block.append(ej6Title);

    container_block.append(canvas);
    container_block.append(buttonChange);
    updateActiveStatus(6)
}

// b. Implementar una función que aplique el filtro de escala de grises y muestre el resultado en el
//canvas.
function blackAndWhite() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {

            let r = getRed(imageData, x, y);
            let g = getGreen(imageData, x, y);
            let b = getBlue(imageData, x, y);

            let gris = (r + g + b) / 3;

            setPixel(imageData, x, y, gris, gris, gris, 255);
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function getRed(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
}

function getGreen(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
}

function getBlue(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
}


insertResult1();