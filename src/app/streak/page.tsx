"use client";

import { Streak } from "@/utils/saveStreak";
import { useEffect, useState } from "react";

export default function Page() {
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    let streak: string | null = localStorage.getItem("streak");
    if (!streak) {
      const newStreak = JSON.stringify({ days: 1, lastRecord: Date.now() });
      localStorage.setItem("streak", newStreak);
      streak = newStreak;
    }
    setStreak(JSON.parse(streak));
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  return (
    <main className="p-4">
      <h1 className="font-mono text-4xl font-semibold">
        Streak days: {streak?.days}
      </h1>
      <span className="text-xl">
        Last time updated: {streak && formatDate(streak.lastRecord)}
      </span>
    </main>
  );
}
