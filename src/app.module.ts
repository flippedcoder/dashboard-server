import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OrdersModule } from './orders/orders.module';
import { StripeModule } from './integrations/stripe/stripe.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [AuthModule, OrdersModule, StripeModule, ProductsModule, UsersModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
