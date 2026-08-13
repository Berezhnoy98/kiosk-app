import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  async getAll() {
    return this.videoService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.videoService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(id, updateVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.videoService.delete(id);
  }
}
