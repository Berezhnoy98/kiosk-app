import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Get()
  async getAll() {
    return this.galleryService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.galleryService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createGalleryDto: CreateGalleryDto) {
    return this.galleryService.create(createGalleryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(id, updateGalleryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.galleryService.delete(id);
  }

  // Albums
  @UseGuards(JwtAuthGuard)
  @Post('albums')
  async createAlbum(@Body() dto: CreateAlbumDto) {
    return this.galleryService.createAlbum(dto.title, dto.description);
  }

  @Get('albums')
  async getAlbums() {
    return this.galleryService.getAlbums();
  }

  // Upload photos to album
  @UseGuards(JwtAuthGuard)
  @Post('albums/:id/photos')
  @UseInterceptors(FilesInterceptor('photos'))
  async uploadPhotos(@Param('id') id: string, @UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) throw new BadRequestException('No files uploaded');
    return this.galleryService.uploadPhotos(id, files);
  }
}
