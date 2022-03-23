import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { User } from '../users/entities/user.entity';
import { Exchange } from '../exchange/entities/exchange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, User, Exchange])],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
