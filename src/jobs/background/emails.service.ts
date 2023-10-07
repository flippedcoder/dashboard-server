import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order, User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOrderConfirmation(user: User, order: Order) {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'support@company.ai', // override default from
      subject: 'Your order is on the way!',
      text: `Order number ${order.id} has been shipped. ${order.updatedAt} is when it left the waerhouse.`,
    });
  }
}
