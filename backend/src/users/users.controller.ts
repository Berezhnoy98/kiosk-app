import { Controller, Get, Param, UseGuards, Patch, Body, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUserRole(@Param('id') id: string, @Body('role') role: string) {
    return this.usersService.updateUserRole(id, role);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/password')
  async changePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.usersService.changePassword(id, password);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
