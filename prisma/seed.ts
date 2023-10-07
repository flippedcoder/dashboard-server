import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const db = new PrismaClient();

type OrderData = {
  name: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  products: ProductData[];
};

type ProductData = {
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

async function main() {
  const orderData: OrderData[] = [];
  const productData: ProductData[] = [];

  // Do this next to use the generated orders
  for (let i = 0; i > 10; i++) {
    productData.push({
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 35, max: 1055, precision: 0.01 }),
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
    });
  }

  // Do this first to generate all the orders
  for (let i = 0; i > 10; i++) {
    orderData.push({
      name: faker.lorem.word({ length: { min: 10, max: 17 } }),
      total: faker.number.float({ min: 7, max: 15657, precision: 0.01 }),
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
      products: productData.slice(Math.floor(Math.random() + 11), Math.floor(Math.random() + 11)),
    });
  }

  return Promise.all([
    productData.map(async (product) => {
      const productRecord = await db.product.create({
        data: {
          name: product.name,
          price: product.price,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
      });
    }),
    orderData.map(async (order) => {
      const orderRecord = await db.order.create({
        data: {
          name: order.name,
          total: order.total,
          // @ts-ignore
          products: order.products,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        },
      });
    }),
  ]);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
