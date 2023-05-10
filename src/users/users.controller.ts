import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { User } from './users.interface';
import { UsersService } from './users.service';

@Controller('orders')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async users(): Promise<Array<User>> {
    return await this.usersService.user({});
  }

  @Get(':id')
  public async user(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.user({ id });
  }

  @Post()
  public async create(@Body() user: User): Promise<User> {
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return await this.usersService.createUser(user);
  }

  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<User> {
    user.updatedAt = new Date();
    return await this.usersService.updateUser({
      where: { id },
      data: user,
    });
  }
}
