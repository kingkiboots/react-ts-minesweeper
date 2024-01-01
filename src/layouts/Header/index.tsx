import './Header.scss';

import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import NumberDisplay from '../../components/NumberDisplay';
import { Face, GameStatus } from '../../types';
import { NO_OF_BOMBS } from '../../constants';
import Button from '../../components/Button';

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

const FaceComopnent = ({ face }: { face: Face }) => {
  return (
    <span role="img" aria-label="face">
      {face}
    </span>
  );
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
    setGameStatus('reset');
  }, [setGameStatus]);

  // children을 받는 컴포넌트는 메모이징을 해도 reactElement를 childre으로 주면 리렌더가 된다.
  // 그러므로 이렇게 useMemo를 통해서 하자
  const memoizedFaceComponent = useMemo(
    () => <FaceComopnent face={face} />,
    [face],
  );

  useLayoutEffect(() => {
    if (gameStatus === 'reset') {
      setTime(0);
      setFace('😄');
      setBombCounter(NO_OF_BOMBS);
    }
  }, [gameStatus]);

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
      <Button className="Face" onClick={handleFaceClick}>
        {memoizedFaceComponent}
      </Button>
      {/* time */}
      <NumberDisplay value={time} />
    </div>
  );
};

export default Header;
