import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import Stripe from 'stripe';
import { CreateStripePaymentDto, CreateStripeProductDto } from './stripe.interface';

@Injectable()
export class StripeService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(StripeService.name);
  // Keep the version string like this because Stripe said so
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' });

  public async createProduct(product: CreateStripeProductDto) {
    this.logger.log('Started product update in Stripe');
    try {
      const productResponse = await this.stripe.products.create({
        name: product.name,
        description: product.description,
      });

      this.logger.log('Adding product price info in Stripe');
      const priceResponse = await this.stripe.prices.create({
        product: productResponse.id,
        unit_amount: 1009,
        currency: 'usd',
      });

      const productRecord = {
        stripeProductId: productResponse.id,
        name: productResponse.name,
        price: priceResponse.unit_amount,
      };

      await this.prisma.product.create({ data: productRecord });

      this.logger.log('Created product in DB');
    } catch (err) {
      this.logger.error('Stripe failed');

      throw new Error('Stripe failed');
    }
  }

  public async createPayment({
    payment,
    origin,
    res,
  }: {
    payment: CreateStripePaymentDto;
    origin: string;
    res: any;
  }) {
    this.logger.log('Started payment in Stripe');

    try {
      // Create Checkout Sessions from body params.
      const session = await this.stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, price_H5ggYwtDq4fbrJ) of the product you want to sell
            price: payment.priceId,
            quantity: payment.quantity,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/?success=true`,
        cancel_url: `${origin}/?canceled=true`,
      });

      res.status(303).redirect(session.url);
    } catch (err) {
      throw Error('Something happened with Stripe');
    }
  }
}
