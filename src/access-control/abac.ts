export const abacConfig = {
  attributesConfig: [
    {
      action: 'CreateOrder',
      attributes: {
        user: {
          type: ['customer'],
        },
        resource: {
          type: 'order',
        },
      },
    },
    {
      action: 'GetOrder',
      attributes: {
        user: {
          type: ['customer', 'support'],
        },
        resource: {
          type: 'order',
        },
      },
    },
    {
      action: 'GetProduct',
      attributes: {
        user: {
          type: ['customer', 'support', 'store'],
        },
        resource: {
          type: 'product',
        },
      },
    },
  ],
};

type User = {
  type: string;
};

type GetOrderProps = {
  user: {
    type: string;
  };
  resource: string;
  action: string;
};

const acceptedOrderUserTypes = ['customer', 'support', 'store'];

const canGetOrder = ({ user, resource, action }: GetOrderProps) => {
  if (acceptedOrderUserTypes.includes(user.type) && resource === 'order' && action === 'GetOrder') {
    return true;
  }
  return false;
};
