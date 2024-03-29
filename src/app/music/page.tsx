import { audios } from "@/audios";
import Link from "next/link";

export default function Page() {
  return (
    <main className="text-center font-mono w-full flex flex-col items-center h-screen py-14">
      <h1 className="text-3xl">Learn to meditate</h1>
      <p className="w-3/4 mt-2">With Medito's official meditation begginer course, you can find it on youtube <a href="https://youtube.com/@Medito" className="text-link">here</a></p>
      <ul className="flex flex-col p-5 gap-7">
        {audios.music.map((day) => (
          <li>
            <Link
              href={`/play/${day.id}`}
              className="hover:bg-black hover:text-white text-xl py-3 px-6 border border-black"
            >
              {day.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
