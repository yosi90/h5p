let yuxContainer = document.getElementById("yuxtaposicion");
let superior = document.getElementById("eSup");

let isResizing = draggable = false;
let lastClickPos;
let sizeBorder = yuxContainer.getBoundingClientRect().width;
let posBorderSup;

window.onload = function () {
    superior.style.backgroundSize = `${sizeBorder}px 100%`;
    posBorderSup = superior.getBoundingClientRect().right;
};

superior.onmousedown = function (event) {
    if (draggable) {
        isResizing = true;
        lastClickPos = event.clientX;
    }
};

yuxContainer.onmousemove = function (event) {
    if (!isResizing) {
        if (posBorderSup - event.clientX > 0 && posBorderSup - event.clientX < 21) {
            superior.style.cursor = "w-resize";
            draggable = true;
        } else {
            superior.style.cursor = "auto";
            draggable = false;
        }
    } else if (posBorderSup - event.clientX > -100 && posBorderSup - event.clientX < 100) {
        if (lastClickPos !== event.clientX) {
            let deltaX = event.clientX - lastClickPos;
            if (superior.offsetWidth + deltaX < yuxContainer.offsetWidth)
                superior.style.width = `${superior.offsetWidth + deltaX}px`;
            posBorderSup = superior.getBoundingClientRect().right;
            lastClickPos = event.clientX;
        }
    } else {
        draggable = false;
        isResizing = false;
    }
};

superior.onmouseup = function () {
    if (isResizing)
        isResizing = false;
}