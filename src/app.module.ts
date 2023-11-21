import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { OrdersModule } from './orders/orders.module';
import { StripeModule } from './integrations/stripe/stripe.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    OrdersModule,
    StripeModule,
    ProductsModule,
    UsersModule,
    ScheduleModule.forRoot(),
    // makes cache available to all modules in the app
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
