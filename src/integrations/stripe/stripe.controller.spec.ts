import { Test, TestingModule } from '@nestjs/testing';
import { StripeController } from './stripe.controller';
import { PrismaService } from 'src/utils/prisma.service';

describe.skip('StripeController', () => {
  let controller: StripeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeController, PrismaService],
    }).compile();

    controller = module.get<StripeController>(StripeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
