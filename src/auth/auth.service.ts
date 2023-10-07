import { Injectable, Logger } from '@nestjs/common';
import { Auth, Prisma } from '@prisma/client';
import { PrismaService } from '../utils/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(AuthService.name);

  public async userPermissions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Auth[]> {
    const { skip, take, cursor, where, orderBy } = params;
    this.logger.log('Got all orders');
    return await this.prisma.auth.userPermissions({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  public async accessToken(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
  ): Promise<Auth | null> {
    this.logger.log('Got the one order');
    return await this.prisma.auth.accessToken({
      where: orderWhereUniqueInput,
    });
  }

  public async login(data: Prisma.OrderCreateInput): Promise<Auth> {
    this.logger.log('Made a new order');
    return await this.prisma.auth.login({
      data,
    });
  }

  public async logout(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }): Promise<Auth> {
    this.logger.log('Updated existing order');
    const { data, where } = params;
    return await this.prisma.auth.logout({
      data,
      where,
    });
  }
}
