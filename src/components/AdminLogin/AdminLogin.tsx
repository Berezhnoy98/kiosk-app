import { useState } from 'react';
import type { UserRole } from '../../types/kiosk';
import './AdminLogin.css';

interface AdminLoginProps {
  onLogin: (login: string, password: string, role: UserRole) => boolean;
  onBack: () => void;
}

const loginOptions: Array<{ value: UserRole; label: string }> = [
  { value: 'admin', label: 'Администратор' },
  { value: 'canteen', label: 'Столовая' },
];

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [login, setLogin] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!login.trim() || !password.trim()) {
      setError('Введите логин и пароль');
      return;
    }

    const isValid = onLogin(login.trim(), password.trim(), selectedRole);

    if (!isValid) {
      setError('Неверный логин или пароль для выбранной роли');
      return;
    }

    setError('');
  }

  return (
    <main className="admin-login">
      <div className="admin-login__card">
        <p className="admin-login__eyebrow">Панель доступа</p>
        <h1>Вход в админ-панель</h1>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-login__role-switcher">
            {loginOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`admin-login__role-button ${
                  selectedRole === option.value ? 'admin-login__role-button--active' : ''
                }`}
                onClick={() => {
                  setSelectedRole(option.value);
                  setLogin(option.value === 'admin' ? 'admin' : 'canteen');
                  setPassword(option.value === 'admin' ? 'admin123' : 'canteen123');
                  setError('');
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <label className="admin-login__field">
            <span>Логин</span>
            <input
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder="Введите логин"
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
            <button type="button" className="admin-login__secondary" onClick={onBack}>
              Назад в киоск
            </button>
            <button type="submit" className="admin-login__primary">
              Войти
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
