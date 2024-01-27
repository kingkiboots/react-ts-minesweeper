import React, { SetStateAction } from 'react';
import { EASY_LEVEL, HARD_LEVEL, NORMAL_LEVEL } from '../../../constants';
import { GameLevel } from '../../../types';
import './SelectGameLevel.scss';

/**
 * SelectGameLevel 프로퍼티즈
 */
type SelectGameLevelProps = {
  gameLevel: GameLevel;
  setGameLevel: React.Dispatch<SetStateAction<GameLevel>>;
};

const SelectGameLevel: React.FC<SelectGameLevelProps> = ({
  gameLevel,
  setGameLevel,
}) => {
  const handleClickLevel = (
    e: React.MouseEvent<HTMLAnchorElement>,
    level: GameLevel,
  ) => {
    e.preventDefault();
    setGameLevel(level);
  };

  return (
    <div className="SelectGameLevel">
      {[EASY_LEVEL, NORMAL_LEVEL, HARD_LEVEL].map((level, idx) => {
        const isActive = gameLevel.label === level.label;
        return (
          <a
            href="#"
            key={`levelSelect${idx}`}
            className={`levelSelect${isActive ? ' active' : ''}`}
            onClick={(e) => handleClickLevel(e, level)}
          >
            <span>{level.label}</span>
          </a>
        );
      })}
    </div>
  );
};

export default SelectGameLevel;
