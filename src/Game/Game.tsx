import { useEffect, useRef, useState } from "react";
import styles from "./Game.module.css";

interface Target {
  x: number;
  y: number;
}

interface GameProps {
  onEnd: (score: number) => void;
}

function Game({ onEnd }: GameProps) {
  // constants
  const GAME_SIZE = 400;
  const TIME_LIMIT = 10_000;
  const TICK = 100;

  // state
  const [timer, setTimer] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [target, setTarget] = useState<Target>({
    x: 0,
    y: 0,
  });
  const targetRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);

  // game functions
  const startGame = () => {
    // reset timer and score
    setTimer(TIME_LIMIT);
    setScore(0);
    setPlaying(true);

    // start timer
    timerRef.current = setInterval(() => {
      setTimer((timer) => {
        // decrement timer but don't go below 0
        const newTime = timer - TICK;
        return newTime >= 0 ? newTime : 0;
      });
    }, TICK);
  };

  const handleClick = () => {
    // increment score
    setScore((score) => score + 1);

    // get size of button
    const buttonHeight = targetRef.current?.offsetHeight || 0;
    const buttonWidth = targetRef.current?.offsetWidth || 0;

    // use size of button to calculate random location inside game board
    const x = Math.max(Math.random() * GAME_SIZE - buttonWidth, 0);
    const y = Math.max(Math.random() * GAME_SIZE - buttonHeight, 0);
    setTarget({ x, y });
  };

  useEffect(() => {
    // end game if timer reaches 0
    if (timer === 0) {
      // stop game and timer
      setPlaying(false);
      timerRef.current && clearInterval(timerRef.current);
      // call onEnd prop callback
      onEnd(score);
    }
  }, [onEnd, score, timer]);

  // render
  return (
    <div className={styles.game}>
      <div className={styles.status}>
        <span>Score: {score}</span>
        <span>Time: {(timer / 1_000).toFixed(1)}</span>
      </div>
      <div>
        <div
          className={styles.gameBoard}
          style={{
            width: `${GAME_SIZE}px`,
            height: `${GAME_SIZE}px`,
            position: "relative",
          }}
        >
          {playing && (
            <button
              className={styles.target}
              ref={targetRef}
              onClick={handleClick}
              style={{
                position: "absolute",
                left: target.x,
                top: target.y,
              }}
            >
              Hit
            </button>
          )}
          {!playing && (
            <div className={styles.intro}>
              <button onClick={startGame}>Start</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
