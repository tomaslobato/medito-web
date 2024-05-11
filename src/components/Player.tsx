"use client";

import { useEffect, useRef, useState } from "react";
import Play from "./Icons/Play";
import Pause from "./Icons/Pause";
import ProgressBar from "./ProgressBar";
import Link from "./Icons/Link";
import Volume from "./Icons/Volume";
import Muted from "./Icons/Muted";
import Star from "./Icons/Star";
import FilledStar from "./Icons/FilledStar";
import { saveStreak } from "@/utils/saveStreak";

export default function Player({
  audioSrc,
  title,
  link,
  id,
}: {
  link: string;
  audioSrc: string;
  title: string;
  id: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(25);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const getFavs = () => {
      let favs = localStorage.getItem("favs");
      if (!favs) {
        localStorage.setItem("favs", JSON.stringify([]));
        favs = "[]";
      }
      const favsArray = JSON.parse(favs);
      const isFav = favsArray.includes(id);
      setFav(isFav);
    };
    getFavs();
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", handleAudioEnded);
      return () => {
        audio.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, []);

  const handleAudioEnded = () => {
    setIsPlaying(false);
    saveStreak()
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current?.play();
    } else {
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(25);
      audioRef.current!.volume = 25 / 100;
    } else {
      setVolume(0);
      audioRef.current!.volume = 0;
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
    audioRef.current!.volume = newVolume / 100;
  };

  const toggleFav = () => {
    const favs = localStorage.getItem("favs") as string;
    const parsedFavs = JSON.parse(favs);

    let newFavs;
    if (parsedFavs.includes(id))
      newFavs = parsedFavs.filter((item: string) => item !== id);
    else newFavs = [...parsedFavs, id];

    localStorage.setItem("favs", JSON.stringify(newFavs));
    setFav(!fav);
  };

  return (
    <main className="flex flex-col h-screen text-white bg-violet-500 justify-end w-full gap-3 items-center p-10">
      <audio src={audioSrc} ref={audioRef} />
      <div className="flex w-full justify-between">
        <a
          href={link}
          className="flex items-center text-4xl font-semibold hover:text-violet-100"
        >
          {title} <Link />
        </a>
      </div>
      <ProgressBar audioRef={audioRef} />
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="hover:bg-violet-200 bg-white text-violet-950 border-2 border-violet-950 p-2 rounded-full"
          >
            {isPlaying ? <Pause size="40" /> : <Play size="40" />}
          </button>
          <button onClick={toggleFav}>{fav ? <FilledStar /> : <Star />}</button>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={toggleMute}>
            {volume === 0 ? <Muted /> : <Volume />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}
