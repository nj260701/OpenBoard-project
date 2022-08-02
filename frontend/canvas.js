let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColorEle = document.querySelectorAll(".pencil-color");
let pencilWidthEle = document.querySelector(".pencil-width");
let eraserWidthEle = document.querySelector(".eraser-width");

let download = document.querySelector(".download");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo")

let pencilColor = "black";
let eraserColor = "white";
let pencilWidth = pencilWidthEle.value;
let eraserWidth = eraserWidthEle.value;

let undoRedoTracker = [];
let track = 0;

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

tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

//mouseDown ---> Start a new path/graphics (beginPath() , moveTo())
//mouseMove ---> path fill (lineTo(), stroke())
//mouseUp ---> end the began path (lineTo());


canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    beginPath({
        x: e.clientX,
        y: e.clientY
    });
})

canvas.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        drawStroke({
            x: e.clientX,
            y: e.clientY
        })
    }

})

canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;

    let trackObj = {
        trackValue:track,
        undoRedoTracker
    }

    undoRedoCanvas(trackObj);
})

undo.addEventListener("click" ,(e)=>{
    if(track > 0) track--;

    // track action

    let trackObj = {
        trackValue:track,
        undoRedoTracker
    }

    undoRedoCanvas(trackObj);

})

redo.addEventListener("click" ,(e)=>{
    if(track < undoRedoTracker.length-1) track++;

    // track action

    let trackObj = {
        trackValue:track,
        undoRedoTracker
    }

    undoRedoCanvas(trackObj);
})

function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
    let url = undoRedoTracker[track];

    let img = new Image(); //new image reference element
    img.src = url;
    img.onload = (e) =>{
        tool.drawImage(img, 0 , 0, canvas.width, canvas.height);
    }

}


function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

pencilColorEle.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        pencilColor = color;
        tool.strokeStyle = pencilColor;
        tool.lineWidth = pencilWidth
    })

})

pencilWidthEle.addEventListener("change", (e) => {
    pencilWidth = pencilWidthEle.value;
    tool.lineWidth = pencilWidth
    tool.strokeStyle = pencilColor
})

eraserWidthEle.addEventListener("change", (e) => {
    eraserWidth = eraserWidthEle.value;
    tool.lineWidth = eraserWidth;
    tool.strokeStyle = eraserColor;
})

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    } else {
        tool.strokeStyle = pencilColor;
        tool.lineWidth = pencilWidth;
    }
})

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "openBoard.jpg";
    a.click();
})

