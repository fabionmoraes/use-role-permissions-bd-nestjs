import { Injectable } from '@nestjs/common';
import { UsersService } from 'modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { bcryptCompare } from 'config/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await bcryptCompare(pass, String(user.password));
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
