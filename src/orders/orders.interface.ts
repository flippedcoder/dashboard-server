import { IsNotEmpty, IsNumber } from 'class-validator';

export interface Order {
  id: number;
  name: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateOrderDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  total: number;
}

export class UpdateOrderDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  total: number;
}
