import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { EmailSendHistory } from '../email-send-history/email-send-history.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSigninPayload } from './types/user-signin.type';
import { PasswordService } from './password.service';
import { EmailSendService } from 'src/core/utils/email-send-service';
import { EMAIL_TYPE } from 'src/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(EmailSendHistory)
    private readonly emailSendHistoryRepo: Repository<EmailSendHistory>,

    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly emailSendService: EmailSendService,
  ) {}

  /**
   * authentication email
   * @param email
   */
  async requestForAuthenticationNumber(email: string): Promise<any> {
    const authenticationNumber = Math.random().toString().substring(2, 8);
    const result = await this.emailSendService.send(
      email,
      'CareSTOA 이메일 인증을 위한 인증번호를 안내 드립니다.',
      `email_authentication.ejs`,
      authenticationNumber,
    );
    if (result.response.indexOf('OK') > 0) {
      //success
      await this.emailSendHistoryRepo.save({
        email,
        emailType: EMAIL_TYPE.EMAIL_AUTHENTICATION,
        authenticationNumber,
        emailSendingTimestampUnix: Date.now(),
      });
    }
    return result;
  }

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
  async jwtSign(user: User, extend?: any): Promise<string> {
    const userSignInInfo: UserSigninPayload = {
      _no: user.no,
      _id: user.email,
      username: user.userName,
    };
    return await this.jwtService.sign({ ...userSignInInfo, ...extend });
  }
}
