import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersV1Controller } from './orders.controller';
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  exports: [OrdersService],
  providers: [OrdersService, PrismaService],
  controllers: [OrdersV1Controller],
})
export class OrdersModule {}
