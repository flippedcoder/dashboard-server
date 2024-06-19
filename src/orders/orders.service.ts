import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../utils/prisma.service';
import datadogLogger from '../utils/loggers/datadog';
import { CreateOrderDto, UpdateOrderDto } from './orders.interface';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(OrdersService.name);

  public async orders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    this.logger.log('GET /v1/orders requested');
    datadogLogger.info('GET /v1/orders requested');
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

  public async createOrder(data: CreateOrderDto): Promise<Order> {
    const modifiedOrder = { ...data, createdAt: new Date(), updatedAt: new Date() };

    this.logger.debug(`Made a new order: ${JSON.stringify(modifiedOrder)}`);

    const newOrder = await this.prisma.order.create({
      data: {
        total: modifiedOrder.total,
        createdAt: modifiedOrder.createdAt,
        userId: modifiedOrder.userId,
        updatedAt: modifiedOrder.updatedAt,
        products: {
          connect: modifiedOrder.products.map((product) => ({ id: product.id })),
        },
      },
    });

    return newOrder;
  }

  public async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: UpdateOrderDto;
  }): Promise<Order> {
    const { data, where } = params;
    this.logger.log(`Updated existing order ${where.id}`);

    try {
      const updatedOrder = await this.prisma.order.update({
        data: {
          total: data.total,
          userId: data.userId,
          products: {
            connect: data.products.map((product) => ({ id: product.id })),
          },
          updatedAt: new Date(),
        },
        where,
      });

      this.logger.log(`Updated for existing order ${updatedOrder.id} successful`);

      return updatedOrder;
    } catch (err) {
      this.logger.log(`Updated for existing order ${where.id} failed`);

      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  public async deleteOrder(params: { where: Prisma.OrderWhereUniqueInput }): Promise<Order> {
    this.logger.log('Deleted existing order');
    const { where } = params;
    return await this.prisma.order.delete({
      where,
    });
  }

  // public async getFeaturedProductsList(): Promise<Product[]> {
  //   this.logger.log('Got featured products');
  //   const allOrders = await this.prisma.order.findMany();
  //   const ordersByQuantity = allOrders.sort((orderA, orderB) => orderA.quantity - orderB.quantity);
  //   const products: Product[] = ordersByQuantity.map((order) => ({
  //     name: order.name,
  //     price: order.total / order.quantity,
  //     lastOrdered: order.createdAt,
  //     totalOrders: order.quantity,
  //     inStock: order.quantity,
  //   }));
  //   return products;
  // }
}
