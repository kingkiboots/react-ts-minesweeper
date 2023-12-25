import React, { SetStateAction, useCallback, useEffect, useRef } from 'react';
import './Button.scss';
import { CellProps, Face, GameStatus } from '../../types';

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

  useEffect(() => {
    if (
      state === 'unknown' &&
      ['unstarted', 'reset', 'started'].includes(gameStatus)
    ) {
      const handleMouseDown = () => {
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

  return (
    <div
      ref={cellRef}
      draggable={false}
      className={`Button ${
        state === 'visible' ? 'visible' : ''
      } value-${value} ${cell.red ? 'red' : ''}`}
      onClick={onClick(row, col)}
      onContextMenu={onContext(cell, row, col)}
    >
      {renderContent()}
    </div>
  );
};

export default Cell;
