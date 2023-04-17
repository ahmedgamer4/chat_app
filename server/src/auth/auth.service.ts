import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const userToCreate = {
      ...dto,
      passwordHash,
      messages: [],
      groups: [],
    };

    await this.userService.createUser(userToCreate);
  }

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<{ token: string; user: User }> {
    const user = await this.userService.findOne({
      email: loginDto.email,
    });
    if (!user) {
      throw new HttpException(
        {
          status: 404,
          errors: {
            email: 'notFound',
          },
        },
        404,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (isValidPassword) {
      const token = this.jwtService.sign({
        id: user.id,
      });

      return { token, user };
    } else {
      throw new HttpException(
        {
          status: 400,
          errors: {
            password: 'Incorrect Password',
          },
        },
        400,
      );
    }
  }
}