import { CreateStripeProductDto } from 'src/integrations/stripe/stripe.interface';

export const mock: CreateStripeProductDto = {
  name: 'Gold Special',
  description: 'Lorem ipsum bacom ipsum look up slipsum and other sums',
  default_price_data: {
    currency: 'USD',
    unit_amount: 23.99,
  },
};
