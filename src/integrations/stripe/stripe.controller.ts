import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { StripeGet, StripePost } from './stripe.interface';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  public async orders(): Promise<Array<StripeGet>> {
    return await this.stripeService.orders({});
  }

  @Get(':id')
  public async order(@Param('id', ParseIntPipe) id: number): Promise<StripeGet> {
    return await this.stripeService.order({ id });
  }

  @Post()
  public async create(@Body() stripe: StripePost): Promise<StripePost> {
    stripe.createdAt = new Date();
    stripe.updatedAt = new Date();
    return await this.stripeService.createOrder(stripe);
  }

  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() stripe: StripePost): Promise<StripePost> {
    stripe.updatedAt = new Date();
    return await this.stripeService.updateOrder({
      where: { id },
      data: stripe,
    });
  }
}
