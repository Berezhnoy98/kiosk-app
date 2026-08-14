import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Allow Vite dev server origins (5173 default, 5174 if port changed).
  const frontendUrl = process.env.FRONTEND_URL;
  const allowedOrigins = frontendUrl
    ? frontendUrl.split(',').map((s) => s.trim())
    : ['http://localhost:5173', 'http://localhost:5174'];

  // During local development allow requests from the Vite dev server.
  // Use a permissive CORS policy to avoid origin mismatches across dev ports.
  app.enableCors({
    origin: true, // reflect request origin
    credentials: true,
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);

  console.log(`✅ Backend running on http://localhost:${port}`);
}

bootstrap();
