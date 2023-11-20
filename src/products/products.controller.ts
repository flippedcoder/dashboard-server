import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Product } from './products.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async products(): Promise<Array<Product>> {
    return await this.productsService.products({});
  }

  @Get(':id')
  public async product(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productsService.product({ id });
  }

  @Post()
  public async create(@Body() product: Product): Promise<Product> {
    product.createdAt = new Date();
    product.updatedAt = new Date();
    return await this.productsService.createProduct(product);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Product,
  ): Promise<Product> {
    product.updatedAt = new Date();
    return await this.productsService.updateProduct({
      where: { id },
      data: product,
    });
  }
}
