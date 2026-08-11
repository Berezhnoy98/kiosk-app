import { useState } from 'react';
import type { Screen } from './types/kiosk';
import { ScheduleScreen } from './screens/ScheduleScreen/ScheduleScreen';
import { NewsScreen } from './screens/NewsScreen/NewsScreen';
import { HomeScreen } from './screens/HomeScreen/HomeScreen';
import { GalleryScreen } from './screens/GalleryScreen/GalleryScreen';

function App() {
  const [screen, setScreen] = useState<Screen>('home');

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

  if (screen !== 'home') {
    return (
      <div style={{ padding: 40 }}>
        <button onClick={() => setScreen('home')}>
          ← На главную
        </button>

        <h1>{screen}</h1>
      </div>
    );
  }

  return (
    <HomeScreen
      onNavigate={(nextScreen) => setScreen(nextScreen)}
    />
  );
}

export default App;
