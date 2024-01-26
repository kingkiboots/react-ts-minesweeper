import { GameLevel } from '../types';

export const MAX_ROWS = 9;
export const MAX_COLS = 9;
export const NO_OF_BOMBS = 10;

export const EASY_LEVEL: GameLevel = {
  maxRows: 9,
  maxCols: 9,
  noOfBombs: 10,
};

export const NORMAL_LEVEL: GameLevel = {
  maxRows: 15,
  maxCols: 15,
  noOfBombs: 40,
};

export const HARD_LEVEL: GameLevel = {
  maxRows: 29,
  maxCols: 15,
  noOfBombs: 99,
};

export const MIN_NO_OF_BOMBS = 3;
