import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
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

  // Playlists
  @UseGuards(JwtAuthGuard)
  @Post('playlists')
  async createPlaylist(@Body() dto: CreatePlaylistDto) {
    return this.videoService.createPlaylist(dto.title, dto.description);
  }

  @Get('playlists')
  async getPlaylists() {
    return this.videoService.getPlaylists();
  }

  // Upload video to playlist (single file, optional thumbnail)
  @UseGuards(JwtAuthGuard)
  @Post('playlists/:id/videos')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadVideo(@Param('id') id: string, @UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) throw new BadRequestException('No files uploaded');
    // Expect first file to be video, optional second to be thumbnail
    const videoFile = files[0];
    const thumb = files.length > 1 ? files[1] : undefined;
    return this.videoService.uploadVideo(id, videoFile, thumb);
  }
}
