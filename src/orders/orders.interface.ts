import { Product } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

export interface Order {
  id: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
  userId: number;
}

export class CreateOrderDto {
  @IsNumber()
  total: number;

  @IsNotEmpty()
  products: Product[];

  @IsNotEmpty()
  userId: number;
}

export class UpdateOrderDto {
  @IsNumber()
  total: number;

  @IsNotEmpty()
  products: Product[];

  @IsNotEmpty()
  userId: number;
}
