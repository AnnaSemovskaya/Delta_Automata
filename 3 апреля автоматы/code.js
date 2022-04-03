"use strict"

let myInterval;
const STEP_TIME = 100;

let canvas;
let ctx;

const ALIVE = "green";
const DEAD = "white";

const DIFFUSION_DENSITY=0.6;

const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;
const LOG_WIDTH = 45;
const LOG_HEIGHT = 25;

let currentrow;
let game_field = [];

let Selected_color_number = 0;

let game_started;

function initgame() {

    game_started = false
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    currentrow = 0;
    for(let i=0; i<LOG_HEIGHT; i++)
    {
        game_field[i]=[];
        for(let j=0; j<LOG_WIDTH; j++)
        {
            game_field[i][j]=DEAD;
        }
    }
    
    canvas.addEventListener("click", function(e) {
        setCellAlive(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    });

    drawfield();   
}


function drawfield()
{

    for(let i=0; i<LOG_HEIGHT; i++)
    {
        for(let j=0; j<LOG_WIDTH; j++)
        {
            ctx.fillStyle=game_field[i][j];
            ctx.fillRect(j*CELL_WIDTH+1, i*CELL_HEIGHT+1, CELL_WIDTH-1, CELL_HEIGHT-1);
        }
    }
    
}

function start_stop() {
    if ( ! game_started) {
        game_started = ! game_started
        document.getElementById("StartStop").innerText = "СТОП";
        canvas.interval = setInterval(step, STEP_TIME);       
    } else {
        clearInterval(canvas.interval);
        game_started = !game_started
        document.getElementById("StartStop").innerText = "СТАРТ";
    } 
} 

function clearall() {

    if (game_started) {
        clearInterval(canvas.interval);
    }
    game_started = false
    document.getElementById("StartStop").innerText = "СТАРТ";
    currentrow = 0;
    for(let i=0; i<LOG_HEIGHT; i++)
    {
        game_field[i]=[];
        for(let j=0; j<LOG_WIDTH; j++)
        {
            game_field[i][j]=DEAD;
        }
    }
    drawfield(); 
}


function step() {
    if (currentrow == LOG_HEIGHT - 1) {
        alert ("Извините, придётся начать сначала")
        clearall()
    } else {

        let nextrow = currentrow + 1

        for(let j = 0; j < LOG_WIDTH; j++)
        {   
            game_field[nextrow][j] = rule(currentrow, j);   
        }

        drawfield();
        currentrow ++
    }
}

function rule(i,j) {
    return rule22(i,j)
}


function rulemoveright(i,j) {

// основная функциональность прописана здесь
    let reslt = DEAD
    let me = game_field[i][j]
    let rightN = game_field[i][ (j + 1) % LOG_WIDTH ]
    let leftN = game_field[i][ (j + LOG_WIDTH - 1) % LOG_WIDTH ]
    reslt = leftN
    return (reslt);
}

function rulemoveleft(i,j) {

// основная функциональность прописана здесь
    let reslt = DEAD
    let me = game_field[i][j]
    let rightN = game_field[i][ (j + 1) % LOG_WIDTH ]
    let leftN = game_field[i][ (j + LOG_WIDTH - 1) % LOG_WIDTH ]
    reslt = rightN
    return (reslt);
}

function rule22(i,j) {

// основная функциональность прописана здесь
    let reslt = DEAD
    let me = game_field[i][j]
    let rightN = game_field[i][ (j + 1) % LOG_WIDTH ]
    let leftN = game_field[i][ (j + LOG_WIDTH - 1) % LOG_WIDTH ]

    if ((me == ALIVE && rightN == DEAD && leftN == DEAD) ||
        (me == DEAD && rightN == ALIVE && leftN == DEAD) ||
        (me == DEAD && rightN == DEAD && leftN == ALIVE) ) {
        reslt = ALIVE
    }
    return (reslt);
}


function rule193(i,j) {

// основная функциональность прописана здесь
    let reslt = DEAD
    let me = game_field[i][j]
    let rightN = game_field[i][ (j + 1) % LOG_WIDTH ]
    let leftN = game_field[i][ (j + LOG_WIDTH - 1) % LOG_WIDTH ]

    switch (me) {
        case ALIVE: 
            switch (leftN) {
                case ALIVE:
                    switch (rightN) {
                        case ALIVE:
                            reslt = ALIVE
                            break;
                
                        case DEAD:
                            reslt = ALIVE
                            break;
                    }
                    break;
                case DEAD:
                    switch (rightN) {
                        case ALIVE:
                            reslt = DEAD
                            break;
                        case DEAD:
                            reslt = DEAD
                            break;
                    }
                    break;
            }
            break;
        case DEAD:
            switch (leftN) {
                case ALIVE:
                    switch (rightN) {
                        case ALIVE:
                            reslt = DEAD
                            break;
                        case DEAD:
                            reslt = DEAD
                            break;
                    }
                    break;
                case DEAD:
                    switch (rightN) {
                        case ALIVE:
                            reslt = DEAD
                            break;
                        case DEAD:
                            reslt = ALIVE
                            break;
                    }
                    break;
            }
            break;
    }
    return (reslt);
}



function setCellAlive(x,y) {

    let i = Math.floor(y/CELL_HEIGHT);
    let j = Math.floor(x/CELL_WIDTH);

    if (game_field[i][j] == ALIVE) {
        game_field[i][j]  = DEAD;
    } else {
        game_field[i][j]  = ALIVE;
    }
    drawfield();

}

function set_primary_soup() {
    currentrow = 0
    for(let j=0; j<LOG_WIDTH; j++)
    {
        let rand = Math.random();
        let new_val = (rand < DIFFUSION_DENSITY) ? ALIVE : DEAD;
        game_field[0][j]=new_val;
    }
    
    for(let i = 1; i < LOG_HEIGHT; i++)
    {
        for(let j = 0; j < LOG_WIDTH; j++) {
            game_field[i][j] = DEAD;
        }
    }

    drawfield();

}


