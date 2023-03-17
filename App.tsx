import { useState, useEffect, useMemo, useCallback } from 'react';
import * as React from 'react';
import './style.css';
import { checkTicTacToeWin } from './ticTacToe.js';

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const players = ['X', 'O'];

export default function App() {
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!player) {
      const playerIndex = Math.floor(Math.random() * 2);
      setPlayer(players[playerIndex]);
    }
  }, [player]);

  useEffect(() => {
    checkWinner();
  }, [board]);

  const onCellClick = (rowIndex, columnIndex) => {
    if (winner) return;
    const boardCopy = JSON.parse(JSON.stringify(board));
    if (boardCopy[rowIndex][columnIndex]) return;
    boardCopy[rowIndex][columnIndex] = player;

    setBoard(boardCopy);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const checkWinner = useCallback(() => {
    players.forEach((player) => {
      if (checkTicTacToeWin(board, player)) {
        setWinner(player);
      }
    });
  }, [board]);

  const reset = () => {
    setBoard(initialBoard);
    setPlayer(null);
    setWinner(null);
  };

  const boardState: 'empty' | 'full' = useMemo(() => {
    let seenNull = false;
    let seenPlayer = false;

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      for (let colIndex = 0; colIndex < board.length; colIndex++) {
        const cell = board[rowIndex][colIndex];
        if (!cell) {
          seenNull = true;
        } else {
          seenPlayer = true;
        }
      }
    }

    if (seenNull && !seenPlayer) return 'empty';
    if (!seenNull && seenPlayer) return 'full';
  }, [board]);

  const prompt = useMemo(() => {
    if (winner)
      return (
        <>
          <span>Player {winner} WINS!!!</span>
          <button className="reset-btn" onClick={reset}>
            Play again
          </button>
        </>
      );

    if (boardState === 'empty') return `Player ${player}, start the game!`;

    if (boardState === 'full')
      return (
        <>
          <span>Player {winner} WINS!!!</span>
          <button className="reset-btn" onClick={reset}>
            Its a draw!
          </button>
        </>
      );

    if (player) return `Its player ${player}'s turn...`;
  }, [player, winner]);

  return (
    <div className="body">
      {winner && <div className="confetti"> </div>}
      <p className="prompt show">{prompt}</p>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row">
            {row.map((cell, cellIndex) => (
              <div
                className="cell"
                onClick={() => onCellClick(rowIndex, cellIndex)}
              >
                {' '}
                {cell}{' '}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
