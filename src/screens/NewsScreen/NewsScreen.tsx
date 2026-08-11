import { useState } from 'react';
import { news } from '../../data/news';
import type { NewsItem } from '../../types/kiosk';
import './NewsScreen.css';

interface NewsScreenProps {
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

export function NewsScreen({ onNavigateHome }: NewsScreenProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  if (selectedNews) {
    return (
      <main className="news-screen">
        <header className="news-screen__header">
          <button
            className="news-screen__home-button"
            type="button"
            onClick={onNavigateHome}
          >
            <HomeIcon />
            <span>На главную</span>
          </button>

          <div className="news-screen__title">
            <h1>Новости</h1>
          </div>
        </header>

        <section className="news-screen__article">
          <button
            className="news-screen__back-button"
            type="button"
            onClick={() => setSelectedNews(null)}
          >
            <ArrowLeftIcon />
            <span>К списку новостей</span>
          </button>

          <article className="news-screen__article-card">
            <time className="news-screen__article-date">
              {selectedNews.date}
            </time>

            <h2>{selectedNews.title}</h2>

            <p>{selectedNews.description}</p>
          </article>
        </section>
      </main>
    );
  }

  return (
    <main className="news-screen">
      <header className="news-screen__header">
        <button
          className="news-screen__home-button"
          type="button"
          onClick={onNavigateHome}
        >
          <HomeIcon />
          <span>На главную</span>
        </button>

        <div className="news-screen__title">
          <h1>Новости</h1>
          <p>Новости и события школы</p>
        </div>
      </header>

      <section className="news-screen__list" aria-label="Новости школы">
        {news.map((item) => (
          <button
            className="news-screen__card"
            type="button"
            key={item.id}
            onClick={() => setSelectedNews(item)}
          >
            <time className="news-screen__date">{item.date}</time>

            <span className="news-screen__card-content">
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </span>

            <span className="news-screen__card-arrow" aria-hidden="true">
              <ArrowLeftIcon />
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}