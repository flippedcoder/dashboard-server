import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersV1Controller } from './orders.controller';
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  controllers: [OrdersV1Controller],
  exports: [OrdersService],
  providers: [OrdersService, PrismaService],
})
export class OrdersModule {}
