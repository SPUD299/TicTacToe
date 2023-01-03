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
    // switch the current player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e6e6e6' }}>
      <ImageBackground
        style={{ width: 500, height: 500 }}
        source={{ uri: require('./assets/Samurai.png') }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title="Reset" onPress={resetGame} />
        </View>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row' }}>
            {row.map((cell, cellIndex) => renderCell(rowIndex, cellIndex))}
          </View>
        ))}
      </ImageBackground>
    </View>
  );
}