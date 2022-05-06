import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { Response } from 'src/utils/dtos/response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() payload: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(payload);
    } catch (error: any) {
      throw new HttpException(error.message, 400);
    }
  }

  @Post('activate/:userId')
  async activate(@Param('userId') userId: string): Promise<Response> {
    try {
      return await this.userService.activate(userId);
    } catch (error: any) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('all')
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error: any) {
      throw new HttpException(error.message, 400);
    }
  }
}
