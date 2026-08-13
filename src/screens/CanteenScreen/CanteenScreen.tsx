import { useState } from 'react';
import type { MenuDay, MenuDayId } from '../../types/kiosk';
import './CanteenScreen.css';

interface CanteenScreenProps {
  menu: MenuDay[];
  onNavigateHome: () => void;
}

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="canteen-screen__home-icon"
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

function ChevronIcon({
  direction,
}: {
  direction: 'left' | 'right';
}) {
  return (
    <svg
      aria-hidden="true"
      className="canteen-screen__chevron-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === 'left' ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

function BreakfastIcon() {
  return (
    <svg
      aria-hidden="true"
      className="canteen-screen__section-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
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

function LunchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="canteen-screen__section-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5v14" />
      <path d="M7 5v6" />
      <path d="M10 5v6" />
      <path d="M7 11V5" />
      <path d="M7 11c1.7 0 3-1.3 3-3V5" />
      <path d="M15 5v14" />
      <path d="M15 5c3 2 4 4.3 4 7 0 1.7-1.3 3-3 3h-1" />
    </svg>
  );
}

function SnackIcon() {
  return (
    <svg
      aria-hidden="true"
      className="canteen-screen__section-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h16" />
      <path d="M5 10v8h14v-8" />
      <path d="M7 7h10" />
      <path d="M9 4h6" />
      <path d="M8 14h8" />
    </svg>
  );
}

function getCurrentDay(): MenuDayId {
  const day = new Date().getDay();

  const dayMap: Partial<Record<number, MenuDayId>> = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };

  return dayMap[day] ?? 'monday';
}

function getSectionIcon(title: string) {
  switch (title) {
    case 'Завтрак':
      return <BreakfastIcon />;
    case 'Обед':
      return <LunchIcon />;
    case 'Полдник':
      return <SnackIcon />;
    default:
      return null;
  }
}

export function CanteenScreen({
  menu,
  onNavigateHome,
}: CanteenScreenProps) {
  const [selectedDay, setSelectedDay] =
    useState<MenuDayId>(getCurrentDay);

  const selectedDayIndex = menu.findIndex(
    (day) => day.id === selectedDay,
  );

  const selectedMenu = menu[selectedDayIndex] ?? menu[0];

  function selectPreviousDay() {
    const previousIndex =
      selectedDayIndex <= 0
        ? menu.length - 1
        : selectedDayIndex - 1;

    setSelectedDay(menu[previousIndex].id);
  }

  function selectNextDay() {
    const nextIndex =
      selectedDayIndex >= menu.length - 1
        ? 0
        : selectedDayIndex + 1;

    setSelectedDay(menu[nextIndex].id);
  }

  function selectToday() {
    setSelectedDay(getCurrentDay());
  }

  const isToday = selectedDay === getCurrentDay();

  return (
    <main className="canteen-screen">
      <header className="canteen-screen__header">
        <button
          className="canteen-screen__home-button"
          type="button"
          onClick={onNavigateHome}
        >
          <HomeIcon />
          <span>На главную</span>
        </button>

        <div className="canteen-screen__title">
          <h1>Столовая</h1>

          <p>
            {selectedMenu.label}, {selectedMenu.date}
          </p>
        </div>
      </header>

      <section
        className="canteen-screen__day-selector"
        aria-label="Выбор дня"
      >
        <button
          className="canteen-screen__day-arrow"
          type="button"
          aria-label="Предыдущий день"
          onClick={selectPreviousDay}
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="canteen-screen__day-list">
          {menu.map((day) => (
            <button
              className={`canteen-screen__day-button ${
                day.id === selectedDay
                  ? 'canteen-screen__day-button--selected'
                  : ''
              }`}
              type="button"
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
            >
              {day.shortLabel}
            </button>
          ))}
        </div>

        <button
          className="canteen-screen__day-arrow"
          type="button"
          aria-label="Следующий день"
          onClick={selectNextDay}
        >
          <ChevronIcon direction="right" />
        </button>
      </section>

      {!isToday && (
        <button
          className="canteen-screen__today-button"
          type="button"
          onClick={selectToday}
        >
          Сегодня
        </button>
      )}

      <section className="canteen-screen__content">
        {selectedMenu.sections.length > 0 ? (
          <div className="canteen-screen__sections">
            {selectedMenu.sections.map((section) => (
              <article
                className="canteen-screen__section"
                key={section.title}
              >
                <header className="canteen-screen__section-header">
                  <div className="canteen-screen__section-icon-wrap">
                    {getSectionIcon(section.title)}
                  </div>

                  <h2>{section.title}</h2>
                </header>

                <ul className="canteen-screen__items">
                  {section.items.map((item) => (
                    <li
                      className="canteen-screen__item"
                      key={item.name}
                    >
                      <span className="canteen-screen__item-marker" />
                      <div>
                        <strong>{item.name}</strong>

                        {item.description && (
                          <p>{item.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="canteen-screen__empty">
            <h2>Меню пока не добавлено</h2>
            <p>
              Для выбранного дня нет данных о питании.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}