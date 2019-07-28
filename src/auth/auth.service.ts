import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const userWithoutPassword = <User>{...user, password: null};
        return userWithoutPassword;
      }
    }
    return null;
  }

}
