import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
const env = process.env;
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'mysql',
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      keepConnectionAlive: true,
      bigNumberStrings: false,
      supportBigNumbers: false,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: env.NODE_ENV === 'production' ? false : true, //Don't edit it. Never!!
    };
  }
}
