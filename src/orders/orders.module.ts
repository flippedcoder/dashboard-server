import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersV1Controller } from './orders.controller';

@Module({
  exports: [OrdersService],
  providers: [OrdersService],
  controllers: [OrdersV1Controller],
})
export class OrdersModule {}
