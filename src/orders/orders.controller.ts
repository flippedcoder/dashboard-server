import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Order } from './orders.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  public async orders(): Promise<Array<Order>> {
    return await this.ordersService.orders({});
  }

  @Get(':id')
  public async order(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.ordersService.order({ id });
  }

  @Post()
  public async create(@Body() order: Order): Promise<Order> {
    order.createdAt = new Date();
    order.updatedAt = new Date();
    return await this.ordersService.createOrder(order);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() order: Order,
  ): Promise<Order> {
    order.updatedAt = new Date();
    return await this.ordersService.updateOrder({
      where: { id },
      data: order,
    });
  }
}
