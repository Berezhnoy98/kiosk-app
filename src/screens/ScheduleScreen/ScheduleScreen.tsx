import { useEffect, useState } from 'react';
import {
  availableClasses,
  scheduleByDay,
  scheduleDays,
  type ScheduleDay,
} from '../../data/schedule';
import './ScheduleScreen.css';

interface ScheduleScreenProps {
  onNavigateHome: () => void;
}

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="schedule-screen__home-icon"
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
      className="schedule-screen__chevron-icon"
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

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
}

function isCurrentLesson(
  startTime: string,
  endTime: string,
  currentDate: Date,
): boolean {
  const currentMinutes =
    currentDate.getHours() * 60 + currentDate.getMinutes();

  return (
    currentMinutes >= timeToMinutes(startTime) &&
    currentMinutes < timeToMinutes(endTime)
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function getCurrentDay(): ScheduleDay {
  const day = new Date().getDay();

  const dayMap: Partial<Record<number, ScheduleDay>> = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };

  return dayMap[day] ?? 'monday';
}

export function ScheduleScreen({
  onNavigateHome,
}: ScheduleScreenProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedClass, setSelectedClass] = useState('7А');
  const [selectedDay, setSelectedDay] =
    useState<ScheduleDay>(getCurrentDay);
  const [isClassPickerOpen, setIsClassPickerOpen] =
    useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  function getDateForScheduleDay(
    currentDate: Date,
    day: ScheduleDay,
  ): Date {
    const result = new Date(currentDate);
  
    const currentWeekday = currentDate.getDay();
  
    const dayNumbers: Record<ScheduleDay, number> = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };
  
    const targetWeekday = dayNumbers[day];
  
    let difference = targetWeekday - currentWeekday;
  
    if (currentWeekday === 0) {
      difference = targetWeekday;
    }
  
    if (difference < -6) {
      difference += 7;
    }
  
    if (difference > 6) {
      difference -= 7;
    }
  
    result.setDate(currentDate.getDate() + difference);
  
    return result;
  }

  const selectedScheduleDate = getDateForScheduleDay(
    currentDate,
    selectedDay,
  );
  
  const date = selectedScheduleDate.toLocaleDateString(
    'ru-RU',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  );
  
  const weekday = selectedScheduleDate.toLocaleDateString(
    'ru-RU',
    {
      weekday: 'long',
    },
  );

  const lessons =
    scheduleByDay[selectedDay][selectedClass] ?? [];

  const selectedClassIndex =
    availableClasses.indexOf(selectedClass);

  const selectedDayIndex = scheduleDays.findIndex(
    (day) => day.id === selectedDay,
  );

  function selectPreviousClass() {
    const previousIndex =
      selectedClassIndex <= 0
        ? availableClasses.length - 1
        : selectedClassIndex - 1;

    setSelectedClass(availableClasses[previousIndex]);
  }

  function selectNextClass() {
    const nextIndex =
      selectedClassIndex >= availableClasses.length - 1
        ? 0
        : selectedClassIndex + 1;

    setSelectedClass(availableClasses[nextIndex]);
  }

  function selectPreviousDay() {
    const previousIndex =
      selectedDayIndex <= 0
        ? scheduleDays.length - 1
        : selectedDayIndex - 1;

    setSelectedDay(scheduleDays[previousIndex].id);
  }

  function selectNextDay() {
    const nextIndex =
      selectedDayIndex >= scheduleDays.length - 1
        ? 0
        : selectedDayIndex + 1;

    setSelectedDay(scheduleDays[nextIndex].id);
  }

  function selectToday() {
    setSelectedDay(getCurrentDay());
  }

  const selectedDayInfo = scheduleDays.find(
    (day) => day.id === selectedDay,
  );

  const isToday = selectedDay === getCurrentDay();

  return (
    <main className="schedule-screen">
      <header className="schedule-screen__header">
  <button
    className="schedule-screen__home-button"
    type="button"
    onClick={onNavigateHome}
  >
    <HomeIcon />
    <span>На главную</span>
  </button>

  <div className="schedule-screen__title">
    <h1>Расписание</h1>

    <p>
      {weekday}, {date}
    </p>
  </div>

  <time
    className="schedule-screen__clock"
    dateTime={currentDate.toISOString()}
  >
    {formatTime(currentDate)}
  </time>
</header>

      <section className="schedule-screen__class-selector">
        <button
          className="schedule-screen__class-arrow"
          type="button"
          aria-label="Предыдущий класс"
          onClick={selectPreviousClass}
        >
          <ChevronIcon direction="left" />
        </button>

        <button
          className="schedule-screen__class-current"
          type="button"
          onClick={() =>
            setIsClassPickerOpen((isOpen) => !isOpen)
          }
          aria-expanded={isClassPickerOpen}
        >
          <span>Класс</span>
          <strong>{selectedClass}</strong>
        </button>

        <button
          className="schedule-screen__class-arrow"
          type="button"
          aria-label="Следующий класс"
          onClick={selectNextClass}
        >
          <ChevronIcon direction="right" />
        </button>
      </section>

      {isClassPickerOpen && (
        <section className="schedule-screen__class-picker">
          <h2>Выберите класс</h2>

          <div className="schedule-screen__class-grid">
            {availableClasses.map((className) => (
              <button
                className={`schedule-screen__class-option ${
                  className === selectedClass
                    ? 'schedule-screen__class-option--selected'
                    : ''
                }`}
                type="button"
                key={className}
                onClick={() => {
                  setSelectedClass(className);
                  setIsClassPickerOpen(false);
                }}
              >
                {className}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="schedule-screen__day-selector">
        <button
          className="schedule-screen__day-arrow"
          type="button"
          aria-label="Предыдущий день"
          onClick={selectPreviousDay}
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="schedule-screen__day-list">
          {scheduleDays.map((day) => (
            <button
              className={`schedule-screen__day-button ${
                day.id === selectedDay
                  ? 'schedule-screen__day-button--selected'
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
          className="schedule-screen__day-arrow"
          type="button"
          aria-label="Следующий день"
          onClick={selectNextDay}
        >
          <ChevronIcon direction="right" />
        </button>
      </section>

      {!isToday && (
        <button
          className="schedule-screen__today-button"
          type="button"
          onClick={selectToday}
        >
          Сегодня
        </button>
      )}

      <div className="schedule-screen__selected-day">
        {selectedDayInfo?.label}
      </div>

      <section className="schedule-screen__content">
        {lessons.length > 0 ? (
          <div className="schedule-screen__list">
            {lessons.map((lesson) => {
              const current =
                isToday &&
                isCurrentLesson(
                  lesson.time,
                  lesson.endTime,
                  currentDate,
                );

              return (
                <article
                  className={`schedule-screen__lesson ${
                    current
                      ? 'schedule-screen__lesson--current'
                      : ''
                  }`}
                  key={`${selectedDay}-${lesson.time}-${lesson.subject}`}
                >
                  <div className="schedule-screen__time">
                    {lesson.time}
                  </div>

                  <div className="schedule-screen__lesson-info">
                    <h2>{lesson.subject}</h2>

                    <div className="schedule-screen__details">
                      <span>{lesson.className}</span>
                      <span>Кабинет {lesson.room}</span>
                    </div>
                  </div>

                  {current && (
                    <span className="schedule-screen__current-label">
                      Сейчас
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="schedule-screen__empty">
            <h2>Расписание пока не добавлено</h2>
            <p>
              Для класса {selectedClass} на этот день нет
              данных.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
