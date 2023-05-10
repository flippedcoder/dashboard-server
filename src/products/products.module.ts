import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  exports: [ProductsService],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
