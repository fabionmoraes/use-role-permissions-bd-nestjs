import { Controller, Get, Param, Request } from '@nestjs/common';
import { AllRouters, Permission, Permissions } from 'role-permissions-bd';
import { RolesService } from 'modules/roles/services/roles.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private rolesService: RolesService) {}

  @Get('routes')
  getAllRoutes(@Request() req) {
    return AllRouters(req);
  }

  @Get('tools')
  async findAllTools(@Request() req) {
    const rolesRes = await this.rolesService.findAll();

    return Permissions(req, { roles: rolesRes });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const role = await this.rolesService.findOne(+id);

    return Permission(req, { role });
  }
}
