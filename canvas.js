let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

mouseDown = false



//API
let tool = canvas.getContext("2d");

// Prerequestie of Canva API

// tool.strokeStyle = "yellow"; //fill desired color
// tool.lineWidth = "8"; //set your line weight

// tool.beginPath(); //start a new graphics
// tool.moveTo(10,10); //starting point
// tool.lineTo(1000,500); //ending point
// tool.stroke(); //fill color

tool.strokeStyle = "red";
tool.lineWidth = "3";

//mouseDown ---> Start a new path/graphics (beginPath() , moveTo())
//mouseMove ---> path fill (lineTo(), stroke())
//mouseUp ---> end the began path (lineTo());


canvas.addEventListener("mousedown",(e)=>{
    mouseDown = true;
    beginPath({
        x:e.clientX ,
        y:e.clientY 
    });
})

canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown){
        drawStroke({
            x:e.clientX ,
            y:e.clientY
        })
    }
    
})

canvas.addEventListener("mouseup" ,(e)=>{
    mouseDown = false;
})

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x ,strokeObj.y);
}

function drawStroke(strokeObj){
    tool.lineTo(strokeObj.x ,strokeObj.y);
    tool.stroke();
}



