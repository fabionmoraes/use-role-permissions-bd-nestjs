import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaClient } from 'shared/prismaClient';
import { CreateUserRoleDto } from '../dtos/CreateUserRole.dto';

@Injectable()
export class UserRolesService {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateUserRoleDto): Promise<UserRole> {
    return await this.prisma.userRole.create({ data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.userRole.delete({
      where: { id },
    });
  }
}
