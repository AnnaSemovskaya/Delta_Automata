
let canvas;
let ctx;

function initGame()
{
    canvas = document.getElementById("myGame");
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", myListener);
    myRect.x=250
    myRect.y=250
    myRect.redraw()
}

function myListener(ev) {
    if (ev.code=="ArrowRight"){
        go_right();
    }
}

function go_right() {
    myRect.x +=20
    myRect.redraw()
}


let myRect = {
    x: 250,
    y: 250,
    redraw: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y, 20, 20)
    }
    
}

