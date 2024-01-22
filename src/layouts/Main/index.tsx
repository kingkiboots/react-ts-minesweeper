import React, { useState, useEffect } from 'react';

import './Main.scss';

import { Face, GameStatus } from '../../types';
import Header from '../Header';
import Body from '../Body';

/**
 * Main 컴포넌트 프로퍼티즈
 */
type MainProps = {
  numberOfBombs: number;
};

const Main: React.FC<MainProps> = (props) => {
  const [face, setFace] = useState<Face>('😄');
  const [gameStatus, setGameStatus] = useState<GameStatus>('unstarted');
  const [bombCounter, setBombCounter] = useState<number>(props.numberOfBombs);

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
    setBombCounter(props.numberOfBombs);
  }, [props.numberOfBombs]);

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
        noOfBombs={props.numberOfBombs}
        setFace={setFace}
        setGameStatus={setGameStatus}
        setBombCounter={setBombCounter}
      />
      <Body
        gameStatus={gameStatus}
        bombCounter={bombCounter}
        noOfBombs={props.numberOfBombs}
        setFace={setFace}
        setGameStatus={setGameStatus}
        setBombCounter={setBombCounter}
      />
    </div>
  );
};

export default Main;
