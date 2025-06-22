const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  gameState = Array(9).fill(null);
  gameActive = true;
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
  }
}

function handleMove(e) {
  const index = e.target.getAttribute('data-index');
  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.disabled = true;

    if (checkWinner()) {
      status.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (gameState.every(cell => cell)) {
      status.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  createBoard();
}

// Initialize board on page load
createBoard();
