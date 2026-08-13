import { useCallback, useEffect, useState } from 'react';
import type { MenuDay, Screen, UserRole } from './types/kiosk';
import { ScheduleScreen } from './screens/ScheduleScreen/ScheduleScreen';
import { NewsScreen } from './screens/NewsScreen/NewsScreen';
import { HomeScreen } from './screens/HomeScreen/HomeScreen';
import { GalleryScreen } from './screens/GalleryScreen/GalleryScreen';
import { VideoScreen } from './screens/VideoScreen/VideoScreen';
import { CanteenScreen } from './screens/CanteenScreen/CanteenScreen';
import { IdleScreen } from './screens/IdleScreen/IdleScreen';
import { KIOSK_IDLE_TIMEOUT } from './config/kiosk';
import { AdminLogin } from './components/AdminLogin/AdminLogin';
import { AdminPanel } from './components/AdminPanel/AdminPanel';
import { menu as initialMenu } from './data/menu';

const DEFAULT_NEWS_RSS_URL = 'https://полярнаязвезда.янао.рф/presscenter/news/rss/';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [isIdle, setIsIdle] = useState(false);
  const [menu, setMenu] = useState<MenuDay[]>(initialMenu);
  const [loggedRole, setLoggedRole] = useState<UserRole | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(
    () => window.location.pathname === '/login',
  );
  const [newsSourceUrl, setNewsSourceUrl] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_NEWS_RSS_URL;
    }

    const savedValue = window.localStorage.getItem('kiosk-news-rss-url');
    return savedValue?.trim() || DEFAULT_NEWS_RSS_URL;
  });

  const resetIdle = useCallback(() => {
    setIsIdle(false);
    setScreen('home');
  }, []);

  const syncRoute = useCallback(() => {
    if (window.location.pathname === '/login') {
      setShowAdminLogin(true);
      return;
    }

    setShowAdminLogin(false);
    setScreen('home');
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      syncRoute();
    };

    window.addEventListener('popstate', handleLocationChange);
    syncRoute();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [syncRoute]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('kiosk-news-rss-url', newsSourceUrl.trim() || DEFAULT_NEWS_RSS_URL);
    }
  }, [newsSourceUrl]);

  const handleAdminLogin = (
    login: string,
    password: string,
    role: UserRole,
  ) => {
    const expectedCredentials: Record<UserRole, { login: string; password: string }> = {
      admin: { login: 'admin', password: 'admin123' },
      canteen: { login: 'canteen', password: 'canteen123' },
    };

    const expected = expectedCredentials[role];

    if (login !== expected.login || password !== expected.password) {
      return false;
    }

    setLoggedRole(role);
    setShowAdminLogin(false);
    setScreen('home');
    window.history.pushState(null, '', '/');
    return true;
  };

  useEffect(() => {
    if (isIdle || loggedRole !== null || showAdminLogin) {
      return;
    }

    let timer = window.setTimeout(() => {
      setIsIdle(true);
    }, KIOSK_IDLE_TIMEOUT);

    const resetTimer = () => {
      window.clearTimeout(timer);

      timer = window.setTimeout(() => {
        setIsIdle(true);
      }, KIOSK_IDLE_TIMEOUT);
    };

    window.addEventListener('pointerdown', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [isIdle, loggedRole, showAdminLogin]);

  if (isIdle) {
    return <IdleScreen onExit={resetIdle} />;
  }

  if (showAdminLogin) {
    return (
      <AdminLogin
        onLogin={handleAdminLogin}
        onBack={() => {
          setShowAdminLogin(false);
          setScreen('home');
          window.history.pushState(null, '', '/');
        }}
      />
    );
  }

  if (loggedRole) {
    return (
      <AdminPanel
        role={loggedRole}
        menu={menu}
        newsSourceUrl={newsSourceUrl}
        onNewsSourceUrlChange={setNewsSourceUrl}
        onMenuChange={setMenu}
        onLogout={() => {
          setLoggedRole(null);
          setScreen('home');
          window.history.pushState(null, '', '/');
        }}
        onBack={() => {
          setLoggedRole(null);
          setScreen('home');
          window.history.pushState(null, '', '/');
        }}
      />
    );
  }

  if (screen === 'schedule') {
    return (
      <ScheduleScreen
        onNavigateHome={() => setScreen('home')}
      />
    );
  }

  if (screen === 'news') {
    return (
      <NewsScreen
        rssUrl={newsSourceUrl}
        onNavigateHome={() => setScreen('home')}
      />
    );
  }

  if (screen === 'gallery') {
    return (
      <GalleryScreen
        onNavigateHome={() => setScreen('home')}
      />
    );
  }

  if (screen === 'video') {
    return (
      <VideoScreen
        onNavigateHome={() => setScreen('home')}
      />
    );
  }

  if (screen === 'canteen') {
    return (
      <CanteenScreen
        menu={menu}
        onNavigateHome={() => setScreen('home')}
      />
    );
  }

  return (
    <HomeScreen
      onNavigate={(nextScreen) => setScreen(nextScreen)}
    />
  );
}


export default App;
