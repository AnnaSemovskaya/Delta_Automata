const STEP_TIME=20;
let canvas;
let ctx;

const start_x = 450;
const start_y = 400;

let delta_x;
let delta_y;


let curr_x;
let curr_y;

const border_x_right = 870;
const border_x_left = 0;
const border_y_top = 0;
const border_y_bottom = 470;


function initgame(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    curr_x = start_x;
    curr_y = start_y;
    drawBall(curr_x, curr_y);
}


function drawBall (x, y) {

   ctx.drawImage(document.getElementById('imgBall'), x, y) 
}

function Start() {

    curr_x = start_x;
    curr_y = start_y;
    delta_x = Math.floor(Math.random() * 10) - 5
    delta_y = Math.floor(Math.random() * -10) 

    if (delta_x == 0 && delta_y == 0) {
       delta_x = 1 
    }

    canvas.interval = setInterval(Redraw, STEP_TIME);

}

function Stop() {

    clearInterval(canvas.interval); 
    
}

function Redraw() {

    if ( curr_x > border_x_right || curr_x < border_x_left ) {       
        delta_x *= -1
    } else if (curr_y > border_y_bottom || curr_y < border_y_top)  {
        delta_y *=-1 
    }
    
    curr_x += delta_x;
    curr_y += delta_y;       
    
    ctx.clearRect(0,0, canvas.width, canvas.height)

    drawBall (curr_x, curr_y)
    
}