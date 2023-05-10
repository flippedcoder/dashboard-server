import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Auth } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  public async userPermissions(): Promise<Array<Auth>> {
    return await this.authService.userPermissions({});
  }

  @Get(':id')
  public async accessToken(@Param('id', ParseIntPipe) id: number): Promise<Auth> {
    return await this.authService.accessToken({ id });
  }

  @Post()
  public async login(@Body() order: Auth): Promise<Auth> {
    order.createdAt = new Date();
    order.updatedAt = new Date();
    return await this.authService.login(order);
  }

  @Put(':id')
  public async logout(@Param('id', ParseIntPipe) id: number, @Body() order: Auth): Promise<Auth> {
    order.updatedAt = new Date();
    return await this.authService.logout({
      where: { id },
      data: order,
    });
  }
}
