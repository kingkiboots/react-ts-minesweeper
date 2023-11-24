import React from 'react';
import './NumberDisplay.scss';
/**
 * NumberDisplay 프로퍼티즈
 */
type NumberDisplayProps = {
  value: number;
};

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value }) => {
  return <div className="NumberDisplay">{String(value).padStart(3, '0')}</div>;
};

export default NumberDisplay;
