import { MAX_COLS, MAX_ROWS } from '../constants';
import { Cell } from '../types';

export const generateCells = (): Cell[][] => {
  const cells: Cell[][] = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        // -1 : bomb, 0: empty, 1-9: 주변 지뢰 수. 근데 이걸 기억하기 어려움
        value: 'none',
        state: 'unknown',
      });
    }
  }

  return cells;
};
