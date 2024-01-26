import { GameLevel } from '../types';

export const EASY_LEVEL: GameLevel = {
  label: '초급',
  maxRows: 9,
  maxCols: 9,
  noOfBombs: 10,
};

export const NORMAL_LEVEL: GameLevel = {
  label: '중급',
  maxRows: 15,
  maxCols: 15,
  noOfBombs: 40,
};

export const HARD_LEVEL: GameLevel = {
  label: '고급',
  maxRows: 29,
  maxCols: 15,
  noOfBombs: 99,
};

export const MIN_NO_OF_BOMBS = 3;
