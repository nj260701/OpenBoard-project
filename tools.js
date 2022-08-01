let toolsCont = document.querySelector(".tools_container")

let optionsCont = document.querySelector(".option_container")
let optionFlag = true;

let pencil = document.querySelector(".pencil")
let eraser = document.querySelector(".eraser")
let pencilToolCont = document.querySelector(".pencil-tool-cont")
let eraserToolCont = document.querySelector(".eraser-tool-cont")
let pencilFlag = false
let eraserFlag = false

let sticky = document.querySelector(".stickyNote");

let upload = document.querySelector(".upload");



// true---> tools show ; false --->hide tools

optionsCont.addEventListener("click", (e) => {
    optionFlag = !optionFlag

    if (optionFlag) openTools();
    else closeTools();
})

function openTools() {
    let iconEle = optionsCont.children[0];
    iconEle.classList.remove("fa-bars");
    iconEle.classList.add("fa-times");
    toolsCont.style.display = "flex";

}

function closeTools() {
    let iconEle = optionsCont.children[0];
    iconEle.classList.remove("fa-times");
    iconEle.classList.add("fa-bars");
    toolsCont.style.display = "none";
    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

// true---> show pencil/eraser ; false ---> hide pencil/eraser
pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag
    if (pencilFlag) pencilToolCont.style.display = "block"
    else pencilToolCont.style.display = "none";
})

eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag
    if (eraserFlag) eraserToolCont.style.display = "flex"
    else eraserToolCont.style.display = "none"
})


upload.addEventListener("click", (e) => {
    //for opening file explorer

    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*")
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHtml = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>
        `;
        createSticky(stickyTemplateHtml);
    })


})


sticky.addEventListener("click", (e) => {
    let stickyTemplateHtml = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    createSticky(stickyTemplateHtml);
})

function createSticky(stickyTemplateHtml) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHtml;

    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont)

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}


function noteActions(minimize, remove, element) {
    remove.addEventListener("click", (e) => {
        element.remove();
    })

    minimize.addEventListener("click", (e) => {
        let noteCont = element.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })

}

function dragAndDrop(element, event) {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    // document.body.append(element);

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}



