import React, { useState, useEffect } from 'react';

import './App.scss';
import NumberDisplay from '../NumberDisplay';
import { generateCells, openMultipleCells } from '../../utils';
import Button from '../Button';

import { Cell, Face } from '../../types';
import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from '../../constants';

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>('😄');
  const [time, setTime] = useState<number>(0);
  const [isAlive, setIsAlive] = useState<boolean>(false);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
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
    if (!isAlive) {
      // TODO: make sure you don't click on a bomb in the beginning!
      setIsAlive(true);
    }

    const currentCell = cells[rowParam][colParam];

    if (['visible', 'flagged'].includes(currentCell.state)) {
      return;
    }
    let newCells = cells.slice();

    if (currentCell.value === 'bomb') {
      // TODO: take care of bomb click!'
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
    } else if (currentCell.value === 'none') {
      // TODO:
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = 'visible';
      // setCells(newCells); // do it after checking has won
    }

    // check to see if you have won
    // winning condition :
    let isSafeUnknownCellExists = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = newCells[row][col];
        if (currentCell.value !== 'bomb' && currentCell.state === 'unknown') {
          isSafeUnknownCellExists = true;
          break;
        }
      }
    }
    // 폭탄도 아니며, 아직 안열린 애들도 없다면
    // 즉 이겼음
    if (!isSafeUnknownCellExists) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === 'bomb') {
            return {
              ...cell,
              state: 'flagged', //폭탄들은 깃발이 꽂힌채로 나옴
            };
          } else {
            return cell;
          }
        }),
      );
      setHasWon(true);
    }

    setCells(newCells);
  };

  useEffect(() => {
    if (hasLost) {
      setFace('😵');
      setIsAlive(false);
      // TODO: show all bombs
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setFace('😎');
      setIsAlive(false);
    }
  }, [hasWon]);

  const handleCellContext =
    (rowParam: number, colParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();
      const _cells = cells.slice(); // copy array
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
    setIsAlive(false);
    setTime(0);
    setCells(generateCells());
    setHasLost(false);
    setHasWon(false);
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

  const showAllBombs = (): Cell[][] => {
    const currentCells = cells.slice();
    return currentCells.map((row) =>
      row.map((cell) => {
        if (cell.value === 'bomb') {
          return {
            ...cell,
            state: 'visible',
          };
        }
        return cell;
      }),
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
