import React from "react";
import styles from "./RecordedSolves.module.css";

const RecordedSolves = ({ solves, formatTime }) => {
  return (
    <div>
      <h2 className={styles.recordedSolves}>Recorded Solves</h2>
      <ul className={styles.solveList}>
        {solves.map((solve, index) => (
          <li key={index} className={styles.solveItem}>
            {solve.valid ? (
              <span className={styles.solveTime}>
                {formatTime(solve.time.seconds, solve.time.milliseconds)}
              </span>
            ) : (
              <span className={styles.solveTime}>DNF</span>
            )}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordedSolves;
