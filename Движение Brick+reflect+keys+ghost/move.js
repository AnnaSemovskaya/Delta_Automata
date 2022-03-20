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
const border_y_bottom = 480;

const ball_size = 30

let catcher_x;
let catcher_y;
let delta_catcher;

const catcher_size_x = 200;
const catcher_size_y = 20;

let enemy_x;
let enemy_y;
let enemy_size = 60;

//ой, что-то новое, это вообще про что?
let catcher_color_number = 0;
const CATCHER_COLORS = ["Blue", "Green", "Yellow", "Brown", "Cian"]

function initgame(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    count = 0;

    window.addEventListener("keydown", myListenerDown);
    window.addEventListener("keyup", myListenerUp)

//начальное положение ловушки
    catcher_x = Math.floor(Math.random() * 700)
    catcher_y = Math.floor(Math.random() * 200)
    delta_catcher = 0;
    drawCatcher(catcher_x, catcher_y);

//начальное положение мячика
    curr_x = start_x;
    curr_y = start_y;
    drawBall(curr_x, curr_y);
    document.getElementById("count").innerText = "Счёт: " + count;

//появился враг
    
    enemy_x = 300
    enemy_y = 300
    drawEnemy(enemy_x, enemy_y)
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

    ctx.fillStyle = CATCHER_COLORS[catcher_color_number]

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

function drawEnemy (x, y) {
   ctx.drawImage(document.getElementById('imgEnemy'), x, y) 
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCatcher(catcher_x, catcher_y)
    drawBall (curr_x, curr_y)
}

function Redraw() {
    
    if ( curr_x > border_x_right - ball_size || curr_x < border_x_left) {
        //Это мы отразились от правой или левой стенки
        delta_x *= -1 
    } else if (curr_y > border_y_bottom - ball_size ) {
        //Это мы отразились от дна
        delta_y +=-1  
    } else if (curr_y < border_y_top) { 
        //это мы впечатались в потолок, заканчиваем процесс, 
        //ставим ловушку на новое место       
        //а мячик на старое
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
        //это мы попали в ловушку
        count ++;  
        document.getElementById("count").innerText = "Счёт " + count;
        delta_y *= -1

        //хочу что-нибудь поменять
        justChangeSomething(curr_x - catcher_x)
    
    } else if (curr_x > enemy_x && curr_y > enemy_y && 
        curr_x < enemy_x + enemy_size && 
        curr_y < enemy_y + enemy_size) {
            //это мы не попали в ловушку, но попали в привидение и это плохо
        count = 0  
        curr_x = start_x
        curr_y = start_y
        delta_x = 0
        delta_y = 0
        delta_catcher = 0
        catcher_x = Math.floor(Math.random() * 700)
        catcher_y = Math.floor(Math.random() * 200)
        enemy_x = Math.floor(Math.random() * 870)
        enemy_x = Math.floor(Math.random() * 570)
        document.getElementById("message").innerText = "GAME OVER!";
        clearInterval(canvas.interval);
    }

    //стандартная прорисовка наших сдвинувшихся объектов
    curr_x += delta_x;
    curr_y += delta_y; 
    catcher_x += delta_catcher

    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawCatcher(catcher_x, catcher_y)
    drawBall (curr_x, curr_y)
    drawEnemy (enemy_x, enemy_y)
    
}

function justChangeSomething(x_in_catcher) {

    //Работа с массивами + целочисленная арифметика
    catcher_color_number ++
    catcher_color_number = catcher_color_number % CATCHER_COLORS.length

    let zone = Math.floor(x_in_catcher / (catcher_x / 5) ) //константы в коде! Опасно! 
        //Непонятные операторы -- тоже опасно
        //Плохой код!

    //const Zones_in_catcher = 5;
    //let size_of_zone = Math.floor (catcher_size_x / Zones_in_catcher)
    //let zone = Math.floor(x_in_catcher / size_of_zone)

    //Три способа сделать одно и то же

    if (zone == 0 ) {
        delta_x -= 4
    } else if (zone == 1 ) {
        delta_x -= 2
    } else if (zone == 3 ) {
        delta_x += 2
    } else if (zone == 4 ) {
        delta_x += 4
    } 

    switch (zone) {
        case 0:
            delta_x -= 4
            break;
        case 1:
            delta_x -= 2
            break;
        case 3:
            delta_x += 2
            break;
        case 4:
            delta_x += 4
            break;
    } 

    delta_x += -2 * (2 - zone)

}