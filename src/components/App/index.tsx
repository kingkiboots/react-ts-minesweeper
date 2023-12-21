import React, { useState, useEffect } from 'react';

import './App.scss';
import NumberDisplay from '../NumberDisplay';
import { generateCells } from '../../utils';
import Button from '../Button';

import { Cell, Face } from '../../types';
import { NO_OF_BOMBS } from '../../constants';

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>('😄');
  const [time, setTime] = useState<number>(0);
  const [isAlive, setIsAlive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(NO_OF_BOMBS);

  console.log('cells', cells);

  useEffect(() => {
    const handleMouseDown = () => {
      setFace('😲');
    };
    const handleMouseUp = () => {
      setFace('😄');
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    // if game is playing
    if (isAlive && time < 999) {
      // the timer starts coming up
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      // on unmount
      return () => {
        clearInterval(timer); // 오 이게 되네?
      };
    }
  }, [isAlive, time]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    // start the game
    if (!isAlive) setIsAlive(true);
  };

  const handleCellContext =
    (rowParam: number, colParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();
      const _cells: Cell[][] = cells.slice(); // copy array
      const currentCell = cells[rowParam][colParam];

      if (currentCell.state === 'visible') {
        return;
      } else if (currentCell.state === 'unknown') {
        _cells[rowParam][colParam].state = 'flagged';
        setBombCounter(bombCounter - 1);
        if (!isAlive) setIsAlive(true);
      } else {
        _cells[rowParam][colParam].state = 'unknown';
        setBombCounter(bombCounter + 1);
      }
      setCells(_cells);
    };

  const handleFaceClick = (): void => {
    if (isAlive) {
      setIsAlive(false);
      setTime(0);
      setCells(generateCells());
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          cell={cell}
          onClick={handleCellClick}
          onContext={handleCellContext}
          row={rowIndex}
          col={colIndex}
        />
      )),
    );
  };

  return (
    <div className="App">
      <div className="Header">
        {/* amount of remaining mines */}
        <NumberDisplay value={bombCounter} />
        <div className="Face">
          <span role="img" aria-label="face" onClick={handleFaceClick}>
            {face}
          </span>
        </div>
        {/* time */}
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
