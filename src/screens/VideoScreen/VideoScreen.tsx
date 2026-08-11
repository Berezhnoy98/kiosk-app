import { useState } from 'react';
import { videos } from '../../data/video';
import type { VideoItem } from '../../data/video';
import './VideoScreen.css';

interface VideoScreenProps {
  onNavigateHome: () => void;
}

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M8 5.5v13a1 1 0 0 0 1.5.87l10-6.5a1 1 0 0 0 0-1.74l-10-6.5A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export function VideoScreen({
  onNavigateHome,
}: VideoScreenProps) {
  const [selectedVideo, setSelectedVideo] =
    useState<VideoItem | null>(null);

  if (selectedVideo) {
    return (
      <main className="video-screen">
        <header className="video-screen__header">
          <button
            className="video-screen__home-button"
            type="button"
            onClick={onNavigateHome}
          >
            <HomeIcon />
            <span>На главную</span>
          </button>

          <div className="video-screen__title">
            <h1>Видео</h1>
          </div>
        </header>

        <section className="video-screen__viewer">
          <button
            className="video-screen__back-button"
            type="button"
            onClick={() => setSelectedVideo(null)}
          >
            <ArrowLeftIcon />
            <span>К видео</span>
          </button>

          <article className="video-screen__player-card">
            {selectedVideo.videoUrl ? (
              <video
                className="video-screen__player"
                controls
                playsInline
                src={selectedVideo.videoUrl}
              >
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
            ) : (
              <div className="video-screen__unavailable">
                <PlayIcon />
                <strong>Видео пока недоступно</strong>
                <span>
                  Видео будет добавлено после подключения источника
                  материалов.
                </span>
              </div>
            )}

            <div className="video-screen__info">
              <time>{selectedVideo.date}</time>
              <h2>{selectedVideo.title}</h2>
              <p>{selectedVideo.description}</p>
            </div>
          </article>
        </section>
      </main>
    );
  }

  return (
    <main className="video-screen">
      <header className="video-screen__header">
        <button
          className="video-screen__home-button"
          type="button"
          onClick={onNavigateHome}
        >
          <HomeIcon />
          <span>На главную</span>
        </button>

        <div className="video-screen__title">
          <h1>Видео</h1>
          <p>Видео о жизни школы</p>
        </div>
      </header>

      <section
        className="video-screen__list"
        aria-label="Видео"
      >
        {videos.map((video) => (
          <button
            className="video-screen__card"
            type="button"
            key={video.id}
            onClick={() => setSelectedVideo(video)}
          >
            <span className="video-screen__play">
              <PlayIcon />
            </span>

            <span className="video-screen__card-content">
              <strong>{video.title}</strong>
              <span>{video.description}</span>
              <time>{video.date}</time>
            </span>

            <span className="video-screen__card-arrow">
              <ArrowLeftIcon />
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}