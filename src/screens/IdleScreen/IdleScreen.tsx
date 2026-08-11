import { useEffect, useRef, useState } from 'react';
import { videos } from '../../data/video';
import './IdleScreen.css';

interface IdleScreenProps {
  onExit: () => void;
}

export function IdleScreen({ onExit }: IdleScreenProps) {
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const availableVideos = videos.filter(
    (video) => video.videoUrl,
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const enterFullscreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await video.requestFullscreen();
        }
      } catch {
        // Fullscreen may be rejected when there is no recent user gesture.
      }
    };

    void enterFullscreen();

    return () => {
      if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => {
          // Fullscreen may already be closed by the browser or user.
        });
      }
    };
  }, []);


  useEffect(() => {
    const handleInteraction = () => {
      onExit();
    };

    window.addEventListener('pointerdown', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener(
        'pointerdown',
        handleInteraction,
      );
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener(
        'touchstart',
        handleInteraction,
      );
    };
  }, [onExit]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.load();

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay may be blocked by the browser.
      }
    };

    void playVideo();
  }, [videoIndex]);

  const handleEnded = () => {
    setVideoIndex((currentIndex) => {
      if (availableVideos.length <= 1) {
        return 0;
      }

      return (currentIndex + 1) % availableVideos.length;
    });
  };

  if (availableVideos.length === 0) {
    return (
      <main className="idle-screen">
        <div className="idle-screen__message">
          <strong>Информационный киоск</strong>
          <span>Видео для заставки пока не добавлены.</span>
        </div>
      </main>
    );
  }

  const currentVideo = availableVideos[videoIndex];

  return (
    <main className="idle-screen">
      <video
        ref={videoRef}
        className="idle-screen__video"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        src={currentVideo.videoUrl}
      >
        Ваш браузер не поддерживает воспроизведение видео.
      </video>

      <div className="idle-screen__hint">
        Коснитесь экрана, чтобы продолжить
      </div>
    </main>
  );
}