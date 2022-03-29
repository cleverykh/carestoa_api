import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepo: Repository<Contract>,
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

    //exchange mapper object create
    const contractExchangeMapperNumberArray: any = [];
    if (createContractDto.exchanges.length > 0) {
      createContractDto.exchanges.map((val) => {
        contractExchangeMapperNumberArray.push({ exchangeNo: val });
      });
    }

    //contract create
    const contract = await this.contractRepo.create({
      ...createContractDto,
      user: userInfo,
      contractExchangeMappers: contractExchangeMapperNumberArray,
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
