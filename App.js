import React, { useState } from 'react';
import { View, Text, Button, ImageBackground } from 'react-native';

export default function App() {
  // state to store the current game board
  const [board, setBoard] = useState([
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ]);

  // state to store the current player (either 'X' or 'O')
  const [currentPlayer, setCurrentPlayer] = useState('X');

  // state to store the scores for each player
  const [scores, setScores] = useState({ X: 0, O: 0 });

  // function to reset the game board
  const resetGame = () => {
    setBoard([
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ]);
    setCurrentPlayer('X');
  };

  // function to handle a player making a move
  const handleMove = (row, col) => {
    // check if the space is already taken
    if (board[row][col] !== ' ') {
      return;
    }
    // update the game board with the current player's move
    setBoard(
      board.map((rowArr, r) =>
        rowArr.map((cell, c) => (r === row && c === col ? currentPlayer : cell)),
      ),
    );
    // check if the current player has won
    if (checkWin(currentPlayer)) {
      // update the scores for the current player
      setScores(prevScores => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));
      // reset the game board
      resetGame();
      return;
    }
    // check if the game is a draw
    if (checkDraw()) {
      // reset the game board
      resetGame();
      return;
    }
    // switch the current player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // function to check if a player has won
  const checkWin = player => {
    // check rows
    for (let row = 0; row < 3; row++) {
      if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
        return true;
      }
    }
    // check columns
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
        return true;
      }
    }
    // check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if  (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
return true;
}
return false;
};

// function to check if the game is a draw
const checkDraw = () => {
// check if any of the cells are empty
for (let row = 0; row < 3; row++) {
for (let col = 0; col < 3; col++) {
if (board[row][col] === ' ') {
return false;
}
}
}
return true;
};

// function to render a game board cell
const renderCell = (row, col) => {
return (
<View style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7eb2ed', flex: 1 }}>
<Button
title={board[row][col]}
onPress={() => handleMove(row, col)}
/>
</View>
);
};

// render the game board
return (
<ImageBackground
style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}

>
<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
<Text>X: {scores.X}</Text>
<Button title="Reset" onPress={resetGame} />
<Text>O: {scores.O}</Text>
</View>
<View style={{ width: 500, height: 500 }}>
{board.map((row, rowIndex) => (
<View key={rowIndex} style={{ flexDirection: 'row' }}>
{row.map((cell, cellIndex) => renderCell(rowIndex, cellIndex))}
</View>
))}
</View>
</ImageBackground>
);
}