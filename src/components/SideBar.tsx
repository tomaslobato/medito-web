"use client";

import { useEffect, useState } from "react";
import Close from "./Icons/Close";
import Play from "./Icons/Play";
import Open from "./Icons/Open";
import Star from "./Icons/Star";
import Link from "next/link";
import { Streak } from "@/utils/saveStreak";

export default function SideBar() {
  const [hidden, setHidden] = useState(false);
  const [selected, setSelected] = useState("5");
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    const resetStreak = () => {
      const newStreak = JSON.stringify({ days: 0, lastRecord: Date.now() });
      localStorage.setItem("streak", newStreak);
      setStreak(JSON.parse(newStreak));
    };

    let streak: string | null = localStorage.getItem("streak");

    if (!streak) {
      resetStreak();
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

  const toggleSideBar = () => setHidden(!hidden);

  const handleOptionChange = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    setSelected(ev.target?.value);

  return (
    <>
      <aside
        id="sidebar"
        className={`z-50 text-center md:flex flex-col w-screen md:w-72 lg:w-96 h-screen border-r border-black px-4 py-2 font-mono justify-between bg-white ${
          hidden ? "flex absolute" : "hidden"
        }`}
      >
        <div>
          <div className="flex justify-between pb-3">
            <Link href="/" className="text-4xl text-violet-700 font-bold">
              medito-web
            </Link>
            <div className="flex items-center gap-2">
              <a
                href="/streak"
                className="md:hidden p-2 border border-black rounded-lg hover:bg-black hover:text-white"
              >
                Streak: {streak?.days}
              </a>
              <button
                className="md:hidden p-2 border border-black rounded-lg hover:bg-black hover:text-white"
                onClick={toggleSideBar}
              >
                <Close />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <div className="rounded-xl flex flex-col h-32 justify-center items-center border-black border gap-2 hover:h-40 lg:hover:h-40 transition-all sidebar-parent-div">
              <h3 className="text-2xl lg:text-3xl">Timer</h3>
              <p className="text-lg lg:text-xl w-60">
                You set the time for the session
              </p>
              <form className="hidden gap-2 text-lg lg:text-xl">
                <select
                  className="border-black border"
                  onChange={handleOptionChange}
                >
                  <option value="5">5min</option>
                  <option value="10">10min</option>
                  <option value="15">15min</option>
                  <option value="20">20min</option>
                  <option value="30">30min</option>
                </select>
                <Link
                  href={`/play/timer/${selected}`}
                  className="bg-black text-white p-2 hover:bg-white hover:text-black border border-black"
                >
                  <Play size="20" />
                </Link>
              </form>
            </div>

            <div className="rounded-xl flex flex-col justify-center items-center border-black border gap-2 h-40 hover:h-56 transition-all sidebar-parent-div">
              <h3 className="text-2xl md:text-3xl w-64">Learn to meditate</h3>
              <p className="text-lg lg:text-xl w-60">
                With Medito{"'"}s begginer course
              </p>
              <ul className="hidden flex-col text-lg md:text-xl gap-1">
                <li className="flex items-center gap-2 w-full border-black border px-3 hover:cursor-pointer hover:text-white hover:bg-black lg:text-2xl">
                  <Play size="20" />
                  <Link href="/play/learn-day-1">Day 1</Link>
                </li>
                <li className="flex items-center gap-2 w-full border-black border px-3 hover:cursor-pointer hover:text-white hover:bg-black lg:text-2xl">
                  <Play size="20" />
                  <Link href="/play/learn-day-2">Day 2</Link>
                </li>
                <li className="flex items-center gap-2 w-full border-black border px-3 hover:cursor-pointer hover:text-white hover:bg-black lg:text-2xl">
                  <Link href="/learn">more...</Link>
                </li>
              </ul>
            </div>

            <div className="rounded-xl flex flex-col h-40 justify-center items-center border-black border gap-2 hover:h-56 transition-all sidebar-parent-div">
              <h3 className="text-2xl md:text-3xl md:w-64 w-72">
                Music for meditation
              </h3>

              <ul className="hidden flex-col text-lg lg:text-2xl gap-1">
                <li className="flex items-center gap-2 w-full border-black border px-2 hover:cursor-pointer hover:text-white hover:bg-black">
                  <Play size="20" />
                  <Link href="/play/music-focus">Focus Song</Link>
                </li>
                <li className="flex items-center gap-2 w-full border-black border px-2 hover:cursor-pointer hover:text-white hover:bg-black">
                  <Play size="20" />
                  <Link href="/play/music-relax">Relaxing Song</Link>
                </li>
                <li className="flex items-center gap-2 w-full border-black border px-2 hover:cursor-pointer hover:text-white hover:bg-black">
                  <Play size="20" />
                  <Link href="/music">more...</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <Link
          href="/favs"
          className="rounded-xl hover:bg-black hover:text-white flex flex-col h-24 justify-center items-center border-black border cursor-pointer"
        >
          <h3 className="text-3xl flex items-center gap-1">
            Your favs
            <Star />
          </h3>
        </Link>
      </aside>

      <button
        className="md:hidden p-2 m-1 border border-black rounded-lg hover:bg-black hover:text-white"
        onClick={toggleSideBar}
      >
        <Open />
      </button>
    </>
  );
}
