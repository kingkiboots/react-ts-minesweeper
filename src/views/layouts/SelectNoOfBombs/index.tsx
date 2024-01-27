import React, { SetStateAction } from 'react';
import { GameLevel, OnChangeEvent } from '../../../types';
import { MIN_NO_OF_BOMBS } from '../../../constants';

/**
 * SelectNoOfBombs 프로퍼티즈
 */
type SelectNoOfBombsProps = {
  gameLevel: GameLevel;
  setGameLevel: React.Dispatch<SetStateAction<GameLevel>>;
};

const SelectNoOfBombs: React.FC<SelectNoOfBombsProps> = ({
  gameLevel,
  setGameLevel,
}) => {
  const maxOfBombs = Math.floor((gameLevel.maxCols * gameLevel.maxRows) / 2);
  const handleChange = (e: OnChangeEvent) => {
    const { value } = e.target;
    setGameLevel((prev) => ({ ...prev, noOfBombs: parseInt(value) }));
  };
  return (
    <div className="SelectNoOfBombs">
      <label>지뢰개수 선택 : </label>
      <select value={gameLevel.noOfBombs} onChange={handleChange}>
        {Array(maxOfBombs - MIN_NO_OF_BOMBS + 1)
          .fill(null)
          .map((_, idx) => {
            const value = idx + MIN_NO_OF_BOMBS;
            return (
              <option key={`selectNumberOfBombs${value}`} value={value}>
                {value}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SelectNoOfBombs;
