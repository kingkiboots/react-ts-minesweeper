export type CellValue = 'none' | 'bomb' | number;

export type CellState = 'unknown' | 'visible' | 'flagged';

export type CellProps = { value: CellValue; state: CellState; red?: boolean };

export type Face = '😄' | '😲' | '😵' | '😎';

type GameLevelLabel = '초급' | '중급' | '고급';

export type GameLevel = {
  label: GameLevelLabel;
  maxRows: number;
  maxCols: number;
  noOfBombs: number;
};

export type GameStatus =
  | 'unstarted'
  | 'reset'
  | 'started'
  | 'hasLost'
  | 'hasWon';

export type OnChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
> & {
  target: { value: string | boolean; listIndex?: number };
};
