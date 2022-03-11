import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSigninPayload } from './types/user-signin.type';
import { hash, compare } from 'bcrypt';
import { PasswordService } from './password.service';

const bcryptSaltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  /**
   * validate user
   * @param userNo
   */
  async validateUserById(userNo: number): Promise<User> {
    const qb = await this.userRepo
      .createQueryBuilder('user')
      .where('user.no = :no', { no: userNo })
      .getOne();
    return qb;
  }

  /**
   * Login for user
   * @param userLoginDto
   */
  async userLogin(userLoginDto: UserLoginDto): Promise<string> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userLoginDto.email })
      .getOne();
    if (!user) {
      throw new NotFoundException({
        message: `This email does not exist.`,
      });
    }

    // passwork check
    const passwordValid = await this.passwordService.validatePassword(
      userLoginDto.password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException({
        message: 'The password does not match.',
        error: 400,
      });
    }

    return await this.jwtSign(user);
  }

  /**
   * sign to jwt payload
   * @param user
   * @param extend
   */
  async jwtSign(user: User, extend?: any) {
    const userSignInInfo: UserSigninPayload = {
      _no: user.no,
      _id: user.email,
      username: user.userName,
    };
    return this.jwtService.sign({ ...userSignInInfo, ...extend });
  }
}
