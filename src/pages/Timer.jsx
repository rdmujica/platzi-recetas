import React, { useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);

  const start = async () => {
    let timerValue = timer;
    setTimeLeft(timerValue);
    const countdownInterval = setInterval(() => {
      timerValue -= 1;
      setTimeLeft(timerValue);
      if (timerValue < 1) {
        clearInterval(countdownInterval);
        showNotification();
      }
    }, 1000);
  };

  const showNotification = async () => {
    // TODO: Por definir
  };

  const handleChange = (event) => {
    event.preventDefault();
    setTimer(event.target.value);
  };

  return (
    <div className="Timer">
      <div className="name">Timer</div>
      {timeLeft === 0 ? (
        <div className="center">
          <input
            type="number"
            min="0"
            max="999"
            step="1"
            value={timer}
            onChange={handleChange}
          />
          <button onClick={start}>Start</button>
        </div>
      ) : (
        <div className="timeLeft">{timeLeft}s</div>
      )}
    </div>
  );
};

export default Timer;
