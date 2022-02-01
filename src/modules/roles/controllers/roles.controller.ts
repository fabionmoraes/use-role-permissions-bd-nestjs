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
import { CreateRoleDto } from '../dtos/CreateRole.dto';
import { RolesService } from '../services/roles.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(PermissionsInterceptor)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.rolesService.delete(+id);
  }

  @Post()
  async create(@Body() data: CreateRoleDto) {
    return await this.rolesService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.rolesService.delete(+id);
  }
}
