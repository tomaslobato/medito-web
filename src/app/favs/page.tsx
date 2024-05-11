"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const getFavs = () => {
      let gotFavs = localStorage.getItem("favs");
      if (!gotFavs) {
        localStorage.setItem("favs", JSON.stringify([]));
        gotFavs = "[]";
      }
      setFavs(JSON.parse(gotFavs));
    };
    getFavs();
  }, []);

  return (
    <main className="text-center font-mono w-full flex flex-col items-center h-screen py-14">
      <h1 className="text-3xl">Your favorite audios</h1>
      {favs.length > 0 ? (
        <ul className="flex flex-col p-5 gap-7">
          {favs.map((item: string) => {
            return (
              <li key={item}>
                <a
                  href={`/play/${item}`}
                  className="hover:bg-black hover:text-white text-xl py-3 px-6 border border-black"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <span className="mt-5">Nothing here yet...</span>
      )}
    </main>
  );
}
