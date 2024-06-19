import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const db = new PrismaClient();

const main = async () => {
  const orderData = [...Array(10)].map(() => ({
    id: faker.number.int({ min: 10, max: 170 }),
    total: faker.number.float({ min: 7, max: 15657, precision: 0.01 }),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    userId: 5,
    stripeInvoiceId: faker.string.alphanumeric(15),
  }));

  const productData = [...Array(10)].map(() => ({
    id: faker.lorem.word(),
    name: faker.commerce.productName(),
    price: faker.number.float({ min: 35, max: 1055, precision: 0.01 }),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  }));

  await db.user.create({
    data: {
      id: faker.number.int({ min: 5, max: 10 }),
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      roles: ['Customer', 'Support', 'Store'],
    },
  });

  productData.map(async (product) => {
    await db.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  });

  orderData.map(async (order) => {
    await db.order.create({
      data: {
        id: order.id,
        total: order.total,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        userId: order.userId,
      },
    });
  });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
