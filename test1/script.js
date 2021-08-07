const canBoard = document.getElementById("canvasSquare");
const canCtx = canBoard.getContext("2d");
const canX = canBoard.clientWidth / 2;
const canY = canBoard.clientHeight / 2;
const radBig = canBoard.clientWidth / 2.5;
const radSmall = canX / 8;
const multiplier = 1.2;
let posX = canBoard.clientWidth / 2;
let posY = canBoard.clientHeight / 2;
let X = 0;
let Y = 0;

drawCircle();
setTimeout(frameTime, 17);

function frameTime() {
    document.addEventListener("mousemove", direction);
}

function drawCircle() {
    canCtx.clearRect(0, 0, canX * 2, canY * 2);
    drawRange();
    canCtx.beginPath();
    canCtx.fillStyle = "rgba(0, 195, 255, 50%)";
    canCtx.arc(posX, posY, radSmall, 0, 2 * Math.PI, true);
    canCtx.fill();
    canCtx.closePath();
}

function drawRange() {
    canCtx.beginPath();
    canCtx.lineWidth = 5;
    canCtx.arc(canX, canY, radBig, 0, 2 * Math.PI, true);
    canCtx.strokeStyle = "rgb(0, 150, 255)";
    canCtx.stroke();
    canCtx.closePath();
}

function drawPsevdoRange() {
    canCtx.beginPath();
    canCtx.lineWidth = 2;
    canCtx.arc(canX, canY, radBig - radSmall, 0, 2 * Math.PI, true);
    canCtx.strokeStyle = "rgb(0, 0, 0)";
    canCtx.stroke();
    canCtx.closePath();
}


function direction(e) {

    if (Math.sqrt(Math.pow((posX - 500), 2) + Math.pow((posY - 500), 2)) < 400 - 125) {
        if (Math.sqrt(Math.pow((posX - e.offsetX), 2) + Math.pow((posY - e.offsetY), 2)) <= 70) {
            posY += (e.offsetY - Y);
            posX += (e.offsetX - X);
        }
    } else if (Math.sqrt(Math.pow(((posX + e.offsetX - X) - 500), 2) + Math.pow(((posY + e.offsetY - Y) - 500), 2)) < 400 - 67) {
        posY += (e.offsetY - Y);
        posX += (e.offsetX - X);
    }
    X = e.offsetX;
    Y = e.offsetY;
    drawRange();

    drawCircle();
}