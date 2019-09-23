import React, { useState } from 'react';
import './App.css';
import { getGameState } from './gameService';
import { Registration } from './Registration';
import { Game } from './Game';

export const App = () => {
  const [registered, setRegistered] = useState(false);
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [winner, setWinner] = useState('');
  const [tie, setTie] = useState(false);
  const [firstPlayerTurn, setFirstPlayerTurn] = useState(false);

  const handleNewGame = (p1, p2) => {
    setP1(p1);
    setP2(p2);
    setRegistered(true);
    setFirstPlayerTurn(true);
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    const _board = board.map(row => [...row]);
    _board[rowIndex][cellIndex] = firstPlayerTurn ? 'X' : 'O';
    let gameState = getGameState(_board);
    if (gameState === 'X') {
      setWinner('X');
    }
    if (gameState === 'O') {
      setWinner('O');
    }
    if (gameState === 'T') {
      setTie(true);
    }
    setBoard(_board);
    setFirstPlayerTurn(!firstPlayerTurn);
  };

  return (
    <div className="App">
      {!registered && <Registration onNewGame={handleNewGame} />}
      {registered && (
        <Game
          board={board}
          p1={p1}
          p2={p2}
          onCellClicked={handleCellClick}
          isFirstPlayerTurn={firstPlayerTurn}
        />
      )}
      {winner && (
        <div data-testid="winner">{`${winner === 'X' ? p1 : p2} won!!!`}</div>
      )}
      {tie && <div data-testid="tie">No winner!!!</div>}
    </div>
  );
};

export default App;
