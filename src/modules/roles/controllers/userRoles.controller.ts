import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/shared/jwt-auth.guard';
import { PermissionsInterceptor } from 'interceptors/permissions.interceptor';
import { CreateUserRoleDto } from '../dtos/CreateUserRole.dto';
import { UserRolesService } from '../services/userRoles.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(PermissionsInterceptor)
@Controller('user_roles')
export class UserRolesController {
  constructor(private userRolesService: UserRolesService) {}

  @Post()
  create(@Body() data: CreateUserRoleDto) {
    return this.userRolesService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.userRolesService.delete(id);
  }
}
