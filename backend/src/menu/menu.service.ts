import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getAllItems() {
    return this.prisma.menuItem.findMany({
      where: { available: true },
      orderBy: { category: 'asc' },
    });
  }

  async getItem(id: string) {
    return this.prisma.menuItem.findUnique({
      where: { id },
    });
  }

  async createItem(createMenuItemDto: CreateMenuItemDto) {
    return this.prisma.menuItem.create({
      data: createMenuItemDto,
    });
  }

  async updateItem(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    return this.prisma.menuItem.update({
      where: { id },
      data: updateMenuItemDto,
    });
  }

  async deleteItem(id: string) {
    return this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
