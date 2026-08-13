import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  async getAllItems() {
    return this.menuService.getAllItems();
  }

  @Get(':id')
  async getItem(@Param('id') id: string) {
    return this.menuService.getItem(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuService.createItem(createMenuItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateItem(@Param('id') id: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuService.updateItem(id, updateMenuItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return this.menuService.deleteItem(id);
  }
}
