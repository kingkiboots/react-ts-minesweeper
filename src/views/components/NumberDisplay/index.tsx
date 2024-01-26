import React from 'react';
import './NumberDisplay.scss';
/**
 * NumberDisplay 프로퍼티즈
 */
type NumberDisplayProps = {
  value: number;
};

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value }) => {
  return (
    <div className="NumberDisplay">
      {value < 0
        ? `-${Math.abs(value).toString().padStart(2, '0')}`
        : value.toString().padStart(3, '0')}
    </div>
  );
};

export default NumberDisplay;
