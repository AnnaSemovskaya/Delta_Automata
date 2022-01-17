//const ARR_UP=0;
//const ARR_DOWN=1;
//const ARR_RIGHT=2;
//const ARR_LEFT=3;

//const ARR_SYG_RIGHT=0;
//const ARR_SYG_MIRROR=1;
//const ARR_SYG_LEFT=2;

let canvas;
let ctx;

const COLORS = ["green", "red", "blue", "orange", "yellow", "grey"]// "violet"];
//const RADIUSES = [10, 20, 30, 40, 50, 60, 70]
//let currentcolor;
//let currentradius;

function initGame()
{
    canvas = document.getElementById("myGame");
    ctx = canvas.getContext("2d");
}


function drawSomething() {


    ctx.fillStyle="lightblue"
    ctx.fillRect(200,20,100,50)

    ctx.beginPath()
    ctx.strokeStyle="red"
    ctx.lineWidth="5";
    ctx.lineStyle="solid"
    ctx.moveTo(200,200)
    ctx.lineTo(120,120)
    ctx.stroke();

    ctx.beginPath();
    for (i =0; i<6;i++) {
        ctx.strokeStyle = COLORS[i];
        ctx.beginPath();
        ctx.arc(70, 90, (i+1)*10, 0, Math.PI*2);
        ctx.stroke();
    }

}