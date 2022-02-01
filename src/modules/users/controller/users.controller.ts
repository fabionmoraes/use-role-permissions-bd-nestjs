import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/shared/jwt-auth.guard';
import { PermissionsInterceptor } from 'interceptors/permissions.interceptor';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(PermissionsInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.usersService.delete(id);
  }
}
