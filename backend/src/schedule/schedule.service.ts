import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.schedule.findMany({
      orderBy: { date: 'asc' },
    });
  }

  async getById(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  async create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: createScheduleDto,
    });
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.schedule.update({
      where: { id },
      data: updateScheduleDto,
    });
  }

  async delete(id: string) {
    return this.prisma.schedule.delete({
      where: { id },
    });
  }
}
