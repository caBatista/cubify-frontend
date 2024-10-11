import React from "react";
import styles from "./TimerDisplay.module.css";

const TimerDisplay = ({
  isRunning,
  time,
  countdown,
  isHolding,
  lastSolveTime,
}) => {
  const formatTime = (seconds, milliseconds) => {
    const totalSeconds = seconds + milliseconds / 1000;
    return totalSeconds.toFixed(2);
  };

  return (
    <div className={styles.container}>
      {isRunning ? (
        <p className={`${styles.text} ${styles.running}`}>
          {formatTime(time.seconds, time.milliseconds)}
        </p>
      ) : (
        <div>
          {countdown !== null ? (
            <p
              className={`${styles.text} ${styles.inCountdown} ${
                isHolding ? styles.onHold : ""
              }`}
            >
              {countdown}
            </p>
          ) : (
            <p
              className={`${styles.text} ${styles.notRunning} ${
                isHolding ? styles.onHold : styles.white
              }`}
            >
              {lastSolveTime
                ? formatTime(lastSolveTime.seconds, lastSolveTime.milliseconds)
                : formatTime(time.seconds, time.milliseconds)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimerDisplay;
