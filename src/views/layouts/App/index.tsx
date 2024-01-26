import React, { useLayoutEffect, useState } from 'react';
import Main from '../Main';
import { NO_OF_BOMBS, MIN_NO_OF_BOMBS, EASY_LEVEL } from '../../../constants';
import { GameLevel, OnChangeEvent } from '../../../types';

const App = () => {
  // game setting 을 컨텍스트로 빼자.
  const [gameLevel, setGameLevel] = useState<GameLevel>(EASY_LEVEL);
  const [numberOfBombs, setNumberOfBombs] = useState<number>(NO_OF_BOMBS);

  const handleChange = (e: OnChangeEvent) => {
    const { value } = e.target;
    setNumberOfBombs(parseInt(value));
  };

  useLayoutEffect(() => {
    setGameLevel((prev) => ({ ...prev, noOfBombs: numberOfBombs }));
  }, [numberOfBombs]);

  return (
    <div className="container">
      <div className="Level">
        <label>지뢰개수 선택 : </label>
        <select
          value={numberOfBombs}
          name="numberOfBombs"
          onChange={handleChange}
        >
          {Array(NO_OF_BOMBS - MIN_NO_OF_BOMBS + 1)
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
      <div className="App">
        <Main gameLevel={gameLevel} />
      </div>
    </div>
  );
};

export default App;
