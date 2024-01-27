import React, { useState } from 'react';
import Main from '../Main';
import { EASY_LEVEL } from '../../../constants';
import { GameLevel } from '../../../types';
import './App.scss';
import Level from '../Level';

/* eslint-disable @typescript-eslint/no-empty-function */
if (process.env.REACT_APP_ACTIVE === 'PROD') {
  console.log = () => {};
  console.debug = () => {};
}

const App = () => {
  // game setting 을 컨텍스트로 빼자.
  const [gameLevel, setGameLevel] = useState<GameLevel>(EASY_LEVEL);
  return (
    <div className="container">
      <Level gameLevel={gameLevel} setGameLevel={setGameLevel} />
      <div className="App">
        <Main gameLevel={gameLevel} />
      </div>
    </div>
  );
};

export default App;
