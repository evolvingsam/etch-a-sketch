const DEFAULT_COLOR = "#252525ff";

let grid = document.querySelector("#grid");
let gridChildren = null;
let gridWidth = grid.getBoundingClientRect().width;
let clearButton = document.querySelector("#clear-btn");
let colorPicker = document.querySelector("#color-picker");
let gridSizeSlider = document.querySelector("#grid-size-slider");
let gridSizeText = document.querySelector("#grid-size-text");
let darkeningButton = document.querySelector("#darkening-btn");
let rgbButton = document.querySelector("#rgb-btn");
let container = document.querySelector(".container");


let currentColor = DEFAULT_COLOR;
let isDarkening = false;
let isRGB = false;
let hue = 0;
let currentNode = null;
let previousNode = null;
let gridSize;

let mouseDown = false;
document.body.onmousedown = () => {
    mouseDown = true;
}
document.body.onmouseup = () => {
    mouseDown = false;
}

gridSizeSlider.onmousemove = (e) => {
    updateGridSizeText(e.target.value);
}
gridSizeSlider.onchange = (e) => {
    updateGridSize(e.target.value);
}

colorPicker.onchange = (e) => {
    updateColor(e.target.value);
}


function createGrid(dimension) {
    gridSize = dimension;

    let gridNum = dimension * dimension;

    for (let i = 0; i < gridNum; i++) {
        let square = document.createElement("div");
        square.style.width = `${gridWidth / dimension}px`;
        square.style.height = `${gridWidth / dimension}px`;

        if (isDarkening) {
            square.style.opacity = "0";
        }


        grid.appendChild(square);

    gridChildren = grid.childNodes;

    }

}

function colorSquare(element) { 
    element.style.backgroundColor = currentColor;

    if (isRGB) {
        element.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        hue += 5;

        if (hue > 360) {
            hue = 0;
        }
    } 
    
    if (isDarkening) {
        element.style.opacity = parseFloat(element.style.opacity) + .1;
        return;
    }
     
    element.style.opacity = "1";
    
}


function updateGridSize(value) {
    grid.innerHTML = '';
    createGrid(value);
}

function updateGridSizeText(value) {
    gridSizeText.textContent = `${value} x ${value}`;
}

function updateColor(value) {
    currentColor = value;
}

function getChildIndex(child) {
    let children = grid.childNodes;

    for (let i = 0; i < children.length; i++) {
        if (children[i] === child) {
            return i;
        }
    }
}

function getChildCoordinate(child) {
    let childIndex = getChildIndex(child);

    let row = Math.floor(childIndex / gridSize);
    let col = childIndex % gridSize;

    return [row, col];
}
function convertCoordinatetoIndex(row, col) {
    return row * gridSize + col;
}

function plotLine() {
    let [x0, y0] = getChildCoordinate(previousNode);
    let [x1, y1] = getChildCoordinate(currentNode);

    let dx = Math.abs(x1 - x0);
    let sx = (x0 < x1) ? 1 : -1;
    let dy = -(Math.abs(y1 - y0));
    let sy = (y0 < y1) ? 1 : -1;
    let error = dx + dy;

    let lineArray = []

    while (true) {
        lineArray.push([x0, y0]);
        if (x0 === x1 && y0 === y1) {
            break;
        }

        let e2 = 2 * error;

        if (e2 >= dy) {
            error = error + dy;
            x0 = x0 + sx;
        }

        if (e2 <= dx) {
            error = error + dx;
            y0 = y0 + sy;
        }
    }

    if (lineArray.length === 2) {
        let childIndex = convertCoordinatetoIndex(...lineArray[1]);
        colorSquare(gridChildren[childIndex]);
        return;
    }

    for (let i = 0; i < lineArray.length; i++){
        let childIndex = convertCoordinatetoIndex(...lineArray[i]);
        colorSquare(gridChildren[childIndex]);
    }
}
grid.addEventListener("mousedown", (e) => {
    currentNode = e.target;
    colorSquare(e.target);
})

grid.addEventListener("mouseover", (e) => {
    if (mouseDown === true) {
        if (currentNode === null) {
            currentNode = e.target;
            colorSquare(e.target);
            return;
        }
        previousNode = currentNode;
        currentNode = e.target;
        plotLine();
    }
})

clearButton.addEventListener("click", () => {
    let gridChildren = grid.children;
    for (let i = 0; i < gridChildren.length; i++) {
        gridChildren[i].style.backgroundColor = "";
        if (isDarkening === true) {
            gridChildren[i].style.opacity = "0";
        } else {
            gridChildren[i].style.opacity = "1";
        }
    }
})

darkeningButton.addEventListener("click", () => {
    
    if (isDarkening === true) {
        isDarkening = false;
        for (let i = 0; i < gridChildren.length; i++) {
            if (gridChildren[i].style.backgroundColor === "") {
                gridChildren[i].style.opacity = "1";
            }
        }
        darkeningButton.style.backgroundColor = "#D9D9D9";
        darkeningButton.style.color = "#464646";
        darkeningButton.style.boxShadow = "0 4px 2px 0 rgba(0, 0, 0, 0.25), 0 -2px 1px 4px rgba(0, 0, 0, .25) inset";
    } else {
        isDarkeningdarkening = true;
        for (let i = 0; i < gridChildren.length; i++) {
            if (gridChildren[i].style.backgroundColor === "") {
                gridChildren[i].style.opacity = "0";
            }
        }
        darkeningButton.style.backgroundColor = "#323232";
        darkeningButton.style.color = "white";
        darkeningButton.style.boxShadow = "0 4px 2px 0 rgba(0, 0, 0, 0.25), 0 2px 1px 4px rgba(0, 0, 0, .25) inset";
    }
})

rgbButton.addEventListener("click", () =>{
    if (isRGB) {
        isRGB = false;
        container.classList.remove("gradient-shadow");
    } else {
        isRGB = true;
        container.classList.add("gradient-shadow");
    }
})



createGrid(16);