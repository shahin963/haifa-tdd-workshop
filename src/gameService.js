export function getGameState(board) {
  let winner = '';
  ['X', 'O'].forEach(symbol => {
    if (checkIfAnyRowWin(board, symbol)) {
      winner = symbol;
    }
    if (checkIfAnyColumnWin(board, symbol)) {
      winner = symbol;
    }
    if (checkIfCrossWinn(board, symbol)) {
      winner = symbol;
    }
  });
  if (checkIfBoardFull(board)) {
    return 'T';
  }
  return winner;
}

function checkIfAnyRowWin(board, symbol) {
  let row = board.some(row => row.every(cell => cell === symbol));
  return row ? symbol : false;
}

function checkIfAnyColumnWin(board, symbol) {
  let winner = false;
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === symbol &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      winner = symbol;
    }
  }
  return winner;
}

function checkIfCrossWinn(board, symbol) {
  if (
    board[1][1] === symbol &&
    ((board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
      (board[2][0] === board[1][1] && board[2][0] === board[0][2]))
  ) {
    return symbol;
  }
  return false;
}

function checkIfBoardFull(board) {
  return !board.some(row => row.some(cell => cell === ''));
}
