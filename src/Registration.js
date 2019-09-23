import React, { useState } from 'react';
export const Registration = ({ onNewGame }) => {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');

  return (
    <div data-testid="registration">
      <input
        data-testid="p1-input"
        onChange={evt => setP1(evt.target.value)}
      ></input>
      <input
        data-testid="p2-input"
        onChange={evt => setP2(evt.target.value)}
      ></input>
      <button
        data-testid="new-game"
        onClick={() => {
          p2 && onNewGame(p1, p2);
        }}
      >
        New Game
      </button>
    </div>
  );
};
