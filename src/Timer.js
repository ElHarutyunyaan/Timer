import React, { useRef, useState } from "react";

export const Timer = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef();

  const onStart = () => {
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const onStop = (event) => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const onReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const onResume = () => {
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="timer">
      <span>Stopwatch</span>
      <div className="time">{formatTime(time)}</div>
      <form onSubmit={onSubmit}>
        {running ? (
          <button className="stopBtn" onClick={onStop}>
            Stop
          </button>
        ) : time > 0 ? (
          <>
            <button className="reset" onClick={onReset}>
              Reset
            </button>
            <button className="resume" onClick={onResume}>
              Resume
            </button>
          </>
        ) : (
          <button className="startBtn" onClick={onStart}>
            Start
          </button>
        )}
      </form>
    </div>
  );
};
