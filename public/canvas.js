const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Convas API used to interace with board
let tool = canvas.getContext("2d");

// control pencil and eraser width
const pencilColorElements = document.querySelectorAll(".pencil-color");
const pencilWidthControl = document.querySelector(".pencil-width-control");
const eraserWidthControl = document.querySelector(".eraser-width-control");

let mouseDown = false;
let pencilColor = "black";
let pencilWidth = pencilWidthControl.value;
let eraserColor = "white";
let eraserWidth = eraserWidthControl.value;

let undoRedoTracker = []; //Data
let track = 0; // Represent which action from tracker array

tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

// <-------------------------------------- pencil control start -------------------------------------->
pencilColorElements.forEach((element) => {
    element.addEventListener("click", (e) => {
        const color = element.classList[0];
        pencilColor = color;
        tool.strokeStyle = pencilColor;
        activateColor(color);
        // console.log(element.children[0])
    });
});

// function takes selected color and activate selected color
function activateColor(color) {
    // select all color containers
    const colorContainers = document.querySelectorAll(".pencil-color");

    colorContainers.forEach((element) => {
        // activate selected color
        if (element.classList[0] === color) {
            element.children[0].classList.add("active-color");
        }
        // unactive other colors
        else {
            element.children[0].classList.remove("active-color");
        }
    });
}

pencilWidthControl.addEventListener("change", (e) => {
    pencilWidth = pencilWidthControl.value;
    tool.lineWidth = pencilWidth;
});
// <-------------------------------------- pencil control end -------------------------------------->

// <-------------------------------------- eraser control start -------------------------------------->
toolEraser.addEventListener("click", () => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    } else {
        tool.strokeStyle = pencilColor;
        tool.lineWidth = pencilWidth;
    }
});
eraserWidthControl.addEventListener("change", (e) => {
    eraserWidth = eraserWidthControl.value;
    tool.lineWidth = eraserWidth;
});
// <-------------------------------------- eraser control end -------------------------------------->

// <-------------------------------------- draw control start -------------------------------------->
// mousedown -> start new path
canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;

    const data = {
        x: e.clientX,
        y: e.clientY,
    };
    socket.emit("beginPath", data);

    // beginPath(e);
});

// mousemove -> fill path
canvas.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        const data = {
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag ? eraserColor : pencilColor,
            width: eraserFlag ? eraserWidth : pencilWidth,
        };
        // tool.lineTo(event.x, event.y);
        // tool.stroke();
        socket.emit("drawPath", data);
    }

    // draw(e);
});

// mouseup -> end path
canvas.addEventListener("mouseup", (e) => {
    endPath();
});

function startPath(event) {
    tool.beginPath(); // start new path
    tool.moveTo(event.x, event.y); // set [start, end] axis on board
}

function draw(data) {
    tool.strokeStyle = data.color;
    tool.lineWidth = data.width;
    tool.lineTo(data.x, data.y);
    tool.stroke();
}

function endPath() {
    mouseDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;
}

toolPencil.addEventListener("click", () => {
    pencilFlag = true;
    eraserFlag = false;
    tool.strokeStyle = pencilColor;
    tool.lineWidth = pencilWidth;
});
// <-------------------------------------- draw control end -------------------------------------->

// <-------------------------------------- download control start -------------------------------------->

toolDownload.addEventListener("click", () => {
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
});

// <-------------------------------------- download control end -------------------------------------->

// <-------------------------------------- undo-redo control end -------------------------------------->
toolUndo.addEventListener("click", () => {
    // console.log("undoclicked", undoRedoTracker, track)
    if (track <= 0) return;
    track--;

    let data = {
        track,
        undoRedoTracker,
    };
    socket.emit("undoRedo", data);
    // undoRedoCanvas(data);
});

toolRedo.addEventListener("click", () => {
    // console.log("redoclicked", undoRedoTracker, track)
    if (track >= undoRedoTracker.length) return;
    track++;
    let data = {
        track,
        undoRedoTracker,
    };
    socket.emit("undoRedo", data);
    // undoRedoCanvas(data);
});

function undoRedoCanvas(trackObj) {
    track = trackObj.track;
    undoRedoTracker = trackObj.undoRedoTracker;

    let url = undoRedoTracker[track];
    let img = new Image(); // new image reference element
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

// <-------------------------------------- undo-redo control end -------------------------------------->

socket.on("beginPath", (data) => {
    startPath(data);
});

socket.on("drawPath", (data) => {
    draw(data);
});

socket.on("undoRedo", (data) => {
    undoRedoCanvas(data);
});
