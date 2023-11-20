import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const order = {
    createdAt: new Date(),
    id: 1,
    name: 'Person 1 order',
    stripeInvoiceId: 'stripe-invoice-id-1',
    total: 45.99,
    updatedAt: new Date(),
    userId: 1,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('/v1/orders (POST)', () => {
    return request(app.getHttpServer()).post('/v1/orders').expect(200).expect(order);
  });
});
