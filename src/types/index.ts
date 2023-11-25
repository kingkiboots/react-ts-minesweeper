export type CellValue =
  | 'none'
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'bomb';

export type CellState = 'unknown' | 'visible' | 'flagged';

export type Cell = { value: CellValue; state: CellState };
