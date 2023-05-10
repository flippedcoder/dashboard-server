import { Order } from '@prisma/client';

export interface Product {
  id?: number;
  name: string;
  price: number;
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
}
