import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exchange } from '../exchange/entities/exchange.entity';
import { User } from '../users/entities/user.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepo: Repository<Contract>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Exchange)
    private readonly exchangeRepo: Repository<Exchange>,
  ) {}

  async createForContract(
    userInfo: User,
    createContractDto: CreateContractDto,
  ): Promise<Contract> {
    // const user = await this.userRepo.findOne({ where: { no: userInfo.no } });
    const exchangesNoArr: any = [];
    let exchanges: Exchange[] = [];
    createContractDto.exchanges.map((val) => {
      exchangesNoArr.push({ no: val });
    });

    if (exchangesNoArr) {
      exchanges = await this.exchangeRepo.find({
        where: exchangesNoArr,
      });
    }
    const contract = await this.contractRepo.create({
      ...createContractDto,
      user: userInfo,
      ...exchanges,
    });

    return await this.contractRepo.save(contract);
  }

  findAll() {
    return `This action returns all contract`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
