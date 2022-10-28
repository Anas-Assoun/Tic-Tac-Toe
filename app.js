let canvas = document.querySelector('canvas');
let c = canvas.getContext("2d");

const size = {
    width: 180,
    height:180
}
canvas.width = size.width;
canvas.height = size.height;

const canvasOffset = {
    height: canvas.offsetTop,
    width: canvas.offsetLeft,
}

const xMark = document.querySelector('img[src="./assets/x.svg"]');
const oMark = document.querySelector('img[src="./assets/o.svg"]');

canvas. addEventListener('click', function() { 
    var clickeffect = new Audio('./assets/clickeffect.mp3');
    clickeffect.play();
}, false);

