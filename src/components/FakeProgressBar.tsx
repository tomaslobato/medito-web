import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  time: number;
  timeLeft: number;
}

export default function FakeProgressBar({ time, timeLeft }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const progressValue = ((time - timeLeft) / time) * 100;
      setProgress(progressValue);
    };

    calculateProgress()
  }, [time, timeLeft]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-violet-600 h-4 rounded-full z-50 flex"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}