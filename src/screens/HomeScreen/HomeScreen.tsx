import { useEffect, useState } from 'react';
import { KioskButton } from '../../components/KioskButton/KioskButton';
import './HomeScreen.css';

interface HomeScreenProps {
  onNavigate: (
    screen: 'news' | 'schedule' | 'gallery' | 'video' | 'canteen',
  ) => void;
}

function ScheduleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="40"
      height="40"
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M7 2v4" />
      <path d="M17 2v4" />
      <path d="M3 9h18" />
      <path d="M8 13h3" />
      <path d="M13 13h3" />
      <path d="M8 17h3" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="40"
      height="40"
    >
      <path d="M5 4h14a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z" />
      <path d="M5 18a2 2 0 0 0 2 2" />
      <path d="M9 8h8" />
      <path d="M9 12h8" />
      <path d="M9 16h5" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="40"
      height="40"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="m21 15-5-5L5 20" />
      <path d="m14 14 2-2 5 5" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="40"
      height="40"
    >
      <rect x="3" y="5" width="13" height="14" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </svg>
  );
}

function CanteenIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="40"
      height="40"
    >
      <path d="M4 11h16" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M7 15h10" />
      <path d="M9 4v3" />
      <path d="M12 3v4" />
      <path d="M15 4v3" />
    </svg>
  );
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [currentTime, setCurrentTime] = useState(() =>
    new Date(),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return (
    <main className="home-screen">
      <header className="home-screen__header">
        <div>
          <div className="home-screen__logo">
            ПОЛЯРНАЯ ЗВЕЗДА
          </div>

          <div className="home-screen__subtitle">
            Информационный киоск
          </div>
        </div>

        <div className="home-screen__clock">
  {formattedTime}
</div>
      </header>

      <section className="home-screen__content">
        <h1>Добро пожаловать!</h1>

        <p>
          Выберите нужный раздел
        </p>

        <div className="home-screen__buttons">
          <KioskButton
            onClick={() => onNavigate('schedule')}
          >
            <ScheduleIcon />
            <span>Расписание</span>
          </KioskButton>

          <KioskButton
            onClick={() => onNavigate('news')}
          >
            <NewsIcon />
            <span>Новости</span>
          </KioskButton>

          <KioskButton
            onClick={() => onNavigate('gallery')}
          >
            <GalleryIcon />
            <span>Фото</span>
          </KioskButton>

          <KioskButton
            onClick={() => onNavigate('video')}
          >
            <VideoIcon />
            <span>Видео</span>
          </KioskButton>

          <KioskButton
            onClick={() => onNavigate('canteen')}
          >
            <CanteenIcon />
            <span>Столовая</span>
          </KioskButton>
        </div>
      </section>
    </main>
  );
}