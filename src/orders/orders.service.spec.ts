import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
import { PrismaService } from '../utils/prisma.service';

const mockOrders: Order[] = [
  {
    createdAt: new Date(),
    id: 1,
    name: 'Person 1 order',
    stripeInvoiceId: 'stripe-invoice-id-1',
    total: 45.99,
    updatedAt: new Date(),
    userId: 1,
  },
  {
    createdAt: new Date(),
    id: 2,
    name: 'Person 2 order',
    stripeInvoiceId: 'stripe-invoice-id-2',
    total: 231.99,
    updatedAt: new Date(),
    userId: 2,
  },
  {
    createdAt: new Date(),
    id: 3,
    name: 'Person 3 order',
    stripeInvoiceId: 'stripe-invoice-id-3',
    total: 64.0,
    updatedAt: new Date(),
    userId: 3,
  },
];

describe.only('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, PrismaService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all orders', () => {
    const orders = service.orders({});
    expect(service.orders).toBeCalled();
    expect(orders).toEqual(mockOrders);
  });

  it('should return an order by id', () => {
    const order = service.order({ id: 2 });
    expect(service.order).toBeCalled();
    expect(order).toEqual(mockOrders[1]);
  });

  it('should create an order', () => {
    const order = service.order({ id: 2 });
    expect(service.order).toBeCalled();
    expect(order).toEqual(mockOrders[1]);
  });

  it('should update an order', () => {
    const order = service.order({ id: 2 });
    expect(service.order).toBeCalled();
    expect(order).toEqual(mockOrders[1]);
  });

  it('should delete an order', () => {
    const order = service.deleteOrder({ where: { id: 1 } });
    expect(service.order).toBeCalled();
    expect(order).toEqual(mockOrders[1]);
  });
});
