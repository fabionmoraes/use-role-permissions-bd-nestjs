import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClient } from 'shared/prismaClient';
import { CreateUserDto } from '../dtos/CreateUserDto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    try {
      const result = await this.prisma.user.findUnique({
        where: { id },
      });

      return result;
    } catch (err: any) {
      throw new HttpException(err.message, 400);
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.prisma.user.findFirst({
        where: { email },
      });

      return result;
    } catch (err: any) {
      throw new HttpException(err.message, 400);
    }
  }

  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
