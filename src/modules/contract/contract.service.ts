import { BadRequestException, Injectable } from '@nestjs/common';
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

  /**
   * create contract
   * @param createContractDto
   */
  async createForContract(
    userInfo: User,
    createContractDto: CreateContractDto,
  ): Promise<Contract> {
    // 상품 중복 체크
    if (createContractDto.productNo) {
      const checkExist = await this.contractRepo.findOne({
        where: {
          userNo: userInfo.no,
          productNo: createContractDto.productNo,
        },
      });

      if (checkExist) {
        throw new BadRequestException({
          message: 'Already subscribed to this product',
        });
      }
    }

    //거래소 객체 생성
    const exchangesNoArr: any = [];
    let exchanges: Exchange[] = [];
    if (createContractDto.exchanges.length > 0) {
      createContractDto.exchanges.map((val) => {
        exchangesNoArr.push({ no: val });
      });

      exchanges = await this.exchangeRepo.find({
        where: exchangesNoArr,
      });
    }

    //계약서 생성
    const contract = await this.contractRepo.create({
      ...createContractDto, //계약서
      user: userInfo, //사용자
      ...exchanges, //거래소
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
