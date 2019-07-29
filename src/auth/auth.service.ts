import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenWrapper } from './interfaces/token-wrapper.interface';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        user.password = null;
        return user;
      }
    }
    return null;
  }

  async getToken(user: User): Promise<TokenWrapper> {
    const payload: TokenPayload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user_id: user.id
    };
  }

}
