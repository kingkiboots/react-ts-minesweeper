export type CellValue = 'none' | 'bomb' | number;

export type CellState = 'unknown' | 'visible' | 'flagged';

export type Cell = { value: CellValue; state: CellState };
