import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    return this.prisma.video.findUnique({
      where: { id },
    });
  }

  async create(createVideoDto: CreateVideoDto) {
    return this.prisma.video.create({
      data: createVideoDto,
    });
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.prisma.video.update({
      where: { id },
      data: updateVideoDto,
    });
  }

  async delete(id: string) {
    return this.prisma.video.delete({
      where: { id },
    });
  }
}
