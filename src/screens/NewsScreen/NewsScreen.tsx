import { useEffect, useState } from 'react';
import type { NewsItem } from '../../types/kiosk';
import './NewsScreen.css';

interface NewsScreenProps {
  rssUrl: string;
  onNavigateHome: () => void;
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function formatNewsDate(dateString: string) {
  const parsedDate = new Date(dateString);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateString;
  }

  return parsedDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function parseRssNews(xml: string): NewsItem[] {
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  const parserError = document.querySelector('parsererror');

  if (parserError) {
    return [];
  }

  return Array.from(document.querySelectorAll('item')).map((item, index) => {
    const title = item.querySelector('title')?.textContent?.trim() ?? `Новость ${index + 1}`;
    const date = item.querySelector('pubDate')?.textContent?.trim() ?? item.querySelector('dc\:date')?.textContent?.trim() ?? 'Дата неизвестна';
    const descriptionNode = item.querySelector('description') ?? item.querySelector('content\:encoded') ?? item.querySelector('description');
    const description = stripHtml(descriptionNode?.textContent ?? '');
    const link = item.querySelector('link')?.textContent?.trim() ?? undefined;

    return {
      id: item.querySelector('guid')?.textContent?.trim() ?? `${title}-${index}`,
      title,
      date: formatNewsDate(date),
      description: description || 'Подробности новости доступны на сайте школы.',
      link,
    };
  });
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

export function NewsScreen({ rssUrl, onNavigateHome }: NewsScreenProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadNews() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const url = rssUrl.trim();

        if (!url) {
          throw new Error('RSS URL is empty');
        }

        const proxyUrl = new URL('/api/rss', window.location.origin);
        proxyUrl.searchParams.set('url', url);

        const response = await fetch(proxyUrl.toString(), {
          cache: 'no-store',
          headers: {
            Accept: 'application/rss+xml, application/xml, text/xml, */*',
          },
        });

        if (!response.ok) {
          throw new Error(`RSS request failed: ${response.status}`);
        }

        const xml = await response.text();
        const parsedNews = parseRssNews(xml);

        if (!isMounted) {
          return;
        }

        if (parsedNews.length === 0) {
          throw new Error('RSS feed is empty or invalid');
        }

        setNews(parsedNews);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setNews([]);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Не удалось загрузить RSS-канал.',
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      isMounted = false;
    };
  }, [rssUrl]);

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
        {isLoading ? (
          <div className="news-screen__loading">Загружаем новости…</div>
        ) : errorMessage ? (
          <div className="news-screen__loading">Не удалось загрузить новости: {errorMessage}</div>
        ) : (
          news.map((item) => (
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
          ))
        )}
      </section>
    </main>
  );
}