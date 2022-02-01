import { Global, Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';

@Global()
@Module({
  imports: [],
  controllers: [PermissionsController],
  providers: [],
  exports: [],
})
export class PermissionsModule {}
