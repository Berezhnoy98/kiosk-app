import { useEffect, useMemo, useState } from 'react';
import type {
  MenuDay,
  MenuDayId,
  UserRole,
} from '../../types/kiosk';
import './AdminPanel.css';

type AdminTab =
  | 'menu'
  | 'news'
  | 'schedule'
  | 'gallery'
  | 'video'
  | 'users';

interface AdminPanelProps {
  role: UserRole;
  menu: MenuDay[];
  newsSourceUrl: string;
  onNewsSourceUrlChange: (value: string) => void;
  onMenuChange: (menu: MenuDay[]) => void;
  onLogout: () => void;
  onBack: () => void;
}

const adminTabs: Array<{ id: AdminTab; label: string }> = [
  { id: 'menu', label: 'Меню' },
  { id: 'news', label: 'Новости' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'video', label: 'Видео' },
  { id: 'users', label: 'Пользователи' },
];

const canteenTabs: Array<{ id: AdminTab; label: string }> = [
  { id: 'menu', label: 'Меню' },
];

function getTabTitle(tab: AdminTab) {
  switch (tab) {
    case 'menu':
      return 'Меню';
    case 'news':
      return 'Новости';
    case 'schedule':
      return 'Расписание';
    case 'gallery':
      return 'Галерея';
    case 'video':
      return 'Видео';
    case 'users':
      return 'Пользователи';
    default:
      return 'Админка';
  }
}

