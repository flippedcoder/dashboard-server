import { Injectable, Logger } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../utils/prisma.service';

interface Product {
  name: string;
  price: number;
  inStock: number;
  lastOrdered: Date;
  totalOrders: number;
}

@Injectable()
export class StripeService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(StripeService.name);

  public async orders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    this.logger.log('Got all orders');
    return await this.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  public async order(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput): Promise<Order | null> {
    this.logger.log('Got the one order');
    return await this.prisma.order.findUnique({
      where: orderWhereUniqueInput,
    });
  }

  public async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    this.logger.log('Made a new order');
    return await this.prisma.order.create({
      data,
    });
  }

  public async updateOrder(params: { where: Prisma.OrderWhereUniqueInput; data: Prisma.OrderUpdateInput }): Promise<Order> {
    this.logger.log('Updated existing order');
    const { data, where } = params;
    return await this.prisma.order.update({
      data,
      where,
    });
  }
}
