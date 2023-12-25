import './Header.scss';

import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import NumberDisplay from '../../components/NumberDisplay';
import { CellProps, Face, GameStatus } from '../../types';
import { generateCells } from '../../utils';
import { NO_OF_BOMBS } from '../../constants';

/**
 * Header 프로퍼티즈
 */
type HeaderProps = {
  face: Face;
  gameStatus: GameStatus;
  bombCounter: number;
  setCells: React.Dispatch<SetStateAction<CellProps[][]>>;
  setFace: React.Dispatch<SetStateAction<Face>>;
  setGameStatus: React.Dispatch<SetStateAction<GameStatus>>;
  setBombCounter: React.Dispatch<SetStateAction<number>>;
};

const Header: React.FC<HeaderProps> = ({
  face,
  gameStatus,
  bombCounter,
  setCells,
  setFace,
  setGameStatus,
  setBombCounter,
}) => {
  const [time, setTime] = useState<number>(0);

  const handleFaceClick = useCallback((): void => {
    setTime(0);
    setCells(generateCells());
    setFace('😄');
    setGameStatus('unstarted');
    setBombCounter(NO_OF_BOMBS);
  }, [setTime, setCells, setFace, setGameStatus, setBombCounter]);

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
