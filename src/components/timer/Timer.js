import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import TimerDisplay from "../timer_display/TimerDisplay";
import RecordedSolves from "../recorded_solves/RecordedSolves";
import { Scrambow } from "scrambow";
import Solve from "../../models/Solve";
import SolveService from "../../services/SolveService";
import styles from "./Timer.module.css";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState({ seconds: 0, milliseconds: 0 });
  const [countdown, setCountdown] = useState(null);
  const [scramble, setScramble] = useState("");
  const [solves, setSolves] = useState([]);
  const [cooldown, setCooldown] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [lastSolveTime, setLastSolveTime] = useState(null);

  useEffect(() => {
    setScramble(generateScramble());
    fetchSolves();
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const newMilliseconds = prevTime.milliseconds + 10;
          const newSeconds =
            prevTime.seconds + Math.floor(newMilliseconds / 1000);
          return {
            seconds: newSeconds,
            milliseconds: newMilliseconds % 1000,
          };
        });
      }, 10);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    const handleKeyUp = (event) => {
      setIsHolding(false);
      if (event.code === "Space" && !cooldown) {
        setIsHolding(false);
        if (!isRunning) {
          if (countdown === null) {
            setCountdown(15);
          } else {
            setCountdown(null);
            setIsRunning(true);
          }
        }
      }
    };

    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setIsHolding(true);
        if (isRunning) {
          const solve = new Solve(1, time, scramble, true);
          console.log(solve);
          saveSolve(solve);
          setLastSolveTime(time);
          setTime({ seconds: 0, milliseconds: 0 });
          setIsRunning(false);
          setScramble(generateScramble());
          setCooldown(true);
          setTimeout(() => setCooldown(false), 1000);
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRunning, countdown, time, scramble, cooldown]);

  useEffect(() => {
    let countdownTimer;
    if (countdown !== null && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      const solve = new Solve(
        1,
        { seconds: 0, milliseconds: 0 },
        scramble,
        false
      );
      console.log(solve);
      saveSolve(solve);
      setCountdown(null);
    }

    return () => clearInterval(countdownTimer);
  }, [countdown, scramble]);

  const generateScramble = () => {
    const scrambler = new Scrambow();
    return scrambler.setType("333").get()[0].scramble_string;
  };

  const formatTime = (seconds, milliseconds) => {
    const totalSeconds = seconds + milliseconds / 1000;
    return totalSeconds.toFixed(2);
  };

  const saveSolve = async (solve) => {
    try {
      await SolveService.saveSolve(solve);
      setSolves((prevSolves) => [...prevSolves, solve]);
    } catch (error) {
      console.error("Error saving solve:", error);
    }
  };

  const fetchSolves = async () => {
    try {
      const response = await SolveService.getSolves();
      const fetchedSolves = response.content;
      setSolves(fetchedSolves);
    } catch (error) {
      console.error("Error fetching solves:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Header scramble={scramble} className={styles.header} />
      <TimerDisplay
        isRunning={isRunning}
        time={time}
        countdown={countdown}
        isHolding={isHolding}
        lastSolveTime={lastSolveTime}
        className={styles.timerDisplay}
      />
      <RecordedSolves solves={solves} formatTime={formatTime} />
    </div>
  );
};

export default Timer;
