import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'src/utils/dtos/response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private configs = this.configService.get('security');

  constructor(
    private configService: ConfigService,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel({
        ...payload,
        password: await bcrypt.hash(payload.password, this.configs.salt),
        role: 'user',
        isActive: false,
      });
      return await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async activate(userId: string): Promise<Response> {
    try {
      await this.userModel.findByIdAndUpdate(userId, { isActive: true });
      return { message: 'User activated successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
