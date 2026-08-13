import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsSourceDto } from './dto/create-news-source.dto';
import { UpdateNewsSourceDto } from './dto/update-news-source.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async getActiveSources() {
    return this.prisma.newsSource.findMany({
      where: { isActive: true },
    });
  }

  async getAllSources() {
    return this.prisma.newsSource.findMany();
  }

  async getSourceById(id: string) {
    return this.prisma.newsSource.findUnique({
      where: { id },
    });
  }

  async createSource(createNewsSourceDto: CreateNewsSourceDto) {
    return this.prisma.newsSource.create({
      data: createNewsSourceDto,
    });
  }

  async updateSource(id: string, updateNewsSourceDto: UpdateNewsSourceDto) {
    return this.prisma.newsSource.update({
      where: { id },
      data: updateNewsSourceDto,
    });
  }

  async deleteSource(id: string) {
    return this.prisma.newsSource.delete({
      where: { id },
    });
  }

  async getNewsBySourceId(sourceId: string, limit: number = 20) {
    return this.prisma.newsItem.findMany({
      where: { sourceId },
      take: limit,
      orderBy: { pubDate: 'desc' },
    });
  }

  async getAllNews(limit: number = 50) {
    return this.prisma.newsItem.findMany({
      take: limit,
      orderBy: { pubDate: 'desc' },
    });
  }

  async createNewsItem(data: {
    title: string;
    description: string;
    link?: string;
    pubDate: Date;
    sourceId: string;
  }) {
    return this.prisma.newsItem.create({
      data,
    });
  }
}
