const STEP_TIME=100;
let canvas;
let ctx;

let curr_x;
let delta_x = 5;

function initgame(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    curr_x=100;
}

function Start() {

    canvas.interval = setInterval(Redraw, STEP_TIME);

}

function Stop() {

    clearInterval(canvas.interval);

}

function Turn() {

    delta_x = -delta_x
    
}

function Redraw() {
    if ( curr_x > 600 || curr_x < 20) {
        clearInterval(canvas.interval);
    } else {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.drawImage(document.getElementById('imgAngry'), curr_x, 100)
    }

    curr_x += delta_x;
}











