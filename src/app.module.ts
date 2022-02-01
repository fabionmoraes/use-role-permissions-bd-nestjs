import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.modules';
import { PermissionsModule } from 'modules/permissions/permissions.module';
import { RolesModule } from 'modules/roles/roles.module';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [AuthModule, RolesModule, UsersModule, PermissionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
