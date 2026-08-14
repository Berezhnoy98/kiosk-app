import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import * as fs from 'fs';
import * as path from 'path';

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

  // Albums and photos
  async createAlbum(title: string, description?: string) {
    return this.prisma.album.create({
      data: { title, description },
    });
  }

  async getAlbums() {
    return this.prisma.album.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async uploadPhotos(albumId: string, files: Express.Multer.File[]) {
    const uploadsDir = path.join(process.cwd(), 'backend', 'uploads', 'photos');
    try {
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const created = [];
      for (const file of files) {
        const filename = `${Date.now()}-${file.originalname}`.replace(/\s+/g, '_');
        const target = path.join(uploadsDir, filename);
        fs.writeFileSync(target, file.buffer);
        const url = `/uploads/photos/${filename}`;
        const photo = await this.prisma.photo.create({
          data: { albumId, filename, url },
        });
        created.push(photo);
      }

      return created;
    } catch (err) {
      throw new InternalServerErrorException('Failed to store files');
    }
  }
}
