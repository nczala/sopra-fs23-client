import { useState, useEffect } from "react";

const CountDownTimer = ({ clearCanvas }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEndOfRound, setIsEndofRound] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [round, setRound] = useState(1);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (remainingTime > 0 && !isGameOver) {
          updateRemaingTime();
        } else if (!isEndOfRound) {
          setIsEndofRound(true);
          setRemainingTime(10);
        } else if (isEndOfRound && round < 2) {
          clearCanvas();
          setRound((round) => round + 1);
          setIsEndofRound(false);
          setRemainingTime(5);
        } else {
          clearCanvas();
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [remainingTime, isRunning, isEndOfRound]);

  function updateRemaingTime() {
    setRemainingTime((remainingTime) => remainingTime - 1);
  }

  function startTimer() {
    if (remainingTime == 0) {
      setIsEndofRound(false);
      setRemainingTime(5);
      setIsRunning(true);
      setRound(1);
    }
  }

  return (
    <div>
      {remainingTime} seconds
      <button
        onClick={() => startTimer()}
        style={{ height: "20px", width: "50px" }}
      >
        Start
      </button>
      {round} round
      {isEndOfRound ? " Round Result" : " Drawing"}
    </div>
  );
};

export default CountDownTimer;
