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

const border_x_right = 900;
const border_x_left = 0;
const border_y_top = 0;
const border_y_bottom = 500;

const ball_size = 35

let catcher_x;
let catcher_y;
let delta_catcher;

const catcher_size_x = 200;
const catcher_size_y = 20;

function initgame(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    count = 0;

    window.addEventListener("keydown", myListenerDown);
    window.addEventListener("keyup", myListenerUp)

    catcher_x = Math.floor(Math.random() * 700)
    catcher_y = Math.floor(Math.random() * 200)
    delta_catcher = 0;
    drawCatcher(catcher_x, catcher_y);

    curr_x = start_x;
    curr_y = start_y;
    drawBall(curr_x, curr_y);
    document.getElementById("count").innerText = "Счёт: " + count;
}

function myListenerDown(ev) {
    
    if (ev.code=="ArrowRight"){
        delta_catcher = 5;
    } else if (ev.code=="ArrowLeft") {
        delta_catcher = -5;
    } else if (ev.code == "Space") {
        Start()
    }
}

function myListenerUp(ev) {
    
    if (ev.code=="ArrowRight" || ev.code=="ArrowLeft"){
        delta_catcher = 0
    } 
}

function drawCatcher(x, y) {
    ctx.fillStyle = "Blue"
    if (catcher_x + catcher_size_x > border_x_right) {
        catcher_x = border_x_right - catcher_size_x
        delta_catcher = 0
    } 
    if (catcher_x < border_x_left) {
        catcher_x = border_x_left
        delta_catcher = 0
    } 
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
       delta_y = -1
    }

    canvas.interval = setInterval(Redraw, STEP_TIME);
    document.getElementById("message").innerText = "GAME!";
}

function Stop() {
    clearInterval(canvas.interval);  
    curr_x = start_x
    curr_y = start_y  
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawCatcher(catcher_x, catcher_y)
    drawBall (curr_x, curr_y)
}

function Redraw() {

    if ( curr_x > border_x_right - ball_size || curr_x < border_x_left) {
        delta_x *= -1
    } else if (curr_y > border_y_bottom - ball_size ) {
        delta_y +=-1
    } else if (curr_y < border_y_top) {         
        curr_x = start_x
        curr_y = start_y
        delta_x = 0
        delta_y = 0
        delta_catcher = 0
        catcher_x = Math.floor(Math.random() * 700)
        catcher_y = Math.floor(Math.random() * 200)

        document.getElementById("message").innerText = "GOAL!";
        clearInterval(canvas.interval);

    } else if (curr_x > catcher_x && curr_y > catcher_y && 
        curr_x < catcher_x + catcher_size_x && 
        curr_y < catcher_y + catcher_size_y) {
        count ++;  
        document.getElementById("count").innerText = "Счёт " + count;
        delta_y *= -1
    
    } 

    curr_x += delta_x;
    curr_y += delta_y; 
    catcher_x += delta_catcher
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawCatcher(catcher_x, catcher_y)
    drawBall (curr_x, curr_y)
    
}