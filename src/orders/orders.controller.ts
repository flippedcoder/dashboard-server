import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto, Order, UpdateOrderDto } from './orders.interface';
import { OrdersService } from './orders.service';
import { User } from '@prisma/client';

@Controller('/v1/orders')
export class OrdersV1Controller {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  public async create(@Body() user: User, order: CreateOrderDto): Promise<Order> {
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (!user.permissions.includes('get:orders')) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    try {
      const newOrder = await this.ordersService.createOrder(order);
      return newOrder;
    } catch (err) {
      throw new HttpException('Something happened', HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  public async orders(@Param() user: User): Promise<Array<Order>> {
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (!user.permissions.includes('get:orders')) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    try {
      const orders = await this.ordersService.orders({});
      return orders;
    } catch (err) {
      if (err) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Generic', HttpStatus.BAD_GATEWAY);
    }
  }

  @Get(':id')
  public async order(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.ordersService.order({ id });
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() order: UpdateOrderDto,
  ): Promise<Order> {
    try {
      return await this.ordersService.updateOrder({
        where: { id },
        data: order,
      });
    } catch (err) {
      if (err) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Generic', HttpStatus.BAD_GATEWAY);
    }
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.ordersService.deleteOrder({ where: { id } });
  }
}
