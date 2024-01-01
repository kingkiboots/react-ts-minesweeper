import './Button.scss';

import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

/**
 * Button 프로퍼티즈
 */
type ButtonProps = {
  className: string;
  onClick: (...args: any[]) => void;
  onContextMenu?: (...args: any[]) => void;
  disabled?: boolean;
  children: ReactNode;
};
// forwardref 실습
const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, onClick, onContextMenu, disabled, children }, ref) => {
    const [isActive, setIsButtonActive] = useState<boolean>(false);

    const buttonRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => buttonRef.current as HTMLDivElement);

    console.log('홍냥냥냥');

    useEffect(() => {
      const button = buttonRef.current;
      if (button && !disabled) {
        const handleMouseDown = (e: MouseEvent) => {
          if (e.button === 2) return;
          setIsButtonActive(true);
        };
        const handleMouseUp = (e: MouseEvent) => {
          if (e.button === 2) return;
          setIsButtonActive(false);
        };

        button.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
          button.removeEventListener('mousedown', handleMouseDown);
          window.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [disabled]);

    // useEffect(() => {
    //   console.log('비긴어게인');
    // }, [children]);

    useEffect(() => {
      console.log('onClick');
    }, [onClick]);

    useEffect(() => {
      console.log('onContextMenu');
    }, [onContextMenu]);

    return (
      <div
        ref={buttonRef}
        draggable={false}
        className={`Button${isActive ? ' active' : ''} ${className}`}
        onClick={onClick}
        onContextMenu={onContextMenu}
        aria-disabled={disabled ?? false}
      >
        {children}
      </div>
    );
  },
);
Button.displayName = 'ButtonComponent';
export default React.memo(Button);
