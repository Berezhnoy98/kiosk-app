import { useState } from 'react';
import './AdminLogin.css';

interface AdminLoginProps {
  onLogin: (login: string, password: string) => Promise<boolean> | boolean;
  onBack: () => void;
}

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [login, setLogin] = useState('admin@kiosk.local');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!login.trim() || !password.trim()) {
      setError('Введите логин и пароль');
      return;
    }

    setLoading(true);
    try {
      const result = await onLogin(login.trim(), password.trim());
      if (!result) {
        setError('Неверный логин или пароль');
        setLoading(false);
        return;
      }
      setError('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login">
      <div className="admin-login__card">
        <p className="admin-login__eyebrow">Панель доступа</p>
        <h1>Вход в админ-панель</h1>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          <label className="admin-login__field">
            <span>Логин (email)</span>
            <input
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder="Введите email"
            />
          </label>

          <label className="admin-login__field">
            <span>Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Введите пароль"
            />
          </label>

          {error && <p className="admin-login__error">{error}</p>}

          <div className="admin-login__actions">
            <button type="button" className="admin-login__secondary" onClick={onBack} disabled={loading}>
              Назад в киоск
            </button>
            <button type="submit" className="admin-login__primary" disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
