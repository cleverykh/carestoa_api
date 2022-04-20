import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule, UsersModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';
import { ExchangeModule } from './modules/exchange/exchange.module';
import { CryptocurrencyModule } from './modules/cryptocurrency/cryptocurrency.module';
import { ContractModule } from './modules/contract/contract.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

const env = process.env;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        env.NODE_ENV === 'production' ? '.production.env' : '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT),
      username: env.DB_USER_NAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: env.NODE_ENV === 'production' ? false : true,
      synchronize: env.NODE_ENV === 'production' ? false : true, //Don't edit it. Never!!
    }),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: `smtps://${env.EMAIL_AUTH_EMAIL}:${env.EMAIL_AUTH_PASSWORD}@${env.EMAIL_HOST}`,
      defaults: {
        from: `"${env.EMAIL_FROM_USER_NAME}" <${env.EMAIL_AUTH_EMAIL}>`,
      },
      template: {
        dir: 'dist/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    ExchangeModule,
    CryptocurrencyModule,
    ContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
