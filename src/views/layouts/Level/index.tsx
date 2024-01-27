import React, { SetStateAction } from 'react';
import './Level.scss';
import { GameLevel } from '../../../types';
import SelectGameLevel from '../SelectGameLevel';
import SelectNoOfBombs from '../SelectNoOfBombs';

/**
 * Level 프로퍼티즈
 */
type LevelProps = {
  gameLevel: GameLevel;
  setGameLevel: React.Dispatch<SetStateAction<GameLevel>>;
};

const Level: React.FC<LevelProps> = ({ gameLevel, setGameLevel }) => {
  return (
    <div className="Level">
      <SelectGameLevel gameLevel={gameLevel} setGameLevel={setGameLevel} />
      <SelectNoOfBombs gameLevel={gameLevel} setGameLevel={setGameLevel} />
    </div>
  );
};

export default Level;
