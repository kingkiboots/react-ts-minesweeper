import React, { useState, useEffect } from 'react';

import './App.scss';
import { generateCells, openMultipleCells } from '../../utils';
import Cell from '../../components/Cell';

import { CellProps, Face, GameStatus } from '../../types';
import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from '../../constants';
import Header from '../Header';

const App: React.FC = () => {
  const [cells, setCells] = useState<CellProps[][]>(generateCells());
  const [face, setFace] = useState<Face>('😄');
  const [gameStatus, setGameStatus] = useState<GameStatus>('unstarted');
  const [bombCounter, setBombCounter] = useState<number>(NO_OF_BOMBS);

  console.log('cells', cells);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    if (['hasLost', 'hasWon'].includes(gameStatus)) {
      return;
    }

    let newCells = cells.slice();
    // when starting the game
    // 시작한 단계가 아니라면
    // if (gameStatus !== 'started') {
    if (gameStatus === 'unstarted') {
      let isCurrentCellBomb = newCells[rowParam][colParam].value === 'bomb';
      while (isCurrentCellBomb) {
        console.log('처음부터 폭탄이다 엎드려!!!!!');
        newCells = generateCells();
        if (newCells[rowParam][colParam].value !== 'bomb') {
          isCurrentCellBomb = false;
          break;
        }
      }
      setGameStatus('started');
    }

    const currentCell = newCells[rowParam][colParam];

    if (['visible', 'flagged'].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === 'bomb') {
      // TODO: take care of bomb click!'
      setGameStatus('hasLost');
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
      setGameStatus('hasWon');
      setBombCounter(0);
    }

    setCells(newCells);
  };

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
        // if (!isAlive) setIsAlive(true);
        if (gameStatus === 'unstarted') setGameStatus('started');
      } else {
        _cells[rowParam][colParam].state = 'unknown';
        setBombCounter(bombCounter + 1);
      }
      setCells(_cells);
    };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          cell={cell}
          gameStatus={gameStatus}
          onClick={handleCellClick}
          onContext={handleCellContext}
          row={rowIndex}
          col={colIndex}
          setFace={setFace}
        />
      )),
    );
  };

  const showAllBombs = (): CellProps[][] => {
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

  useEffect(() => {
    if (['unstarted', 'started'].includes(gameStatus)) {
      const handleMouseUp = () => {
        setFace('😄');
      };
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus === 'hasLost') {
      setFace('😵');
      return;
    }
    if (gameStatus === 'hasWon') {
      setFace('😎');
      return;
    }
  }, [gameStatus]);

  return (
    <div className="App">
      <Header
        face={face}
        gameStatus={gameStatus}
        bombCounter={bombCounter}
        setCells={setCells}
        setFace={setFace}
        setGameStatus={setGameStatus}
        setBombCounter={setBombCounter}
      />
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
