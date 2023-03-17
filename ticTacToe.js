export const checkTicTacToeWin = (board, player) => {
  if (board.length !== board[0]?.length) {
    throw new Error('Invalid board!');
  }

  // check if any rows have the same player
  for (let row of board) {
    if (checkPlayer(player, row)) return true;
  }

  // check if any columns have the same player
  for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
    const column = board.map((row) => row[columnIndex]);
    if (checkPlayer(player, column)) return true;
  }

  // check if the top to bottom diagonal has the same player
  const diagonal1 = board.map((row, rowIndex) => row[rowIndex]);
  if (checkPlayer(player, diagonal1)) return true;

  // check if the bottom to top diagonal has the same player
  const diagonal2 = board.map(
    (row, rowIndex) => row[row.length - 1 - rowIndex]
  );
  if (checkPlayer(player, diagonal2)) return true;

  return false;
};

const checkPlayer = (player, arr) => {
  return JSON.stringify(Array(arr.length).fill(player)) == JSON.stringify(arr);
};
