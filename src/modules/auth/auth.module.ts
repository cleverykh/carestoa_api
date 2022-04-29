import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config';
import { PasswordService } from './password.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { EmailSendService } from 'src/core/utils/email-send-service';
import { EmailSendHistory } from '../email-send-history/email-send-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, EmailSendHistory]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  controllers: [AuthController],
  providers: [PasswordService, AuthService, JwtStrategy, EmailSendService],
})
export class AuthModule {}
