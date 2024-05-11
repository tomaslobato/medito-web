export interface Streak {
  days: number;
  lastRecord: number;
}

export const saveStreak = () => {
  let streak: string | null = localStorage.getItem("streak");

  if (!streak) {
    const newStreak = JSON.stringify({ days: 1, lastRecord: Date.now() });
    localStorage.setItem("streak", newStreak);
    streak = newStreak
  } else {
    const parsedStreak: Streak = JSON.parse(streak);
    const timeDiff = Date.now() - parsedStreak.lastRecord;
    const hours36 = 36 * 60 * 60 * 1000;
    const hours20 = 20 * 60 * 60 * 1000;
    let newStreak: string;

    if (timeDiff > hours36) {
      const resetStreak: Streak = { days: 1, lastRecord: Date.now() };
      newStreak = JSON.stringify(resetStreak);
    } else if (timeDiff > hours20) {
      const updatedStreak: Streak = {
        days: parsedStreak.days + 1,
        lastRecord: Date.now(),
      };
      newStreak = JSON.stringify(updatedStreak);
    } else {
      newStreak = JSON.stringify({days: parsedStreak.days, lastRecord: Date.now()})
    }

    localStorage.setItem("streak", newStreak);
  }
};