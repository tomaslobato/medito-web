"use client";

import { useState } from "react";
import Close from "./Icons/Close";
import Play from "./Icons/Play";
import Open from "./Icons/Open";

export default function SideBar() {
  const [hidden, setHidden] = useState(false);

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
            <a href="/" className="text-4xl text-violet-700 font-bold">
              medito-web
            </a>
            <button
              className="md:hidden p-2 border border-black rounded-lg hover:bg-black hover:text-white"
              onClick={() => setHidden(false)}
            >
              <Close />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <div className="rounded-xl flex flex-col h-36 lg:h-40 justify-center items-center border-black border gap-2 hover:h-40 lg:hover:h-48 transition-all sidebar-parent-div">
              <h3 className="text-2xl lg:text-3xl">Timer</h3>
              <p className="text-lg lg:text-xl w-60">
                You set the time for the session
              </p>
              <form className="hidden gap-2 text-lg lg:text-xl">
                <select className="border-black border">
                  <option value="">5min</option>
                  <option value="">10min</option>
                  <option value="">15min</option>
                  <option value="">20min</option>
                  <option value="">30min</option>
                </select>
                <a
                  href="/meditations/timer?t=5"
                  className="bg-black text-white p-2 hover:bg-white hover:text-black border border-black"
                >
                  <Play size="20" />
                </a>
              </form>
            </div>

            <div className="rounded-xl flex flex-col justify-center items-center border-black border gap-2 hover:h-44 h-40 lg:h-40 lg:hover:h-56 transition-all sidebar-parent-div">
              <h3 className="text-2xl md:text-3xl">Daily</h3>
              <p className="text-lg lg:text-xl w-60">
                A short daily meditation to keep you on track
              </p>
              <ul className="hidden flex-col text-lg md:text-2xl gap-1">
                <li className="flex items-center gap-2 lg:py-2 w-full border-black border px-3 hover:cursor-pointer hover:text-white hover:bg-black">
                  <Play size="20" />
                  <a href="/meditation/daily-1">Daily #1</a>
                </li>
                <li className="flex items-center gap-2 lg:py-2 w-full border-black border px-3 hover:cursor-pointer hover:text-white hover:bg-black">
                  <Play size="20" />
                  <a href="/meditation/daily-2">Daily #2</a>
                </li>
                <li className="flex items-center gap-2 lg:py-2 w-full border-black border px-3 hover:cursor-pointer hover:text-white hover:bg-black">
                  <Play size="20" />
                  <a href="/meditation/daily-3">Daily #2</a>
                </li>
              </ul>
            </div>

            <div className="rounded-xl flex flex-col h-36 lg:h-36 justify-center items-center border-black border gap-2 hover:h-40 lg:hover:h-56 transition-all sidebar-parent-div">
              <h3 className="text-2xl lg:text-3xl md:w-64 w-72">
                Music for meditation
              </h3>

              <ul className="hidden flex-col text-lg md:text-2xl gap-1">
                <li className="flex items-center gap-2 lg:py-2 w-full border-black border px-2 hover:cursor-pointer hover:text-white hover:bg-black">
                  <Play size="20" />
                  <a href="/play/focus">Focus Song</a>
                </li>
                <li className="flex items-center gap-2 lg:py-2 w-full border-black border px-2 hover:cursor-pointer hover:text-white hover:bg-black">
                  <Play size="20" />
                  <a href="/play/relax">Relaxing Song</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <a
          href="/likes"
          className="rounded-xl hover:bg-black hover:text-white flex flex-col h-24 justify-center items-center border-black border cursor-pointer"
        >
          <h3 className="text-3xl">Your Likes</h3>
        </a>
      </aside>

      <button
        className="md:hidden p-2 m-1 border border-black rounded-lg hover:bg-black hover:text-white"
        onClick={() => setHidden(!hidden)}
      >
        <Open />
      </button>
    </>
  );
}
