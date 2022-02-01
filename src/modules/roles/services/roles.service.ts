import { HttpException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaClient } from 'shared/prismaClient';
import { slug } from 'shared/utils/slug';
import { CreateRoleDto } from '../dtos/CreateRole.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaClient) {}

  async findOne(id: number): Promise<Role | null> {
    try {
      const result = await this.prisma.role.findFirst({
        where: { id },
      });

      return result;
    } catch (err: any) {
      throw new HttpException(err.message, 400);
    }
  }

  async findAll(): Promise<Role[]> {
    const result = await this.prisma.role.findMany();

    return result;
  }

  async create(data: CreateRoleDto): Promise<Role> {
    const { name, permissions } = data;

    try {
      const result = await this.prisma.role.create({
        data: {
          name,
          permissions: permissions ? JSON.stringify(permissions) : '',
          slug: slug(name),
        },
      });

      return result;
    } catch (err: any) {
      throw new HttpException(err.message, 400);
    }
  }

  async delete(id: number) {
    await this.prisma.role.delete({
      where: { id },
    });
  }
}
