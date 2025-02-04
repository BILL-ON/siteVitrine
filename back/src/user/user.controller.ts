import { Controller, Post, Body, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  async create(@Body() user: User): Promise<{ token: string }> {
    const newUser = await this.userService.create(user);
    const token = await this.userService.generateJWT(newUser);
    return { token };
  }

  @Post('login')
  async login(@Body() body: { username: string | undefined; email: string | undefined, password: string }): Promise<any> {
    const email = body.email ? body.email : '';
    const username = body.username ? body.username : '';
    const user = await this.userService.validateUser(username, email, body.password);
    if (user) {
      const token = await this.userService.generateJWT(user);
      return { token };
    }
    return { "error": 'Invalid username or password' };
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async delete(@Req() req): Promise<void> {
    await this.userService.deleteUser(req.user.username);
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  async getData(@Req() req): Promise<User | null> {
    return this.userService.getUserData(req.user.username);
  }

  @Post('jwt')
  @UseGuards(AuthGuard('jwt'))
  async refreshJWT(@Req() req): Promise<{ token: string }> {
    const token = await this.userService.generateJWT(req.user);
    return { token };
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}