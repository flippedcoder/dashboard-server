const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  const data = [
    { name: 'alice', email: 'alice@example.com' },
    { name: 'mark', email: 'mark@example.com' },
    { name: 'jackie', email: 'jackie@example.com' },
    { name: 'bob', email: 'bob@example.com' },
  ];

  return Promise.all(
    data.map(async (user) => {
      const record = await db.user.create({
        data: { name: user.name, email: user.email },
      });
    }),
  );
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
