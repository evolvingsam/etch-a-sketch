const gridSize = 16;
const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
container.style.width = '640px';
container.style.height = '640px';
container.style.border = '1px solid #ccc';
container.style.margin = '20px auto';

const squareSize = 640 / gridSize;

function createGrid(container, size, squareSize) {
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.boxSizing = 'border-box';
        square.style.border = '1px solid #eee';
        square.style.background = '#fff';
        container.appendChild(square);
    }
}

createGrid(container, gridSize, squareSize);

updateSquareListeners(container);

document.body.appendChild(container);
const button = document.createElement('button');
button.textContent = 'New Grid';
button.style.display = 'block';
button.style.margin = '20px auto';
button.style.padding = '10px 20px';
button.style.fontSize = '16px';

button.addEventListener('click', () => {
    let newSize = prompt('Enter number of squares per side (max 100):', '16');
    newSize = parseInt(newSize, 10);
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }

    container.remove();
    const newContainer = document.createElement('div');
    newContainer.style.display = 'flex';
    newContainer.style.flexWrap = 'wrap';
    newContainer.style.width = '960px';
    newContainer.style.height = '960px';
    newContainer.style.border = '1px solid #ccc';
    newContainer.style.margin = '20px auto';

    const newSquareSize = 960 / newSize;

    createGrid(newContainer, newSize, newSquareSize);

    updateSquareListeners(newContainer);

    document.body.appendChild(newContainer);
});

document.body.insertBefore(button, document.body.firstChild);
const modeButton = document.createElement('button');
modeButton.textContent = 'Mode: Monochrome';
modeButton.style.display = 'block';
modeButton.style.margin = '10px auto';
modeButton.style.padding = '10px 20px';
modeButton.style.fontSize = '16px';

let colorMode = 'monochrome';

modeButton.addEventListener('click', () => {
    colorMode = colorMode === 'monochrome' ? 'rgb' : 'monochrome';
    modeButton.textContent = `Mode: ${colorMode.charAt(0).toUpperCase() + colorMode.slice(1)}`;
});

// Helper function to get color based on mode
function getColor() {
    if (colorMode === 'monochrome') {
        return '#000';
    } else {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }
}

// Update event listeners for squares to use getColor
function updateSquareListeners(container) {
    container.childNodes.forEach(square => {
        square.addEventListener('mouseenter', () => {
            square.style.background = getColor();
        });
    });
}

// Initial squares use getColor
updateSquareListeners(container);

// Update event listeners for new grid
button.addEventListener('click', () => {
    // ...existing code...
    updateSquareListeners(newContainer);
});

document.body.insertBefore(modeButton, button);
