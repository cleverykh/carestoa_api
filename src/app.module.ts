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
