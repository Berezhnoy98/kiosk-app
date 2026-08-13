# Kiosk App - Monorepo

Интерактивный киоск с админ-панелью, управлением меню, новостями, расписанием и видео.

## Структура проекта

```
kiosk-app/
├── src/                  # Frontend React приложение
│   ├── components/       # React компоненты (админ-панель, логин)
│   ├── screens/          # Экраны киоска
│   ├── services/         # API сервисы
│   ├── config/           # Конфигурация
│   ├── types/            # TypeScript типы
│   ├── data/             # Локальные данные
│   ├── App.tsx           # Корневой компонент
│   └── main.tsx          # Entry point
├── backend/              # NestJS + Prisma + PostgreSQL
│   ├── src/
│   │   ├── auth/         # JWT аутентификация
│   │   ├── menu/         # CRUD меню
│   │   ├── news/         # Управление новостями и RSS
│   │   ├── schedule/     # Расписание
│   │   ├── gallery/      # Галерея
│   │   ├── video/        # Видео
│   │   ├── users/        # Пользователи
│   │   ├── prisma/       # ORM конфиг
│   │   └── app.module.ts # Main module
│   ├── prisma/
│   │   ├── schema.prisma # DB schema
│   │   └── seed.ts       # Initial data
│   └── package.json
├── package.json
├── vite.config.ts
└── README.md
```

## Быстрый старт

### Frontend

```bash
# Установка зависимостей
npm install

# Dev сервер (http://localhost:5173)
npm run dev

# Сборка для продакшена
npm run build

# Preview
npm run preview
```

### Backend

```bash
cd backend

# Установка зависимостей
npm install

# Копирование env
cp .env.example .env
# Отредактировать DATABASE_URL для PostgreSQL

# Миграции
npm run prisma:migrate:dev

# Заполнение БД тестовыми данными
npm run prisma:seed

# Dev сервер (http://localhost:3000)
npm run dev

# Сборка
npm run build

# Production
npm run prod
```

## API Endpoints

Смотри [backend/README.md](./backend/README.md)

## Технологический стек

### Frontend
- React 19 + TypeScript
- Vite + CSS
- JWT сервисы

### Backend
- NestJS 10
- Prisma ORM
- PostgreSQL
- JWT + Passport
- Class Validator

## Аутентификация

JWT токены с двумя ролями:
- **ADMIN** - Полный доступ
- **CANTEEN** - Только редактирование меню

Доступ к админке: `/login`

## Переменные окружения

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/kiosk_app"
JWT_SECRET="your-secret-key"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

## Разработка

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Prisma Studio (optional)
cd backend && npm run prisma:studio
```

## License

UNLICENSED

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
