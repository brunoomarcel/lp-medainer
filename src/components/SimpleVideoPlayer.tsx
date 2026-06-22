import React, { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type SimpleVideoPlayerProps = {
  src: string;
  label: string;
  className?: string;
};

export function SimpleVideoPlayer({ src, label, className }: SimpleVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterDataUrl, setPosterDataUrl] = useState<string | null>(null);

  const capturePosterFrame = () => {
    const video = videoRef.current;

    if (!video || posterDataUrl) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (!canvas.width || !canvas.height) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPosterDataUrl(canvas.toDataURL('image/jpeg', 0.82));
  };

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
        onLoadedData={capturePosterFrame}
        onClick={togglePlayback}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {!isPlaying && posterDataUrl ? (
        <img
          src={posterDataUrl}
          alt=""
          aria-hidden="true"
          className={`${className ?? ''} simple-video-poster`}
        />
      ) : null}

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
