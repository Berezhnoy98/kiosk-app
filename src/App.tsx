import { useState } from 'react';
import type { Screen } from './types/kiosk';
import { HomeScreen } from './screens/HomeScreen/HomeScreen';

function App() {
  const [screen, setScreen] = useState<Screen>('home');

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