import { Body, Controller, Headers, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripePaymentDto, CreateStripeProductDto } from './stripe.interface';

@Controller('/v1/stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/products')
  public async createProduct(@Body() product: CreateStripeProductDto) {
    try {
      const paymentInfo = await this.stripeService.createProduct(product);

      return paymentInfo;
    } catch (err) {
      throw new HttpException('Something happened', HttpStatus.NOT_FOUND);
    }
  }

  @Post('/payments')
  public async createPayment(
    @Body() payment: CreateStripePaymentDto,
    @Headers() headers,
    @Res() res,
  ) {
    try {
      const paymentInfo = await this.stripeService.createPayment({
        payment,
        res,
        origin: headers.origin,
      });

      return paymentInfo;
    } catch (err) {
      throw new HttpException('Something happened', HttpStatus.NOT_FOUND);
    }
  }
}
