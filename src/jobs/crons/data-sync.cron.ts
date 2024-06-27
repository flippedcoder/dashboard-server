import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import Stripe from 'stripe';
import { PrismaService } from 'src/utils/prisma.service';
import { CronJob } from 'cron';

@Injectable()
export class TasksService implements OnModuleInit{
  constructor(private prisma: PrismaService, private schedulerRegistry: SchedulerRegistry) {}
  // Keep the version string like this because Stripe said so
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' });
  private readonly logger = new Logger(TasksService.name);
  private syncDate = new Date();

  // Implement method to register cronJob on module Init
  onModuleInit() {
    this.addCronJob('sync_stripe_orders', '5 00 * * *', this.cronSyncStripeOrders.bind(this));
  }

  /**
   *  Adds a dynamic cron job
   *
   * @param cronName - cron job name
   * @param cronExpression - cron interval expression
   * @param cronCallback - the function that will handle the actual actions of the cron job
   */
  addCronJob(name: string, cronExpression: string, callback: (syncDate: Date) => Promise<void>) {
    const job = CronJob.from({
      cronTime: cronExpression,
      timeZone: 'America/New_York',
      onTick: () => callback(this.syncDate),
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.log(
      `The cron job ${name} has been added with cron expression : ${cronExpression}.`,
    );
  }

  async cronSyncStripeOrders(syncDate: Date) {
    this.logger.debug(`Stripe orders sync started at ${new Date()}`);

    const previousDate = syncDate.setDate(syncDate.getDate() - 1);

    // Set params to get the invoices that have been created since yesterday
    const params = {
      created: {
        gte: previousDate,
      },
    };

    // Get invoices from Stripe
    const { data: latestInvoices } = await this.stripe.invoices.list(params);

    // Check that there are new invoices to process
    if (latestInvoices.length === 0) {
      this.logger.debug(`No new Stripe invoices since ${previousDate}`);
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
        const doesOrderRecordExist = await this.prisma.order.findUnique({
          where: { stripeInvoiceId: invoice.id },
        });

        if (!doesOrderRecordExist) {
          await this.prisma.order.create({ data: orderRecord });
        }
      } catch (error) {
        this.logger.debug(`Something happened with invoice ${invoice.id}: ${error}`);
      }
    }

    this.logger.debug(`Stripe orders sync finished at ${new Date()}`);
  }
}
