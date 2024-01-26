import React, {
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { CellProps, Face, GameLevel, GameStatus } from '../../../types';
import { generateCells, openMultipleCells } from '../../../utils';
import Cell from '../Cell';

/**
 * Body 프로퍼티즈
 */
type BodyProps = {
  gameStatus: GameStatus;
  bombCounter: number;
  gameLevel: GameLevel;
  setFace: React.Dispatch<SetStateAction<Face>>;
  setGameStatus: React.Dispatch<SetStateAction<GameStatus>>;
  setBombCounter: React.Dispatch<SetStateAction<number>>;
};

const Body: React.FC<BodyProps> = ({
  gameStatus,
  gameLevel,
  setFace,
  setGameStatus,
  setBombCounter,
}) => {
  const [cells, setCells] = useState<CellProps[][]>(generateCells(gameLevel));

  // console.log('cells', cells);

  const handleCellClick = useCallback(
    (rowParam: number, colParam: number) => (): void => {
      if (['hasLost', 'hasWon'].includes(gameStatus)) {
        return;
      }

      let newCells = cells.slice();
      // when starting the game
      // 시작한 단계가 아니라면
      if (['unstarted', 'reset'].includes(gameStatus)) {
        let isCurrentCellBomb = newCells[rowParam][colParam].value === 'bomb';
        while (isCurrentCellBomb) {
          newCells = generateCells(gameLevel);
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
        // TODO: 만약 value가 1이고 그 주변의 flag 수가 같다면 그 주변의 cell 들이 flag 된거 말고 열림
        newCells = openMultipleCells(newCells, rowParam, colParam, gameLevel);
      } else {
        newCells[rowParam][colParam].state = 'visible';
        // setCells(newCells); // do it after checking has won
      }
      const { maxRows: MAX_ROWS, maxCols: MAX_COLS } = gameLevel;

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
    },
    [gameStatus, gameLevel, cells, setGameStatus, setCells, setBombCounter],
  );

  const handleCellContext = useCallback(
    (currentCell: CellProps, rowParam: number, colParam: number) =>
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();

        if (currentCell.state === 'visible') {
          return;
        }
        const updateCells = (prevCells: CellProps[][]) => {
          const _cells = prevCells.slice(); // copy array

          if (currentCell.state === 'unknown') {
            _cells[rowParam][colParam].state = 'flagged';
            setBombCounter((prev) => prev - 1);
            if (['unstarted', 'reset'].includes(gameStatus)) {
              setGameStatus('started');
            }
            return _cells;
          }
          _cells[rowParam][colParam].state = 'unknown';
          setBombCounter((prev) => prev + 1);
          return _cells;
        };
        setCells(updateCells);
      },
    [setCells, setBombCounter, gameLevel, gameStatus, setGameStatus],
  );

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

  useLayoutEffect(() => {
    if (gameStatus === 'reset') setCells(generateCells(gameLevel));
  }, [gameStatus, gameLevel]);

  return <div className="Body">{renderCells()}</div>;
};

export default Body;
