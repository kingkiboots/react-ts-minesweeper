import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from '../constants';
import { Cell } from '../types';

export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];

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
  while (bombsPlaced < NO_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS); // 1-8
    const randomCol = Math.floor(Math.random() * MAX_COLS); // 1-8

    const currentCell = cells[randomRow][randomCol];
    // bomb가 아닌 것들만, bomb가 9개 될때까지 이 반복문을 돌림
    if (currentCell.value !== 'bomb') {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              state: cell.state,
              value: 'bomb',
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
      const topLeftBomb =
        rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
      const topBomb = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
      const topRightBomb =
        rowIndex > 0 && colIndex < MAX_COLS - 1
          ? cells[rowIndex - 1][colIndex + 1]
          : null;
      const leftBomb = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
      const rightBomb =
        colIndex < MAX_COLS - 1 ? cells[rowIndex][colIndex + 1] : null;
      const bottomLeftBomb =
        rowIndex < MAX_ROWS - 1 && colIndex > 0
          ? cells[rowIndex + 1][colIndex - 1]
          : null;
      const bottomBomb =
        rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null;
      const bottomRightBomb =
        rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLS - 1
          ? cells[rowIndex + 1][colIndex + 1]
          : null;

      if (topLeftBomb?.value === 'bomb') numberOfBombs++;
      if (topBomb?.value === 'bomb') numberOfBombs++;
      if (topRightBomb?.value === 'bomb') numberOfBombs++;
      if (leftBomb?.value === 'bomb') numberOfBombs++;
      if (rightBomb?.value === 'bomb') numberOfBombs++;
      if (bottomLeftBomb?.value === 'bomb') numberOfBombs++;
      if (bottomBomb?.value === 'bomb') numberOfBombs++;
      if (bottomRightBomb?.value === 'bomb') numberOfBombs++;

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
