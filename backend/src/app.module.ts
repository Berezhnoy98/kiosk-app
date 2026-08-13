import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MenuModule } from './menu/menu.module';
import { NewsModule } from './news/news.module';
import { ScheduleModule } from './schedule/schedule.module';
import { GalleryModule } from './gallery/gallery.module';
import { VideoModule } from './video/video.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    UsersModule,
    MenuModule,
    NewsModule,
    ScheduleModule,
    GalleryModule,
    VideoModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
