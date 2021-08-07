const board = document.getElementById("board");
const startMagic = document.getElementById("draw");
const startSorting = document.getElementById("sort")
const reLoad = document.getElementById("reload");
const boardMiddle = board.clientWidth / 2;

let countCircle = 0;
let radSmall = 0;
let arrBolls = [];
let arrRgb = [];

startMagic.onclick = startDraw;
startSorting.onclick = startSort;
reLoad.onclick = reloadPage;

function startDraw() {
    startMagic.disabled = true;
    startSorting.disabled = false;
    countCircle = document.getElementById("value").value;
    radSmall = (board.clientWidth / countCircle) / 2.15;
    if (radSmall > 80)
        radSmall = 80;
    for (let i = 0; i < countCircle; i++) {
        arrBolls[i] = new Circle(radSmall, {
            x: getRandomInt(0, board.clientWidth),
            y: getRandomInt(0, board.clientHeight)
        },
            '#' + (0x1000000 + (Math.random()) * 0xffff).toString(16).substr(1, 6), " ");
        arrBolls[i].draw();
        arrRgb.push(arrBolls[i].fill);
        arrRgb.sort();
    }
}

function startSort() {
    for (let j = 0; j < countCircle; j++) {
        for (let l = 0; l < countCircle; l++) {
            if (arrBolls[j].fill === arrRgb[l]) {
                drawTable(l, j);
            }
        }
    }
}

function drawTable(l, j) {
    let k = radSmall * 2;
    let len = (l + 1) * k;
    move(len, boardMiddle, j);

}

function move(x, y, i) {
    let circle = document.querySelectorAll("circle")[i];
    let newX = x - arrBolls[i].location.x;
    let newY = y - arrBolls[i].location.y;
    circle.style.setProperty('--x', `${newX}px`);
    circle.style.setProperty('--y', `${newY}px`);
    circle.style.transform = `translate(${newX}px, ${newY}px)`;
    circle.style.animation = 'moving 4s'

}

function Circle(radius = 10, location, fill = 'black', stroke = 'transparent') {
    this.radius = radius;
    this.location = location || { x: 100, y: 100 };
    this.fill = fill;
    this.stroke = stroke;
    this.draw = function () {
        board.innerHTML += `<circle cx="${this.location.x}" cy="${this.location.y}" 
        r="${this.radius}" fill="${this.fill}" stroke="${this.stroke}" />`;
    }
    this.translate = function (x, y) {
        this.location.x = x;
        this.location.y = y;
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateNum(m) {
    return Math.floor(Math.random() * m) + 1;
}

function reloadPage() {
    document.location.reload();
}