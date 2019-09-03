import * as R from 'ramda';

const playerOne = 'X';
const playerTwo = 'O';
const emptyPosition = '_';

// Used to calculate if a player has won.
const magicSquare = [2, 7, 6, 9, 5, 1, 4, 3, 8];

// The sum of the winning sets must be 15 in order to win
const magicNumber = 15;

// All the 3-tuples of winning positions in the board
const winningSets = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// For each position, we select the winning tuples related to it
// So when a player moves we don't have to check all the winning tuples
const relatedWinningSets = R.range(0, 9)
                      .map(i => winningSets.filter(j => j.includes(i)));

function getNewBoard() {
  return R.repeat(emptyPosition, 9);
}

// Checks if a player has won by checking all the winning tuples
// related to the position of the board that the player chose in that move.
// For each winning 3-tuple (related to the position chosen), we replace the value of the position for
// the value in the magic square (if the player 'owns' that position); or
// for 0 if the position in the winning set is empty or 'owned' by the other player.
// Then, we sum all the values replaced for that given 3-tuple.
// Finally, if any of the summations of the 3-tuples is equal to the magic number, that means
// that the current player has won.
function hasPlayerWon(currentPlayer, position, board) {
  const positionWinningSets = relatedWinningSets[position];

  const mappedSets = positionWinningSets.map((winningSet) => {
    return winningSet.map(position => board[position] === currentPlayer ? magicSquare[position] : 0)
                     .reduce((sum, x) => sum + x);
  });

  return mappedSets.includes(magicNumber);
}

function togglePlayer(currentPlayer) {
  return currentPlayer === playerOne ? playerTwo : playerOne;
}

// The game is over when the board is full
function isGameOver(board) {
  return !board.includes(emptyPosition);
}

// Returns true on valid move.
function playerMove(playerMove, board) {
  return isPositionEmpty(playerMove, board);
}

function isPositionEmpty(playerMove, board) {
  return playerMove >= 0 && playerMove < 9 && board[playerMove] == emptyPosition;
}

function updateBoard(playerMove, currentPlayer, board) {
  return R.update(playerMove, currentPlayer, board);
}

var board = getNewBoard();
var currentPlayer = playerOne;
var playerWon = false;

export default {
  initGame() {
    board = getNewBoard();
    currentPlayer = playerOne;
    playerWon = false; 
  },

  playCurrentPlayer(move) {
    if (playerMove(move, board)) {
      board = updateBoard(move, currentPlayer, board);
      playerWon = hasPlayerWon(currentPlayer, move, board);
      currentPlayer = togglePlayer(currentPlayer);

      return true;
    }

    return false;
  },

  getCurrentPlayer: () => currentPlayer,

  playerWon: () => playerWon,

  hasGameEnded: () => playerWon || isGameOver(board)
};
