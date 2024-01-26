import React, { useState, useEffect } from 'react';

import './Main.scss';

import { Face, GameLevel, GameStatus } from '../../../types';
import Header from '../Header';
import Body from '../Body';

/**
 * Main 컴포넌트 프로퍼티즈
 */
type MainProps = {
  gameLevel: GameLevel;
};

const Main: React.FC<MainProps> = ({ gameLevel }) => {
  const [face, setFace] = useState<Face>('😄');
  const [gameStatus, setGameStatus] = useState<GameStatus>('unstarted');
  const [bombCounter, setBombCounter] = useState<number>(gameLevel.noOfBombs);

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
    setGameStatus('reset');
    setBombCounter(gameLevel.noOfBombs);
  }, [gameLevel]);

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
    <div className="Main">
      <Header
        face={face}
        gameStatus={gameStatus}
        bombCounter={bombCounter}
        noOfBombs={gameLevel.noOfBombs}
        setFace={setFace}
        setGameStatus={setGameStatus}
        setBombCounter={setBombCounter}
      />
      <Body
        gameStatus={gameStatus}
        bombCounter={bombCounter}
        gameLevel={gameLevel}
        setFace={setFace}
        setGameStatus={setGameStatus}
        setBombCounter={setBombCounter}
      />
    </div>
  );
};

export default Main;
