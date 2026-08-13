import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    return this.prisma.gallery.findUnique({
      where: { id },
    });
  }

  async create(createGalleryDto: CreateGalleryDto) {
    return this.prisma.gallery.create({
      data: createGalleryDto,
    });
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto) {
    return this.prisma.gallery.update({
      where: { id },
      data: updateGalleryDto,
    });
  }

  async delete(id: string) {
    return this.prisma.gallery.delete({
      where: { id },
    });
  }
}
