import { Global, Module } from '@nestjs/common';
import { PrismaClient } from 'shared/prismaClient';
import { RolesController } from './controllers/roles.controller';
import { UserRolesController } from './controllers/userRoles.controller';
import { RolesService } from './services/roles.service';
import { UserRolesService } from './services/userRoles.service';

@Global()
@Module({
  imports: [],
  controllers: [RolesController, UserRolesController],
  providers: [RolesService, UserRolesService, PrismaClient],
  exports: [RolesService, UserRolesService],
})
export class RolesModule {}
