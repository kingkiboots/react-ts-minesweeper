import './Header.scss';

import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import NumberDisplay from '../../components/NumberDisplay';
import { Face, GameStatus } from '../../types';
import { NO_OF_BOMBS } from '../../constants';

/**
 * Header 프로퍼티즈
 */
type HeaderProps = {
  face: Face;
  gameStatus: GameStatus;
  bombCounter: number;
  setFace: React.Dispatch<SetStateAction<Face>>;
  setGameStatus: React.Dispatch<SetStateAction<GameStatus>>;
  setBombCounter: React.Dispatch<SetStateAction<number>>;
};

const Header: React.FC<HeaderProps> = ({
  face,
  gameStatus,
  bombCounter,
  setFace,
  setGameStatus,
  setBombCounter,
}) => {
  const [time, setTime] = useState<number>(0);

  const handleFaceClick = useCallback((): void => {
    setTime(0);
    setFace('😄');
    setGameStatus('reset');
    setBombCounter(NO_OF_BOMBS);
  }, [setTime, setFace, setGameStatus, setBombCounter]);

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
      <div className="Face" onClick={handleFaceClick}>
        <span role="img" aria-label="face">
          {face}
        </span>
      </div>
      {/* time */}
      <NumberDisplay value={time} />
    </div>
  );
};

export default Header;
