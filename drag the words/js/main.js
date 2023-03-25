const dragElements = document.querySelectorAll('.drag');
const dropZone = document.querySelectorAll('.dropzone');

dragElements.forEach(element => {
    const testNumber = element.getAttribute('drag');

    element.addEventListener('dragstart', () => {
        element.classList.add('dragging');
        element.style.cursor = "grabbing";
    });

    element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
        element.style.cursor = "grab";
    });

    element.addEventListener('contextmenu', () => {
        let parent = element.parentElement;
        if (parent && !parent.classList.contains('words')) {
            document.querySelector(`[dragzone="${testNumber}"]`).appendChild(element);
            parent.style.minWidth = "100px";
        }
    });
});

dropZone.forEach(element => {

    element.addEventListener('dragover', event => {
        event.preventDefault();
    });

    element.addEventListener('drop', event => {
        event.preventDefault();
        const draggedElement = document.querySelector('.dragging');
        if (draggedElement && event.target === element) {
            if (draggedElement.getAttribute('drag') == element.getAttribute('drop') && element.childElementCount === 0) {
                let parent = draggedElement.parentElement;
                if (parent.getAttribute("drop"))
                    parent.style.minWidth = "100px";
                element.appendChild(draggedElement);
                element.style.minWidth = `${draggedElement.getBoundingClientRect().width + 10}px`;
            } else if (draggedElement.getAttribute('drag') == element.getAttribute('dragzone')) {
                draggedElement.parentElement.style.minWidth = "100px";
                element.appendChild(draggedElement);
            }
        }
    });
});

window.oncontextmenu = function (event) {
    event.preventDefault();
}