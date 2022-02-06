const ARR_UP=0;
const ARR_DOWN=1;
const ARR_RIGHT=2;
const ARR_LEFT=3;

const ARR_SYG_RIGHT=0;
const ARR_SYG_MIRROR=1;
const ARR_SYG_LEFT=2;

let canvas;
let ctx;

function initGame()
{
    arrow.arrow_direction=ARR_UP
    document.getElementById("arrow_direction_status").innerHTML="Сейчас стрелочка смотрит вверх"
    canvas = document.getElementById("myGame");
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", myListener);
    drawArrow(ARR_UP);
}

function myListener(ev) {
    if (ev.code=="ArrowRight"){
        button_right();
    } else if (ev.code=="ArrowLeft") {
        button_left();
    }
}

function button_right() {
    arrow.change_direction(ARR_SYG_RIGHT)
}

function button_left() {
    arrow.change_direction(ARR_SYG_LEFT)
}
function button_mirror() {
    arrow.change_direction(ARR_SYG_MIRROR)
}


let arrow = {
    arrow_direction: ARR_UP,
    change_direction : function(sygnal) {

        if(this.arrow_direction==ARR_UP && sygnal==ARR_SYG_RIGHT) {
            this.arrow_direction=ARR_RIGHT
        }

        else if(this.arrow_direction==ARR_UP && sygnal==ARR_SYG_LEFT) {
            this.arrow_direction=ARR_LEFT
        }

        else if(this.arrow_direction==ARR_UP && sygnal==ARR_SYG_MIRROR) {
            this.arrow_direction=ARR_DOWN
        }

        else if(this.arrow_direction==ARR_DOWN && sygnal==ARR_SYG_RIGHT) {
            this.arrow_direction=ARR_LEFT
        }
        else if(this.arrow_direction==ARR_DOWN && sygnal==ARR_SYG_LEFT) {
            this.arrow_direction=ARR_RIGHT
        }
        else if(this.arrow_direction==ARR_DOWN && sygnal==ARR_SYG_MIRROR) {
            this.arrow_direction=ARR_UP
        }

        else if(this.arrow_direction==ARR_LEFT && sygnal==ARR_SYG_RIGHT) {
            this.arrow_direction=ARR_UP
        }
        else if(this.arrow_direction==ARR_LEFT && sygnal==ARR_SYG_LEFT) {
            this.arrow_direction=ARR_DOWN
        }
        else if(this.arrow_direction==ARR_LEFT && sygnal==ARR_SYG_MIRROR) {
            this.arrow_direction=ARR_RIGHT
        }

        else if(this.arrow_direction==ARR_RIGHT && sygnal==ARR_SYG_RIGHT) {
            this.arrow_direction=ARR_DOWN
        }
        else if(this.arrow_direction==ARR_RIGHT && sygnal==ARR_SYG_LEFT) {
            this.arrow_direction=ARR_UP
        }
        else if(this.arrow_direction==ARR_RIGHT && sygnal==ARR_SYG_MIRROR) {
            this.arrow_direction=ARR_LEFT
        }

        let myText=""
        switch (this.arrow_direction) {
            case ARR_UP:
                myText="Сейчас стрелочка смотрит вверх"
                break;
            case ARR_DOWN:
                myText="Сейчас стрелочка смотрит вниз"
                break;
            case ARR_RIGHT:
                myText="Сейчас стрелочка смотрит направо"
                break;
            case ARR_LEFT:
                myText="Сейчас стрелочка смотрит налево"
                break;
        }
        document.getElementById("arrow_direction_status").innerHTML = myText
        drawArrow(this.arrow_direction);
    }
}

function drawArrow(dir) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (dir)
    {
        case ARR_UP:
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(250, 400);
            ctx.lineTo(250, 100);
            ctx.lineTo(200, 150);
            ctx.moveTo(250, 100);
            ctx.lineTo(300, 150);
            ctx.stroke();
            break;
        case ARR_LEFT:
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(400, 250);
            ctx.lineTo(100, 250);
            ctx.lineTo(150, 200);
            ctx.moveTo(100, 250);
            ctx.lineTo(150, 300);
            ctx.stroke();
            break;
        case ARR_DOWN:
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(250, 100);
            ctx.lineTo(250, 400);
            ctx.lineTo(200, 350);
            ctx.moveTo(250, 400);
            ctx.lineTo(300, 350);
            ctx.stroke();
            break;
        case ARR_RIGHT:
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(100, 250);
            ctx.lineTo(400, 250);
            ctx.lineTo(350, 200);
            ctx.moveTo(400, 250);
            ctx.lineTo(350, 300);
            ctx.stroke();
            break;
    }
}