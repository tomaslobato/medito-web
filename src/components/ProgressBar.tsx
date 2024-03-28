import { useEffect, useRef, useState } from "react";

export default function ProgressBar({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
}) {
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isPlaying = useRef(false);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        //scale the time of the audio and set it to the progress state
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      }
    };

    const handlePlayPause = () => {
      isPlaying.current = !isPlaying.current;
    };

    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current?.addEventListener("play", handlePlayPause);
    audioRef.current?.addEventListener("pause", handlePlayPause);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current?.removeEventListener("play", handlePlayPause);
      audioRef.current?.removeEventListener("pause", handlePlayPause);
    };
  }, [audioRef]);

  const handleProgressBarClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressBarRef.current) {
      //check the X position of the click and set the currentTime of the audio to it's scaled representation on the progressBar
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = ev.clientX - rect.left;
      const percentage = (clickX / rect.width) * 100;
      audioRef.current.currentTime =
        (percentage / 100) * audioRef.current.duration;
    }
  };

  return (
    <div
      className="w-full h-3 bg-white rounded cursor-pointer border-2 border-violet-950 overflow-hidden relative"
      ref={progressBarRef}
      onClick={handleProgressBarClick}
    >
      <div
        className={`h-full bg-purple-950 transition-all ${
          isPlaying.current ? "animate-progress" : ""
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