export function AdminPanel({
  role,
  menu,
  newsSourceUrl,
  onNewsSourceUrlChange,
  onMenuChange,
  onLogout,
  onBack,
}: AdminPanelProps) {
  const tabs = useMemo(
    () => (role === 'admin' ? adminTabs : canteenTabs),
    [role],
  );

  const [activeTab, setActiveTab] = useState<AdminTab>('menu');
  const [selectedDayId, setSelectedDayId] = useState<MenuDayId>(
    menu[0]?.id ?? 'monday',
  );
  const [newsSourceDraft, setNewsSourceDraft] = useState(newsSourceUrl);

  const [users, setUsers] = useState<Array<{ id: string; email: string; name: string; role: string; createdAt?: string }>>([]);
  const [newUser, setNewUser] = useState({ email: '', password: '', name: '', role: 'CANTEEN' });

  useEffect(() => {
    setNewsSourceDraft(newsSourceUrl);
  }, [newsSourceUrl]);

  const selectedDay =
    menu.find((day) => day.id === selectedDayId) ?? menu[0];

  function updateMenuDay(
    dayId: MenuDayId,
    updater: (day: MenuDay) => MenuDay,
  ) {
    onMenuChange(
      menu.map((day) => (day.id === dayId ? updater(day) : day)),
    );
  }

  function updateSectionTitle(
    dayId: MenuDayId,
    sectionIndex: number,
    title: string,
  ) {
    updateMenuDay(dayId, (day) => ({
      ...day,
      sections: day.sections.map((section, index) => (
        index === sectionIndex ? { ...section, title } : section
      )),
    }));
  }

  function updateItemName(
    dayId: MenuDayId,
    sectionIndex: number,
    itemIndex: number,
    name: string,
  ) {
    updateMenuDay(dayId, (day) => ({
      ...day,
      sections: day.sections.map((section, sectionPos) =>
        sectionPos === sectionIndex
          ? {
              ...section,
              items: section.items.map((item, itemPos) =>
                itemPos === itemIndex ? { ...item, name } : item,
              ),
            }
          : section,
      ),
    }));
  }

  function addSection(dayId: MenuDayId) {
    updateMenuDay(dayId, (day) => ({
      ...day,
      sections: [
        ...day.sections,
        {
          title: `Новый раздел ${day.sections.length + 1}`,
          items: [{ name: 'Новое блюдо' }],
        },
      ],
    }));
  }

  function removeSection(dayId: MenuDayId, sectionIndex: number) {
    updateMenuDay(dayId, (day) => ({
      ...day,
      sections: day.sections.filter((_, index) => index !== sectionIndex),
    }));
  }

  function addItem(dayId: MenuDayId, sectionIndex: number) {
    updateMenuDay(dayId, (day) => ({
      ...day,
      sections: day.sections.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              items: [...section.items, { name: 'Новое блюдо' }],
            }
          : section,
      ),
    }));
  }

  function removeItem(
    dayId: MenuDayId,
    sectionIndex: number,
    itemIndex: number,
  ) {
    updateMenuDay(dayId, (day) => ({
      ...day,
      sections: day.sections.map((section, index) => {
        if (index !== sectionIndex) {
          return section;
        }

        return {
          ...section,
          items: section.items.filter((_, itemPos) => itemPos !== itemIndex),
        };
      }),
    }));
  }

  function renderMenuEditor() {
    if (!selectedDay) {
      return null;
    }

    return (
      <div className="admin-panel__editor">
        <div className="admin-panel__day-selector" aria-label="Выбор дня меню">
          {menu.map((day) => (
            <button
              key={day.id}
              type="button"
              className={`admin-panel__day-button ${
                day.id === selectedDayId
                  ? 'admin-panel__day-button--active'
                  : ''
              }`}
              onClick={() => setSelectedDayId(day.id)}
            >
              {day.shortLabel}
            </button>
          ))}
        </div>

        <div className="admin-panel__day-header">
          <div>
            <p className="admin-panel__eyebrow">Редактирование меню</p>
            <h2>{selectedDay.label}</h2>
          </div>

          <span>{selectedDay.date}</span>
        </div>

        {selectedDay.sections.length === 0 ? (
          <div className="admin-panel__empty-state">
            <p>В этом дне пока нет разделов.</p>
            <button
              type="button"
              className="admin-panel__primary-button"
              onClick={() => addSection(selectedDay.id)}
            >
              Добавить раздел
            </button>
          </div>
        ) : (
          selectedDay.sections.map((section, sectionIndex) => (
            <div key={`${selectedDay.id}-${section.title}-${sectionIndex}`} className="admin-panel__section-card">
              <div className="admin-panel__section-toolbar">
                <input
                  value={section.title}
                  aria-label={`Название раздела ${sectionIndex + 1}`}
                  onChange={(event) =>
                    updateSectionTitle(
                      selectedDay.id,
                      sectionIndex,
                      event.target.value,
                    )
                  }
                />

                <button
                  type="button"
                  className="admin-panel__ghost-button"
                  onClick={() => removeSection(selectedDay.id, sectionIndex)}
                >
                  Удалить раздел
                </button>
              </div>

              <div className="admin-panel__items">
                {section.items.length === 0 ? (
                  <p className="admin-panel__empty-items">Пустой раздел</p>
                ) : (
                  section.items.map((item, itemIndex) => (
                    <div key={`${section.title}-${itemIndex}`} className="admin-panel__item-row">
                      <input
                        value={item.name}
                        aria-label={`Блюдо ${itemIndex + 1}`}
                        onChange={(event) =>
                          updateItemName(
                            selectedDay.id,
                            sectionIndex,
                            itemIndex,
                            event.target.value,
                          )
                        }
                      />

                      <button
                        type="button"
                        className="admin-panel__icon-button"
                        onClick={() =>
                          removeItem(
                            selectedDay.id,
                            sectionIndex,
                            itemIndex,
                          )
                        }
                        aria-label="Удалить блюдо"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="admin-panel__section-actions">
                <button
                  type="button"
                  className="admin-panel__primary-button"
                  onClick={() => addItem(selectedDay.id, sectionIndex)}
                >
                  Добавить блюдо
                </button>
              </div>
            </div>
          ))
        )}

        <button
          type="button"
          className="admin-panel__primary-button"
          onClick={() => addSection(selectedDay.id)}
        >
          Добавить раздел
        </button>
      </div>
    );
  }

  function renderNewsSettings() {
    return (
      <div className="admin-panel__settings-card">
        <p className="admin-panel__eyebrow">Источник новостей</p>
        <h2>RSS-ссылка</h2>

        <label className="admin-panel__field">
          <span>URL RSS</span>
          <input
            value={newsSourceDraft}
            onChange={(event) => setNewsSourceDraft(event.target.value)}
            placeholder="https://example.com/rss"
          />
        </label>

        <div className="admin-panel__settings-actions">
          <button
            type="button"
            className="admin-panel__primary-button"
            onClick={() => onNewsSourceUrlChange(newsSourceDraft.trim() || newsSourceUrl)}
          >
            Сохранить источник
          </button>
        </div>
      </div>
    );
  }

  async function fetchUsers() {
    try {
      const users = await import('../../services/users.service').then(m => m.usersService.getAll());
      setUsers(users);
    } catch (err) {
      // ignore for now
      console.error('Failed to load users', err);
    }
  }

  function renderUsersManager() {
    return (
      <div className="admin-panel__settings-card">
        <p className="admin-panel__eyebrow">Управление пользователями</p>
        <h2>Пользователи</h2>

        <div className="admin-panel__users-list">
          <button type="button" className="admin-panel__primary-button" onClick={() => fetchUsers()}>
            Обновить список
          </button>

          {users.length === 0 ? (
            <p>Пользователей не найдено.</p>
          ) : (
            <table className="admin-panel__users-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Имя</th>
                  <th>Роль</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.email}</td>
                    <td>{u.name}</td>
                    <td>
                      <select value={u.role} onChange={async (e) => {
                        const newRole = e.target.value;
                        try {
                          await import('../../services/users.service').then(m => m.usersService.update(u.id, { role: newRole }));
                          await fetchUsers();
                        } catch (err) {
                          alert('Не удалось изменить роль');
                        }
                      }}>
                        <option value="CANTEEN">CANTEEN</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td>
                      <button type="button" className="admin-panel__ghost-button" onClick={async () => {
                        const pwd = prompt('Введите новый пароль для пользователя (мин. 6 символов):');
                        if (!pwd) return;
                        if (!confirm('Сменить пароль для ' + u.email + '?')) return;
                        try {
                          await import('../../services/users.service').then(m => m.usersService.changePassword(u.id, pwd));
                          alert('Пароль изменён');
                        } catch (err) {
                          alert('Не удалось изменить пароль');
                        }
                      }}>
                        Сменить пароль
                      </button>

                      <button type="button" style={{ marginLeft: 8 }} className="admin-panel__ghost-button" onClick={async () => {
                        if (!confirm('Удалить пользователя?')) return;
                        try {
                          await import('../../services/users.service').then(m => m.usersService.delete(u.id));
                          await fetchUsers();
                        } catch (e) {
                          alert('Не удалось удалить пользователя');
                        }
                      }}>
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="admin-panel__create-user">
            <h3>Создать пользователя</h3>
            <label>
              Email
              <input value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            </label>
            <label>
              Пароль
              <input value={newUser.password} type="password" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            </label>
            <label>
              Имя
              <input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            </label>
            <label>
              Роль
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}>
                <option value="CANTEEN">CANTEEN</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </label>
            <div className="admin-panel__settings-actions">
              <button type="button" className="admin-panel__primary-button" onClick={async () => {
                try {
                  await import('../../services/users.service').then(m => m.usersService.create(newUser));
                  setNewUser({ email: '', password: '', name: '', role: 'CANTEEN' });
                  await fetchUsers();
                } catch (e) {
                  alert('Не удалось создать пользователя');
                }
              }}>
                Создать
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderPlaceholder(tab: AdminTab) {
    if (tab === 'news') {
      return role === 'admin' ? renderNewsSettings() : (
        <div className="admin-panel__placeholder">
          <p className="admin-panel__eyebrow">Раздел: {getTabTitle(tab)}</p>
          <h2>У роли «Столовая» доступ только к меню</h2>
          <p>Для этой роли запрещено менять источник новостей.</p>
        </div>
      );
    }

    return (
      <div className="admin-panel__placeholder">
        <p className="admin-panel__eyebrow">Раздел: {getTabTitle(tab)}</p>
        <h2>
          {role === 'admin'
            ? 'Полный доступ для администратора включён'
            : 'У роли «Столовая» доступ только к меню'}
        </h2>
        <p>
          {role === 'admin'
            ? 'В этом разделе можно управлять контентом, настройками и пользователями.'
            : 'Для этой роли разрешено только редактирование меню столовой.'}
        </p>
      </div>
    );
  }

  return (
    <main className="admin-panel">
      <aside className="admin-panel__sidebar">
        <div className="admin-panel__topbar">
          <div>
            <p className="admin-panel__eyebrow">Роль</p>
            <h1>{role === 'admin' ? 'Администратор' : 'Столовая'}</h1>
          </div>
        </div>

        <nav className="admin-panel__nav" aria-label="Навигация админки">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-panel__nav-button ${
                activeTab === tab.id ? 'admin-panel__nav-button--active' : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-panel__sidebar-actions">
          <button type="button" className="admin-panel__ghost-button" onClick={onBack}>
            Назад в киоск
          </button>
          <button type="button" className="admin-panel__primary-button" onClick={onLogout}>
            Выйти
          </button>
        </div>
      </aside>

      <section className="admin-panel__content">
        {activeTab === 'menu'
          ? renderMenuEditor()
          : activeTab === 'users' && role === 'admin'
            ? renderUsersManager()
            : activeTab === 'news' && role === 'admin'
              ? renderNewsSettings()
              : renderPlaceholder(activeTab)}
      </section>
    </main>
  );
}
