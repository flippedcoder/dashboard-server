import { Injectable, Logger } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../utils/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(ProductsService.name);

  public async products(params: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, orderBy } = params;
    this.logger.log('Got all orders');
    return await this.prisma.product.findMany({
      skip,
      take,
      orderBy,
    });
  }

  public async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    this.logger.log('Got the one order');
    return await this.prisma.product.findUnique({
      where: productWhereUniqueInput,
    });
  }

  public async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    this.logger.log('Made a new order');
    return await this.prisma.product.create({
      data,
    });
  }

  public async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    this.logger.log('Updated existing order');
    const { data, where } = params;
    return await this.prisma.product.update({
      data,
      where,
    });
  }

  public async getFeaturedProductsList(): Promise<Product[]> {
    this.logger.log('Got featured products');
    const allOrders = await this.prisma.order.findMany();
    const ordersByQuantity = allOrders.sort((orderA, orderB) => orderA.quantity - orderB.quantity);
    const products: Product[] = ordersByQuantity.map((order) => ({
      name: order.name,
      price: order.total / order.quantity,
      lastOrdered: order.createdAt,
      totalOrders: order.quantity,
      inStock: order.quantity,
    }));
    return products;
  }
}
