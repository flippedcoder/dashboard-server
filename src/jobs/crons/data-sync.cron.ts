import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Stripe from 'stripe';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  // Keep the version string like this because Stripe said so
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' });
  private readonly logger = new Logger(TasksService.name);

  @Cron('5 00 * * *')
  async cronSyncStripeOrders() {
    this.logger.debug(`Stripe orders sync started at ${new Date()}`);

    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);

    // Set params to get the invoices that have been created since yesterday
    const params = {
      created: {
        gte: yesterday,
      },
    };

    // Get invoices from Stripe
    const { data: latestInvoices } = await this.stripe.invoices.list(params);

    // Check that there are new invoices to process
    if (latestInvoices.length === 0) {
      this.logger.debug(`No new Stripe invoices since ${yesterday}`);
      return;
    }

    // Loop through invoices and create new DB records
    for (const invoice of latestInvoices) {
      const orderRecord = {
        name: invoice.account_name,
        stripeInvoiceId: invoice.id,
        total: invoice.total,
      };

      try {
        await this.prisma.order.create({ data: orderRecord });
      } catch (error) {
        this.logger.debug(`Something happened with invoice ${invoice.id}: ${error}`);
      }
    }

    this.logger.debug(`Stripe orders sync finished at ${new Date()}`);
  }
}
