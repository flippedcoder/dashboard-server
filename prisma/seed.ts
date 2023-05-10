const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  const orderData = [
    {
      name: 'inv_924',
      quantity: 2,
      total: 92.42,
      createdAt: new Date('2023/02/21'),
      updatedAt: new Date('2023/02/24'),
    },
    {
      name: 'inv_925',
      quantity: 7,
      total: 24.56,
      createdAt: new Date('2023/02/21'),
      updatedAt: new Date('2023/02/24'),
    },
    {
      name: 'inv_926',
      quantity: 21,
      total: 212.98,
      createdAt: new Date('2023/02/21'),
      updatedAt: new Date('2023/02/24'),
    },
    {
      name: 'inv_927',
      quantity: 9,
      total: 13.47,
      createdAt: new Date('2023/02/21'),
      updatedAt: new Date('2023/02/24'),
    },
  ];
  const productData = [
    {
      name: 'Table',
      price: 59.99,
      createdAt: new Date(),
      updatedAt: new Date(),
      orders: orderData.slice(0, 2),
    },
    {
      name: 'Water Bottle',
      price: 9.99,
      createdAt: new Date(),
      updatedAt: new Date(),
      orders: orderData.slice(2, 4),
    },
    {
      name: 'Pants',
      price: 39.99,
      createdAt: new Date(),
      updatedAt: new Date(),
      orders: orderData,
    },
  ];
  const userData = [
    {
      name: 'alice',
      email: 'alice@example.com',
      orders: orderData.slice(0, 1),
    },
    {
      name: 'mark',
      email: 'mark@example.com',
      orders: orderData.slice(2, 3),
    },
    {
      name: 'jackie',
      email: 'jackie@example.com',
      orders: orderData.slice(3, 4),
    },
    {
      name: 'bob',
      email: 'bob@example.com',
      orders: orderData[2],
    },
  ];

  return Promise.all([
    orderData.map(async (order) => {
      const record = await db.order.create({
        data: {
          name: order.name,
          quantity: order.quantity,
          total: order.total,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        },
      });
    }),
    userData.map(async (user) => {
      const userRecord = await db.user.create({
        data: { name: user.name, email: user.email },
      });
    }),
  ]);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
