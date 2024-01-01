import React, { SetStateAction, useCallback, useEffect, useRef } from 'react';
import './Cell.scss';
import { CellProps, Face, GameStatus } from '../../types';
import Button from '../../components/Button';

/**
 * Cell 프로퍼티즈
 */
type CellComponentProps = {
  cell: CellProps;
  gameStatus: GameStatus;
  row: number;
  col: number;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  // onContext(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(
    cell: CellProps,
    rowParam: number,
    colParam: number,
  ): (...args: any[]) => void;
  setFace: React.Dispatch<SetStateAction<Face>>;
};

const Cell: React.FC<CellComponentProps> = ({
  cell,
  gameStatus,
  col,
  row,
  onClick,
  onContext,
  setFace,
}) => {
  const { state, value } = cell;
  const cellRef = useRef<HTMLDivElement>(null);
  const isVisible = state === 'visible';

  useEffect(() => {
    if (
      state !== 'visible' &&
      ['unstarted', 'reset', 'started'].includes(gameStatus)
    ) {
      const handleMouseDown = () => {
        if (state === 'flagged') return;

        setFace('😲');
      };
      const cell = cellRef.current;
      cell?.addEventListener('mousedown', handleMouseDown);
      return () => {
        cell?.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [state, gameStatus]);

  const renderContent = useCallback(() => {
    if (state === 'unknown') {
      return null;
    }
    if (state === 'flagged') {
      return (
        <span role="img" aria-label="flag">
          🚩
        </span>
      );
    }
    // Finally, when the state is 'visible'
    if (value === 'bomb') {
      return (
        <span role="img" aria-label="bomb">
          💣
        </span>
      );
    }
    if (value === 'none') {
      return null;
    }
    return value;
  }, [state, value]);

  const memoizedOnClick = useCallback(onClick(row, col), [onClick, row, col]);

  const memoizedOnContext = useCallback(onContext(cell, row, col), [
    onContext,
    cell,
    row,
    col,
  ]);

  return (
    <Button
      ref={cellRef}
      className={`Cell ${row}_${col} ${state}${
        isVisible ? ` value-${value}` : ''
      }${cell.red ? ' red' : ''}`}
      onClick={memoizedOnClick}
      onContextMenu={memoizedOnContext}
      disabled={state === 'flagged' || gameStatus === 'hasLost'}
    >
      {renderContent()}
    </Button>
  );
};

export default Cell;
