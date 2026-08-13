# Kiosk App Backend

NestJS + Prisma + PostgreSQL

## Installation

1. Copy `.env.example` to `.env` и заполни DATABASE_URL:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Setup database and run migrations:

```bash
npm run prisma:migrate:dev
```

4. Seed database with initial data:

```bash
npm run prisma:seed
```

## Running

Development mode (with watch):
```bash
npm run dev
```

Production build:
```bash
npm run build
npm run prod
```

## API Endpoints

### Auth
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Menu
- `GET /menu` - Get all menu items
- `GET /menu/:id` - Get specific menu item
- `POST /menu` - Create menu item (admin/canteen)
- `PUT /menu/:id` - Update menu item (admin/canteen)
- `DELETE /menu/:id` - Delete menu item (admin/canteen)

### News
- `GET /news` - Get all news
- `GET /news/sources/active` - Get active news sources
- `GET /news/sources` - Get all news sources (auth)
- `GET /news/sources/:id` - Get specific news source
- `POST /news/sources` - Create news source (auth)
- `PUT /news/sources/:id` - Update news source (auth)
- `DELETE /news/sources/:id` - Delete news source (auth)
- `GET /news/source/:sourceId` - Get news by source

### Schedule
- `GET /schedule` - Get all schedule items
- `GET /schedule/:id` - Get specific schedule item
- `POST /schedule` - Create schedule item (auth)
- `PUT /schedule/:id` - Update schedule item (auth)
- `DELETE /schedule/:id` - Delete schedule item (auth)

### Gallery
- `GET /gallery` - Get all gallery items
- `GET /gallery/:id` - Get specific gallery item
- `POST /gallery` - Create gallery item (auth)
- `PUT /gallery/:id` - Update gallery item (auth)
- `DELETE /gallery/:id` - Delete gallery item (auth)

### Video
- `GET /video` - Get all videos
- `GET /video/:id` - Get specific video
- `POST /video` - Create video (auth)
- `PUT /video/:id` - Update video (auth)
- `DELETE /video/:id` - Delete video (auth)

### Health
- `GET /health` - Health check

## Default Credentials

Admin:
- Email: `admin@kiosk.local`
- Password: `password`

Canteen:
- Email: `canteen@kiosk.local`
- Password: `password`
