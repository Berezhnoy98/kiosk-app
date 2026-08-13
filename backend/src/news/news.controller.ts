import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsSourceDto } from './dto/create-news-source.dto';
import { UpdateNewsSourceDto } from './dto/update-news-source.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('sources/active')
  async getActiveSources() {
    return this.newsService.getActiveSources();
  }

  @UseGuards(JwtAuthGuard)
  @Get('sources')
  async getAllSources() {
    return this.newsService.getAllSources();
  }

  @Get('sources/:id')
  async getSourceById(@Param('id') id: string) {
    return this.newsService.getSourceById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sources')
  async createSource(@Body() createNewsSourceDto: CreateNewsSourceDto) {
    return this.newsService.createSource(createNewsSourceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('sources/:id')
  async updateSource(@Param('id') id: string, @Body() updateNewsSourceDto: UpdateNewsSourceDto) {
    return this.newsService.updateSource(id, updateNewsSourceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('sources/:id')
  async deleteSource(@Param('id') id: string) {
    return this.newsService.deleteSource(id);
  }

  @Get()
  async getAllNews(@Query('limit') limit?: string) {
    return this.newsService.getAllNews(limit ? parseInt(limit) : 50);
  }

  @Get('source/:sourceId')
  async getNewsBySourceId(@Param('sourceId') sourceId: string, @Query('limit') limit?: string) {
    return this.newsService.getNewsBySourceId(sourceId, limit ? parseInt(limit) : 20);
  }
}
