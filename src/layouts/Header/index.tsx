import './Header.scss';

import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import NumberDisplay from '../../components/NumberDisplay';
import { Cell, Face, GameStatus } from '../../types';
import { generateCells } from '../../utils';
import { NO_OF_BOMBS } from '../../constants';

/**
 * Header 프로퍼티즈
 */
type HeaderProps = {
  bodyRef: React.RefObject<HTMLDivElement>;
  gameStatus: GameStatus;
  bombCounter: number;
  setCells: React.Dispatch<SetStateAction<Cell[][]>>;
  setGameStatus: React.Dispatch<SetStateAction<GameStatus>>;
  setBombCounter: React.Dispatch<SetStateAction<number>>;
};

const Header: React.FC<HeaderProps> = ({
  bodyRef,
  gameStatus,
  bombCounter,
  setCells,
  setGameStatus,
  setBombCounter,
}) => {
  const [face, setFace] = useState<Face>('😄'); // 아직
  const [time, setTime] = useState<number>(0);

  const handleFaceClick = useCallback((): void => {
    setTime(0);
    setCells(generateCells());
    setGameStatus('unstarted');
    setBombCounter(NO_OF_BOMBS);
  }, [setTime, setCells, setGameStatus, setBombCounter]);

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

  useEffect(() => {
    const handleMouseDown = () => {
      setFace('😲');
    };
    const handleMouseUp = () => {
      setFace('😄');
    };

    const body = bodyRef.current;

    body?.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      body?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [bodyRef]);

  useEffect(() => {
    // if game is playing
    if (gameStatus === 'started' && time < 999) {
      // the timer starts coming up
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      // on unmount
      return () => {
        clearInterval(timer); // 오 이게 되네?
      };
    }
  }, [gameStatus, time]);

  return (
    <div className="Header">
      {/* amount of remaining mines */}
      <NumberDisplay value={bombCounter} />
      <div className="Face">
        <span role="img" aria-label="face" onClick={handleFaceClick}>
          {face}
        </span>
      </div>
      {/* time */}
      <NumberDisplay value={time} />
    </div>
  );
};

export default Header;
