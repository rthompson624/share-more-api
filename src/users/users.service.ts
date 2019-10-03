import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel:  Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
 
  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async create(user: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const userHashed = {...user, password: passwordHash};
    const newUser = new this.userModel(userHashed);
    try {
      return await newUser.save();
    }
    catch (error) {
      if (error['code'] === 11000) {
        throw new ConflictException('An account with that email already exists');
      }
      else {
        throw error;
      }
    }
  }
 
  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
 
  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

}
