const STEP_TIME=100;
let canvas;
let ctx;
let curr_x;

function initgame(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
}

function Start() {

    curr_x=100;
    canvas.interval = setInterval(Redraw, STEP_TIME);

}

function Stop() {

    clearInterval(canvas.interval);

}

function Redraw() {
    if ( curr_x>600 ) {
        clearInterval(canvas.interval);
    } else {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.drawImage(document.getElementById('imgAngry'), curr_x, 100)
    }


    curr_x+=5;
}