const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'x';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer.toUpperCase();
    cell.classList.add(currentPlayer);

    if (checkWin()) {
        gameActive = false;
        status.textContent = `${currentPlayer.toUpperCase()} Wins!`;
        status.classList.add('celebration-text');
        highlightWinningCells();
        createConfetti();
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        status.textContent = "Draw!";
        return;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    status.textContent = `${currentPlayer.toUpperCase()}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function getWinningCombination() {
    for (const combination of winningCombinations) {
        if (combination.every(index => gameState[index] === currentPlayer)) {
            return combination;
        }
    }
    return null;
}

function highlightWinningCells() {
    const winningCombo = getWinningCombination();
    if (winningCombo) {
        winningCombo.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    }
}

function createConfetti() {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random position
        const startPositionX = Math.random() * window.innerWidth;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = Math.random() * 10 + 5;
        
        // Random rotation
        const rotation = Math.random() * 360;
        
        // Random delay
        const delay = Math.random() * 2;
        
        // Apply styles
        confetti.style.left = `${startPositionX}px`;
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.animationDelay = `${delay}s`;
        
        // Add different shapes
        if (i % 3 === 0) {
            confetti.style.borderRadius = '50%';
        } else if (i % 3 === 1) {
            confetti.style.borderRadius = '0';
        } else {
            confetti.style.width = `${size / 2}px`;
            confetti.style.height = `${size}px`;
            confetti.style.borderRadius = `${size / 4}px`;
        }
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function restartGame() {
    currentPlayer = 'x';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = "X's turn";
    status.classList.remove('celebration-text');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning-cell');
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame); 