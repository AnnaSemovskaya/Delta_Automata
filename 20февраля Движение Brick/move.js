const STEP_TIME=20;
let canvas;
let ctx;

const start_x = 450;
const start_y = 400;

let delta_x;
let delta_y;

let count;

let curr_x;
let curr_y;

const border_x_right = 880;
const border_x_left = 20;
const border_y = 20;

let catcher_x;
let catcher_y;
const catcher_size_x = 200;
const catcher_size_y = 20;

function initgame(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    count = 0;

    catcher_x = Math.floor(Math.random() * 700)
    catcher_y = Math.floor(Math.random() * 200)
    drawCatcher(catcher_x, catcher_y);

    curr_x = start_x;
    curr_y = start_y;
    drawBall(curr_x, curr_y);
}

function drawCatcher(x, y) {
    ctx.fillStyle = "Blue"
    ctx.fillRect(x, y, catcher_size_x, catcher_size_y) 
}

function drawBall (x, y) {

   ctx.drawImage(document.getElementById('imgBall'), x, y) 
}

function Start() {
    delta_x = Math.floor(Math.random() * 10) - 5
    delta_y = Math.floor(Math.random() * -10) 

    if (delta_x == 0 && delta_y == 0) {
       delta_x = 1 
    }

    canvas.interval = setInterval(Redraw, STEP_TIME);

}

function Redraw() {

    if ( curr_x > border_x_right || curr_x < border_x_left || curr_y < border_y ) {       
        clearInterval(canvas.interval);  
        curr_x = start_x
        curr_y = start_y
    } else if (curr_x > catcher_x && curr_y > catcher_y && 
        curr_x < catcher_x + catcher_size_x && curr_y < catcher_y + catcher_size_y) {
        count ++;  
        document.getElementById("count").innerText = count;
        clearInterval(canvas.interval);
        curr_x = start_x
        curr_y = start_y
        catcher_x = Math.floor(Math.random() * 700)
        catcher_y = Math.floor(Math.random() * 200)
    } else {
        curr_x += delta_x;
        curr_y += delta_y;       
    }
    ctx.clearRect(0,0, canvas.width, canvas.height)

    drawCatcher(catcher_x, catcher_y)
    drawBall (curr_x, curr_y)
    
}