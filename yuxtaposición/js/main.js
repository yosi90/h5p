let yuxContainer = document.getElementById("yuxtaposicion");
let superior = document.getElementById("eSup");

let isResizing = draggable = false;
let lastClickPos;
let sizeBorder;
let posBorderSup;

window.onload = function () {
    sizeBorder = yuxContainer.getBoundingClientRect().width;
    superior.style.backgroundSize = `${sizeBorder}px 100%`;
    posBorderSup = superior.getBoundingClientRect().right;
};

window.onresize = function () {
    debugger;
    sizeBorder = yuxContainer.getBoundingClientRect().width;
    superior.style.backgroundSize = `${sizeBorder}px 100%`;
    superior.style.width = "51.79%";
    posBorderSup = superior.getBoundingClientRect().right;
}

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
            let newWidth = superior.offsetWidth + deltaX;
            if (newWidth < yuxContainer.offsetWidth && newWidth > 20)
                superior.style.width = `${newWidth}px`;
            else {
                superior.style.width = newWidth > yuxContainer.offsetWidth ?
                    `${yuxContainer.offsetWidth}px` : `${20}px`;
                draggable = false;
                isResizing = false;
            }
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