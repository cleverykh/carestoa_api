import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

const env = process.env;

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRESIN },
    };
  }
}
