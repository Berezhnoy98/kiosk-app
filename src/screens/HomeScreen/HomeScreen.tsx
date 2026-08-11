import { KioskButton } from '../../components/KioskButton/KioskButton';
import './HomeScreen.css';

interface HomeScreenProps {
  onNavigate: (screen: 'news' | 'schedule' | 'gallery' | 'video' | 'canteen') => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
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
          11:30
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
            📅
            <span>Расписание</span>
          </KioskButton>

          <KioskButton
            onClick={() => onNavigate('news')}
          >
            📰
            <span>Новости</span>
          </KioskButton>

          <KioskButton
            onClick={() => onNavigate('gallery')}
          >
            🖼
            <span>Фото</span>
          </KioskButton>

          <KioskButton
            onClick={() => onNavigate('video')}
          >
            🎬
            <span>Видео</span>
          </KioskButton>

          <KioskButton
            onClick={() => onNavigate('canteen')}
          >
            🍽
            <span>Столовая</span>
          </KioskButton>
        </div>
      </section>
    </main>
  );
}