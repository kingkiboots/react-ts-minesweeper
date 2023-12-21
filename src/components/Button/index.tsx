import React from 'react';
import './Button.scss';
import { Cell } from '../../types';

/**
 * Button 프로퍼티즈
 */
type ButtonProps = {
  cell: Cell;
  row: number;
  col: number;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
};

const Button: React.FC<ButtonProps> = ({
  cell,
  col,
  row,
  onClick,
  onContext,
}) => {
  const { state, value } = cell;

  const renderContent = () => {
    if (state === 'visible') {
      if (value === 'bomb') {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } else if (value === 'none') {
        return null;
      } else {
        return value;
      }
    } else if (state === 'flagged') {
      return (
        <span role="img" aria-label="=flag">
          🚩
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className={`Button ${
        state === 'visible' ? 'visible' : ''
      } value-${value}`}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
