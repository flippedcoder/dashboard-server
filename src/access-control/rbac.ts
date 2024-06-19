export const rbacConfig = {
  rolesConfig: [
    {
      roles: ['Customer'],
      permissions: ['get:order', 'create:order', 'get:product'],
    },
    {
      roles: ['Support'],
      permissions: ['get:order', 'update:order', 'delete:order', 'get:product'],
    },
    {
      roles: ['Store'],
      permissions: ['get:product', 'delete:product', 'create:product', 'update:product'],
    },
  ],
};

type User = {
  roles: string;
};

enum Roles {
  Customer = 'Customer',
  Support = 'Support',
  Store = 'Store',
}

const canCreateOrder = (user: User) => {
  if (user.roles.includes(Roles.Customer)) return true;
  return false;
};
