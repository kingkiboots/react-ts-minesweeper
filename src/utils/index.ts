import { CellProps, GameLevel } from '../types';

const grabAllAdjacentCells = (
  cells: CellProps[][],
  rowParam: number,
  colParam: number,
  maxRows: number,
  maxCols: number,
): {
  topLeftCell: CellProps | null;
  topCell: CellProps | null;
  topRightCell: CellProps | null;
  leftCell: CellProps | null;
  rightCell: CellProps | null;
  bottomLeftCell: CellProps | null;
  bottomCell: CellProps | null;
  bottomRightCell: CellProps | null;
} => {
  const topLeftCell =
    rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  const topRightCell =
    rowParam > 0 && colParam < maxCols - 1
      ? cells[rowParam - 1][colParam + 1]
      : null;
  const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
  const rightCell =
    colParam < maxCols - 1 ? cells[rowParam][colParam + 1] : null;
  const bottomLeftCell =
    rowParam < maxRows - 1 && colParam > 0
      ? cells[rowParam + 1][colParam - 1]
      : null;
  const bottomCell =
    rowParam < maxRows - 1 ? cells[rowParam + 1][colParam] : null;
  const bottomRightCell =
    rowParam < maxRows - 1 && colParam < maxCols - 1
      ? cells[rowParam + 1][colParam + 1]
      : null;
  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};

export const generateCells = (gameLevel: GameLevel): CellProps[][] => {
  let cells: CellProps[][] = [];
  const { maxRows: MAX_ROWS, maxCols: MAX_COLS, noOfBombs } = gameLevel;

  // generating all cells
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        // -1 : bomb, 0: empty, 1-9: 주변 지뢰 수. 근데 이걸 기억하기 어려움
        value: 'none',
        state: 'unknown', // TODO: Make this open later!!!
      });
    }
  }

  // randomly put 10 bombs
  let bombsPlaced = 0;
  while (bombsPlaced < noOfBombs) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS); // 1-8
    const randomCol = Math.floor(Math.random() * MAX_COLS); // 1-8

    const currentCell = cells[randomRow][randomCol];
    // bomb가 아닌 것들만, bomb가 9개 될때까지 이 반복문을 돌림
    if (currentCell.value !== 'bomb') {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              value: 'bomb',
              state: cell.state,
            };
          }
          return cell;
        }),
      );
      bombsPlaced++;
    }
  }

  // calculate the numbers for each cell
  // so... another crazy for loop
  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value === 'bomb') continue;
      let numberOfBombs = 0;
      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell,
      } = grabAllAdjacentCells(cells, rowIndex, colIndex, MAX_ROWS, MAX_COLS);

      if (topLeftCell?.value === 'bomb') numberOfBombs++;
      if (topCell?.value === 'bomb') numberOfBombs++;
      if (topRightCell?.value === 'bomb') numberOfBombs++;
      if (leftCell?.value === 'bomb') numberOfBombs++;
      if (rightCell?.value === 'bomb') numberOfBombs++;
      if (bottomLeftCell?.value === 'bomb') numberOfBombs++;
      if (bottomCell?.value === 'bomb') numberOfBombs++;
      if (bottomRightCell?.value === 'bomb') numberOfBombs++;

      if (numberOfBombs > 0) {
        cells[rowIndex][colIndex] = {
          ...currentCell,
          value: numberOfBombs,
        };
      }
    }
  }
  return cells;
};

export const openMultipleCells = (
  cells: CellProps[][],
  rowParam: number,
  colParam: number,
  gameLevel: GameLevel,
): CellProps[][] => {
  const currentCell = cells[rowParam][colParam];
  const { maxRows: MAX_ROWS, maxCols: MAX_COLS } = gameLevel;

  if (currentCell.state === 'visible' || currentCell.state === 'flagged') {
    return cells; // 플래그 꽂혀있는것도 고려해야함
  }

  let newCells = cells.slice();
  newCells[rowParam][colParam].state = 'visible';

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = grabAllAdjacentCells(cells, rowParam, colParam, MAX_ROWS, MAX_COLS);

  if (topLeftCell?.state === 'unknown' && topLeftCell.value !== 'bomb') {
    if (topLeftCell.value === 'none') {
      // open more more cells
      newCells = openMultipleCells(
        newCells,
        rowParam - 1,
        colParam - 1,
        gameLevel,
      );
    } else {
      newCells[rowParam - 1][colParam - 1].state = 'visible';
    }
  }
  if (topCell?.state === 'unknown' && topCell.value !== 'bomb') {
    if (topCell.value === 'none') {
      // open more more cells
      newCells = openMultipleCells(newCells, rowParam - 1, colParam, gameLevel);
    } else {
      newCells[rowParam - 1][colParam].state = 'visible';
    }
  }
  if (topRightCell?.state === 'unknown' && topRightCell.value !== 'bomb') {
    if (topRightCell.value === 'none') {
      // open more more cells
      newCells = openMultipleCells(
        newCells,
        rowParam - 1,
        colParam + 1,
        gameLevel,
      );
    } else {
      newCells[rowParam - 1][colParam + 1].state = 'visible';
    }
  }
  if (leftCell?.state === 'unknown' && leftCell.value !== 'bomb') {
    if (leftCell.value === 'none') {
      // open more more cells
      newCells = openMultipleCells(newCells, rowParam, colParam - 1, gameLevel);
    } else {
      newCells[rowParam][colParam - 1].state = 'visible';
    }
  }
  if (rightCell?.state === 'unknown' && rightCell.value !== 'bomb') {
    if (rightCell.value === 'none') {
      // open more more cells
      newCells = openMultipleCells(newCells, rowParam, colParam + 1, gameLevel);
    } else {
      newCells[rowParam][colParam + 1].state = 'visible';
    }
  }
  if (bottomLeftCell?.state === 'unknown' && bottomLeftCell.value !== 'bomb') {
    if (bottomLeftCell.value === 'none') {
      // open more more cells
      newCells = openMultipleCells(
        newCells,
        rowParam + 1,
        colParam - 1,
        gameLevel,
      );
    } else {
      newCells[rowParam + 1][colParam - 1].state = 'visible';
    }
  }
  if (bottomCell?.state === 'unknown' && bottomCell.value !== 'bomb') {
    if (bottomCell.value === 'none') {
      // open more more cells
      newCells = openMultipleCells(newCells, rowParam + 1, colParam, gameLevel);
    } else {
      newCells[rowParam + 1][colParam].state = 'visible';
    }
  }
  if (
    bottomRightCell?.state === 'unknown' &&
    bottomRightCell.value !== 'bomb'
  ) {
    if (bottomRightCell.value === 'none') {
      // open more more cells
      newCells = openMultipleCells(
        newCells,
        rowParam + 1,
        colParam + 1,
        gameLevel,
      );
    } else {
      newCells[rowParam + 1][colParam + 1].state = 'visible';
    }
  }

  return newCells;
};
