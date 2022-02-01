import { Global, Module } from '@nestjs/common';
import { PrismaClient } from 'shared/prismaClient';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';

@Global()
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaClient],
  exports: [UsersService],
})
export class UsersModule {}
