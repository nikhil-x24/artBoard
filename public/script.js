let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let toolPencilWidth = document.querySelector(".pencil-tool-cont");
let toolEraserWidth = document.querySelector(".eraser-tool-cont");

let toolPencil = document.querySelector(".pencil");
let toolEraser = document.querySelector(".eraser");
let toolSticky = document.querySelector(".sticky");
let toolUpload = document.querySelector(".upload");
let toolDownload = document.querySelector('.download')
let toolUndo = document.querySelector('.undo')
let toolRedo = document.querySelector('.redo')

let pencilFlag = false;
let eraserFlag = false;

// change menu icon
optionsCont.addEventListener("click", () => {
    // fa-bars -> menu is open, fa-times -> menu is closed
    const iconElement = optionsCont.children[0];

    // open tools menu
    if (iconElement.classList[1] === "fa-bars") {
        iconElement.classList.remove("fa-bars"); // remove bars icon
        iconElement.classList.add("fa-times"); // add cross icon
        toolsCont.style.display = "flex"; // open tools
    }
    // close tools menu
    else {
        iconElement.classList.remove("fa-times"); // remove cross icon
        iconElement.classList.add("fa-bars"); // add bars icon
        toolsCont.style.display = "none"; // close tools

        toolPencilWidth.style.display = "none"; // close pencile tool
        toolEraserWidth.style.display = "none"; // close eraser tool
    }
});

// open pencil tool
toolPencil.addEventListener("click", () => {
    if (toolPencilWidth.style.display === "none")
        toolPencilWidth.style.display = "block";
    else toolPencilWidth.style.display = "none";
});

// open eraser tool
toolEraser.addEventListener("click", () => {
    eraserFlag = !eraserFlag;

    if (eraserFlag) toolEraserWidth.style.display = "flex";
    else toolEraserWidth.style.display = "none";
});

// handle sticky note creation

toolSticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    createSticky(stickyTemplateHTML);
});

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}

function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    });
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    });
}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = "absolute";
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + "px";
        element.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        element.onmouseup = null;
    };
}

// 4thNO- upload image
toolUpload.addEventListener("click", () => {
    // Open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>
        `;
        createSticky(stickyTemplateHTML);
    });
});

// require('dotenv').config()
// console.log(`Hello ${process.env.HELLO}`)