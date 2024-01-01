import React, { useState, useEffect } from 'react';

import './App.scss';

import { Face, GameStatus } from '../../types';
import { NO_OF_BOMBS } from '../../constants';
import Header from '../Header';
import Body from '../Body';

const App: React.FC = () => {
  const [face, setFace] = useState<Face>('😄');
  const [gameStatus, setGameStatus] = useState<GameStatus>('unstarted');
  const [bombCounter, setBombCounter] = useState<number>(NO_OF_BOMBS);

  useEffect(() => {
    const handlePressSpace = (e: KeyboardEvent) => {
      if (e.key !== ' ') return;
      setGameStatus('reset');
    };
    window.addEventListener('keydown', handlePressSpace);
    return () => {
      window.removeEventListener('keydown', handlePressSpace);
    };
  }, []);

  useEffect(() => {
    if (['unstarted', 'reset', 'started'].includes(gameStatus)) {
      const handleMouseUp = () => {
        setFace('😄');
      };
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus === 'hasLost') {
      setFace('😵');
      return;
    }
    if (gameStatus === 'hasWon') {
      setFace('😎');
      return;
    }
  }, [gameStatus]);

  return (
    <div className="App">
      <Header
        face={face}
        gameStatus={gameStatus}
        bombCounter={bombCounter}
        setFace={setFace}
        setGameStatus={setGameStatus}
        setBombCounter={setBombCounter}
      />
      <Body
        gameStatus={gameStatus}
        bombCounter={bombCounter}
        setFace={setFace}
        setGameStatus={setGameStatus}
        setBombCounter={setBombCounter}
      />
    </div>
  );
};

export default App;
