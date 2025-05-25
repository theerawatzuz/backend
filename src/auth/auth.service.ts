import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // Mock users for demonstration
  private readonly users = [
    {
      id: 1,
      username: 'john',
      fullName: 'John Swalobsky',
    },
    {
      id: 2,
      username: 'lilly',
      fullName: 'Lilly Maha',
    },
    {
      id: 3,
      username: 'bob',
      fullName: 'Bob Typonic',
    },
  ];

  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = this.users.find(u => u.username === loginDto.username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      success: true,
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
      },
    };
  }
}
