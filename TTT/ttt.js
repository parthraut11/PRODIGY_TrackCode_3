// script.js
const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-btn');
const resultSection = document.querySelector('.result');

let isXTurn = true;
let gameActive = true;

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize the game
function startGame() {
  isXTurn = true;
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  resultSection.style.display = 'none';
}

// Handle a cell click
function handleClick(e) {
  const cell = e.target;
  const currentPlayer = isXTurn ? 'X' : 'O';
  placeMarker(cell, currentPlayer);
  if (checkWin(currentPlayer)) {
    endGame(false, currentPlayer);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurn();
  }
}

// Place marker on the cell
function placeMarker(cell, currentPlayer) {
  cell.textContent = currentPlayer;
  cell.classList.add('taken');
}

// Switch turns
function switchTurn() {
  isXTurn = !isXTurn;
}

// Check if there's a win
function checkWin(currentPlayer) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

// Check if the game is a draw
function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

// End the game
function endGame(draw, winner = '') {
  gameActive = false;
  if (draw) {
    winnerMessage.textContent = "It's a Draw!";
  } else {
    winnerMessage.textContent = `${winner} Wins!`;
  }
  resultSection.style.display = 'block';
}

// Restart game
restartButton.addEventListener('click', startGame);

// Start the game on load
startGame();
