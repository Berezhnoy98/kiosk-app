import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.video.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getById(id: string) {
    return this.prisma.video.findUnique({ where: { id } });
  }

  async create(createVideoDto: CreateVideoDto) {
    return this.prisma.video.create({ data: createVideoDto });
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.prisma.video.update({ where: { id }, data: updateVideoDto });
  }

  async delete(id: string) {
    return this.prisma.video.delete({ where: { id } });
  }

  // Playlists and video items
  async createPlaylist(title: string, description?: string) {
    return this.prisma.playlist.create({ data: { title, description } });
  }

  async getPlaylists() {
    return this.prisma.playlist.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async uploadVideo(playlistId: string, file: Express.Multer.File, thumbnail?: Express.Multer.File) {
    const uploadsDir = path.join(process.cwd(), 'backend', 'uploads', 'videos');
    try {
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const filename = `${Date.now()}-${file.originalname}`.replace(/\s+/g, '_');
      const target = path.join(uploadsDir, filename);
      fs.writeFileSync(target, file.buffer);
      const url = `/uploads/videos/${filename}`;

      let thumbUrl: string | undefined = undefined;
      if (thumbnail) {
        const tname = `${Date.now()}-thumb-${thumbnail.originalname}`.replace(/\s+/g, '_');
        const ttarget = path.join(uploadsDir, tname);
        fs.writeFileSync(ttarget, thumbnail.buffer);
        thumbUrl = `/uploads/videos/${tname}`;
      }

      const videoItem = await this.prisma.videoItem.create({
        data: { playlistId, title: file.originalname, filename, url, thumbnail: thumbUrl },
      });

      return videoItem;
    } catch (err) {
      throw new InternalServerErrorException('Failed to store video');
    }
  }
}
