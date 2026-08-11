import { useCallback, useEffect, useState } from 'react';
import type { Screen } from './types/kiosk';
import { ScheduleScreen } from './screens/ScheduleScreen/ScheduleScreen';
import { NewsScreen } from './screens/NewsScreen/NewsScreen';
import { HomeScreen } from './screens/HomeScreen/HomeScreen';
import { GalleryScreen } from './screens/GalleryScreen/GalleryScreen';
import { VideoScreen } from './screens/VideoScreen/VideoScreen';
import { CanteenScreen } from './screens/CanteenScreen/CanteenScreen';
import { IdleScreen } from './screens/IdleScreen/IdleScreen';

const IDLE_TIMEOUT = 30_000;

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [isIdle, setIsIdle] = useState(false);

  const resetIdle = useCallback(() => {
    setIsIdle(false);
    setScreen('home');
  }, []);

  useEffect(() => {
    if (isIdle) {
      return;
    }

    let timer = window.setTimeout(() => {
      setIsIdle(true);
    }, IDLE_TIMEOUT);

    const resetTimer = () => {
      window.clearTimeout(timer);

      timer = window.setTimeout(() => {
        setIsIdle(true);
      }, IDLE_TIMEOUT);
    };

    window.addEventListener('pointerdown', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('mousemove', resetTimer);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('mousemove', resetTimer);
    };
  }, [isIdle]);

  if (isIdle) {
    return <IdleScreen onExit={resetIdle} />;
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
