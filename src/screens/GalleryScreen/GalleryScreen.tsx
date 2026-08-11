import { useState } from 'react';
import './GalleryScreen.css';
import { gallery, type GalleryItem } from '../../data/gallery';

interface GalleryScreenProps {
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

export function GalleryScreen({
  onNavigateHome,
}: GalleryScreenProps) {
  const [selectedPhoto, setSelectedPhoto] =
    useState<GalleryItem | null>(null);

  if (selectedPhoto) {
    return (
      <main className="gallery-screen">
        <header className="gallery-screen__header">
          <button
            className="gallery-screen__home-button"
            type="button"
            onClick={onNavigateHome}
          >
            <HomeIcon />
            <span>На главную</span>
          </button>

          <div className="gallery-screen__title">
            <h1>Фото</h1>
          </div>
        </header>

        <section className="gallery-screen__viewer">
          <button
            className="gallery-screen__back-button"
            type="button"
            onClick={() => setSelectedPhoto(null)}
          >
            <ArrowLeftIcon />
            <span>К фотографиям</span>
          </button>

          <article className="gallery-screen__photo-card">
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
            />

            <div className="gallery-screen__photo-info">
              <h2>{selectedPhoto.title}</h2>
              <time>{selectedPhoto.date}</time>
            </div>
          </article>
        </section>
      </main>
    );
  }

  return (
    <main className="gallery-screen">
      <header className="gallery-screen__header">
        <button
          className="gallery-screen__home-button"
          type="button"
          onClick={onNavigateHome}
        >
          <HomeIcon />
          <span>На главную</span>
        </button>

        <div className="gallery-screen__title">
          <h1>Фото</h1>
          <p>Фотографии школьной жизни</p>
        </div>
      </header>

      <section
        className="gallery-screen__grid"
        aria-label="Фотографии"
      >
        {gallery.map((photo) => (
          <button
            className="gallery-screen__card"
            type="button"
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo.image} alt={photo.title} />

            <span className="gallery-screen__card-info">
              <strong>{photo.title}</strong>
              <span>{photo.date}</span>
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}
