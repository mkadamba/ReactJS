import React, { useState, useEffect } from "react";
import "./styles.css";

type GameState = "playing" | "gameover";

export default function App() {
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [gameState, setGameState] = useState<GameState>("playing");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    } else if (time === 0) {
      setGameState("gameover");
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(30);
    setIsRunning(false);
    setGameState("playing");
  };

  return (
    <div className="App">
      {gameState === "playing" ? (
        <>
          <h1>Timer: {time}</h1>
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleReset}>Reset</button>
        </>
      ) : (
        <>
          <h1>Game Over!</h1>
          <button onClick={handleReset}>Play Again</button>
        </>
      )}
    </div>
  );
}
