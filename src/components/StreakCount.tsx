"use client";
import { useEffect, useState } from "react";
import { Streak } from "@/utils/saveStreak";

export default function StreakCount() {
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    const resetStreak = () => {
      const newStreak = JSON.stringify({ days: 0, lastRecord: Date.now() });
      localStorage.setItem("streak", newStreak);
      setStreak(JSON.parse(newStreak));
    };

    let streak: string | null = localStorage.getItem("streak");

    if (!streak) {
      resetStreak()
    } else {
      const parsedStreak: Streak = JSON.parse(streak);
      const timeDiff = Date.now() - parsedStreak.lastRecord;
      const hours36 = 36 * 60 * 60 * 1000;

      if (timeDiff > hours36) {
        resetStreak();
      } else {
        setStreak(parsedStreak);
      }
    }
  }, []);

  return (
    <a
      href="/streak"
      className="hidden md:flex absolute top-2 right-2 z-50 bg-neutral-900 text-xl text-white py-1.5 px-3 rounded-md"
    >
      Streak: {streak?.days}
    </a>
  );
}