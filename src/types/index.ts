export type CellValue = 'none' | 'bomb' | number;

export type CellState = 'unknown' | 'visible' | 'flagged';

export type CellProps = { value: CellValue; state: CellState; red?: boolean };

export type Face = '😄' | '😲' | '😵' | '😎';

export type GameStatus =
  | 'unstarted'
  | 'reset'
  | 'started'
  | 'hasLost'
  | 'hasWon';
