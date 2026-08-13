import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default users (passwords hashed)
  const adminPasswordHash = bcrypt.hashSync('admin123', 10);
  const canteenPasswordHash = bcrypt.hashSync('canteen123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@kiosk.local' },
    update: {},
    create: {
      email: 'admin@kiosk.local',
      password: adminPasswordHash,
      name: 'Administrator',
      role: UserRole.ADMIN,
    },
  });

  const canteen = await prisma.user.upsert({
    where: { email: 'canteen@kiosk.local' },
    update: {},
    create: {
      email: 'canteen@kiosk.local',
      password: canteenPasswordHash,
      name: 'Canteen Staff',
      role: UserRole.CANTEEN,
    },
  });

  // Create news source
  const newsSource = await prisma.newsSource.upsert({
    where: { url: 'https://xn--80aafiekc1asiko8qd.xn--80aze9d.xn--p1ai/presscenter/news/rss' },
    update: {},
    create: {
      name: 'Школа Полярная Звезда',
      url: 'https://xn--80aafiekc1asiko8qd.xn--80aze9d.xn--p1ai/presscenter/news/rss',
      isActive: true,
    },
  });

  // Create sample menu items
  const categories = ['Первые блюда', 'Вторые блюда', 'Гарниры', 'Напитки', 'Десерты'];

  for (const category of categories) {
    await prisma.menuItem.create({
      data: {
        name: `Блюдо из ${category}`,
        price: Math.random() * 150 + 50,
        category,
        available: true,
      },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('Admin user:', admin.email);
  console.log('Canteen user:', canteen.email);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
