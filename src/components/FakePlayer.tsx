"use client";
import { useState, useEffect, useRef } from "react";
import Pause from "./Icons/Pause";
import Play from "./Icons/Play";
import FakeProgressBar from "./FakeProgressBar";
import {saveStreak} from '@/utils/saveStreak'

export default function FakePlayer({ time }: { time: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(time);
  const bellAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: any = null;

    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 60000); // Decrement time by 1 minute every 60 seconds (1 minute)
    } else if (timeLeft <= 0) {
      playBellSound();
      setTimeLeft(time);
      setIsPlaying(false);
      saveStreak();
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, time]);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => {
      if (!prevIsPlaying) {
        playBellSound();
      }
      return !prevIsPlaying;
    });
  };

  const playBellSound = () => {
    if (bellAudioRef.current === null) {
      bellAudioRef.current = new Audio("/audio/bell.mp3");
    }
    bellAudioRef.current.play();
  };

  return (
    <main className="flex flex-col h-screen text-white bg-violet-500 justify-end w-full gap-3 items-center p-10">
      <h1 className="text-4xl font-semibold w-full">
        {timeLeft} minute{timeLeft !== 1 ? "s" : ""}...
      </h1>
      <span className="w-full text-xl">
        The bell will sound again at the end of the audio
      </span>
      <FakeProgressBar time={time} timeLeft={timeLeft} />
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="hover:bg-violet-200 bg-white text-violet-950 border-2 border-violet-950 p-2 rounded-full"
          >
            {isPlaying ? <Pause size="40" /> : <Play size="40" />}
          </button>
        </div>
      </div>
    </main>
  );
}
