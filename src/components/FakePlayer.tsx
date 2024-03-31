"use client"

import { useState } from "react";
import Pause from "./Icons/Pause";
import Play from "./Icons/Play";

export default function FakePlayer ({time}: {time: number}) {
    
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    // if (!isPlaying) {
    //   setIsPlaying(true);
    //   audioRef.current?.play();
    // } else {
    //   setIsPlaying(false);
    //   audioRef.current?.pause();
    // }
  };

  return (
    <main className="flex flex-col h-screen text-white bg-violet-500 justify-end w-full gap-3 items-center p-10">
      
      <h1 className="text-4xl font-semibold w-full">
        {time} minutes
      </h1>
      {/* <ProgressBar audioRef={audioRef} /> */}
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
    </main>)
}