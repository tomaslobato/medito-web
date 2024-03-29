"use client";

import { audios } from "@/audios";
import { useEffect, useState } from "react";

export default function Page() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const getFavs = () => {
      let gotFavs = localStorage.getItem("favs") as string;
      if (!favs) {
        localStorage.setItem("favs", JSON.stringify([]));
        gotFavs = "[]";
      }
      const parsedFavs = JSON.parse(gotFavs);
      setFavs(parsedFavs)
    };
    getFavs();
  }, []);

  return (
    <main className="text-center font-mono w-full flex flex-col items-center h-screen py-14">
      <h1 className="text-3xl">Your favorite audios</h1>
      <ul className="flex flex-col p-5 gap-7">
        {favs.map((item) => {
          return (
            <li key={item}>
              <a
                href={item}
                className="hover:bg-black hover:text-white text-xl py-3 px-6 border border-black"
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
