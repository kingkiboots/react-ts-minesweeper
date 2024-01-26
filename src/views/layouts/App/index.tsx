import React, { useState } from 'react';
import Main from '../Main';
import {
  MIN_NO_OF_BOMBS,
  EASY_LEVEL,
  NORMAL_LEVEL,
  HARD_LEVEL,
} from '../../../constants';
import { GameLevel, OnChangeEvent } from '../../../types';
import './App.scss';

const App = () => {
  // game setting 을 컨텍스트로 빼자.
  const [gameLevel, setGameLevel] = useState<GameLevel>(EASY_LEVEL);
  const maxOfBombs = Math.floor((gameLevel.maxCols * gameLevel.maxRows) / 2);
  const handleChange = (e: OnChangeEvent) => {
    const { value } = e.target;
    setGameLevel((prev) => ({ ...prev, noOfBombs: parseInt(value) }));
  };

  return (
    <div className="container">
      <div className="Level">
        <div className="SelectGameLevel">
          {[EASY_LEVEL, NORMAL_LEVEL, HARD_LEVEL].map((level, idx) => {
            const isActive = gameLevel.label === level.label;
            return (
              <a
                href="#"
                key={`levelSelect${idx}`}
                className={`levelSelect${isActive ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setGameLevel(level);
                }}
              >
                <span>{level.label}</span>
              </a>
            );
          })}
        </div>
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
      </div>
      <div className="App">
        <Main gameLevel={gameLevel} />
      </div>
    </div>
  );
};

export default App;
