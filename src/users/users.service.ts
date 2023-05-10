import { Injectable, Logger } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../utils/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(UsersService.name);

  public async users(params: { skip?: number; take?: number; orderBy?: Prisma.UserOrderByWithRelationInput }): Promise<User[]> {
    const { skip, take, orderBy } = params;
    this.logger.log('Got all users');
    return await this.prisma.user.findMany({
      skip,
      take,
      orderBy,
    });
  }

  public async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    this.logger.log('Got the one user');
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  public async createUser(data: Prisma.UserCreateInput): Promise<User> {
    this.logger.log('Made a new user');
    return await this.prisma.user.create({
      data,
    });
  }

  public async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
    this.logger.log('Updated existing user');
    const { data, where } = params;
    return await this.prisma.user.update({
      data,
      where,
    });
  }
}
