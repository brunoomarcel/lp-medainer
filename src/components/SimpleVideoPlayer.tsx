import React, { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type SimpleVideoPlayerProps = {
  src: string;
  label: string;
  className?: string;
  poster?: string;
};

export function SimpleVideoPlayer({ src, label, className, poster }: SimpleVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  return (
    <div className="simple-video-player">
      <video
        ref={videoRef}
        src={src}
        aria-label={label}
        className={className}
        loop
        playsInline
        preload="auto"
        poster={poster}
        onClick={togglePlayback}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className="simple-video-toggle"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pausar video' : 'Reproduzir video'}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
      </button>
    </div>
  );
}
