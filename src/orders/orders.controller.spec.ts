import { Test, TestingModule } from '@nestjs/testing';
import { OrdersV1Controller } from './orders.controller';
import { OrdersService } from './orders.service';

const user = {
  id: 1001,
  email: 'tester@rest.com',
  name: 'Tester Rest',
  permissions: ['get:orders', 'create:orders'],
};

const order = {
  name: 'Biggest order',
  total: 125.99,
  stripeInvoiceId: 'stripeInvoiceId',
};

describe.only('OrdersController', () => {
  let controller: OrdersV1Controller;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersV1Controller],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersV1Controller>(OrdersV1Controller);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('ordersService should be defined', () => {
    expect(ordersService).toBeDefined();
  });

  it('throws unauthorized error if the user is undefined', async () => {
    await controller.create(undefined, order);

    expect(controller.create).toThrowError('Unauthorized');
  });

  it('throws forbidden error if the user does not have correct permissions', async () => {
    const badPermissionsUser = {
      id: 1001,
      email: 'tester@rest.com',
      name: 'Tester Rest',
      permissions: ['get:orders'],
    };

    await controller.create(badPermissionsUser, order);

    expect(controller.create).toThrowError('Forbidden');
  });

  it('throws bad request error if the order is undefined', async () => {
    await controller.create(user, undefined);

    expect(controller.create).toThrowError('No order data');
  });

  it('throws conflict error if the order name is missing', async () => {
    const orderWithoutName = {
      total: 125.99,
      stripeInvoiceId: 'stripeInvoiceId',
    };

    await controller.create(user, orderWithoutName);

    expect(controller.create).toThrowError('No order name');
  });

  it('throws conflict error if the order total is missing', async () => {
    const orderWithoutTotal = {
      name: 'Biggest order',
      stripeInvoiceId: 'stripeInvoiceId',
    };

    await controller.create(user, orderWithoutTotal);

    expect(controller.create).toThrowError('No order total');
  });

  it('successfully creates a new order', async () => {
    controller.create(user, order);
    const newOrder = await ordersService.createOrder(undefined);

    expect(ordersService.createOrder).toBeCalledWith(order);
    expect(ordersService.createOrder).toReturnWith(newOrder);
  });

  it('throws not found error if something happens in the service', async () => {
    try {
      controller.create(user, order);
      await ordersService.createOrder(undefined);
      expect(ordersService.createOrder).toThrowError();
    } catch (e) {
      expect(e.message).toBe('Something happened');
    }
  });
});
