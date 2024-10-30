// JavaScript Logic for Tic Tac Toe
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '';
let gameActive = false;

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const selectXButton = document.getElementById('selectX');
const selectOButton = document.getElementById('selectO');

// Initialize game
function initGame() {
    board.fill('');
    currentPlayer = '';
    gameActive = false;
    statusDisplay.textContent = 'Select your symbol to start';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning');
    });
}

// Select player X
selectXButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameActive = true;
    updateStatus();
});

// Select player O
selectOButton.addEventListener('click', () => {
    currentPlayer = 'O';
    gameActive = true;
    updateStatus();
});

// Update status display
function updateStatus() {
    if (currentPlayer) {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Handle cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (board[index] !== '' || !gameActive) return; // Cell already taken or game ended

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
        updateStatus();
    });
});

// Check for win or tie
function checkResult() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');
            statusDisplay.textContent = `Player ${board[a]} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        statusDisplay.textContent = 'It\'s a Tie!';
    }
}

// Reset game
resetButton.addEventListener('click', initGame);

// Initialize on load
initGame();
