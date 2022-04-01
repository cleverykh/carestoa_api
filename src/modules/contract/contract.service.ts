import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository, UpdateResult } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { User } from '../users/entities/user.entity';
import { Contract } from './entities/contract.entity';
import { ContractExchangeMapper } from '../contract_exchange_mapper/contract_exchange_mapper.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepo: Repository<Contract>,
    @InjectRepository(ContractExchangeMapper)
    private readonly contractExchangeMapperRepo: Repository<ContractExchangeMapper>,
  ) {}

  /**
   * create contract
   * @param userInfo
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

  /**
   * update contract
   * @param userInfo
   * @param contractNo
   * @param updateContractDto
   */
  async updateForContract(
    userInfo: User,
    contractNo: number,
    updateContractDto: UpdateContractDto,
  ): Promise<UpdateResult> {
    //contract and authority check
    const checkExist = await this.contractRepo.findOne({
      where: {
        no: contractNo,
      },
    });

    if (!checkExist) {
      throw new BadRequestException({
        message: 'This contract does not exist.',
      });
    } else if (checkExist.userNo !== userInfo.no) {
      throw new UnauthorizedException({
        message: `You don't have the authority.`,
        error: 401,
      });
    }

    //transaction start
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      //update for exchanges
      const contractExchangeMapperNumberArray: any = [];
      if (updateContractDto.exchanges.length > 0) {
        updateContractDto.exchanges.map((val) => {
          contractExchangeMapperNumberArray.push({
            exchangeNo: val,
            contractNo,
          });
        });

        // delete
        await this.contractExchangeMapperRepo.delete({ contractNo });

        //insert
        await this.contractExchangeMapperRepo
          .createQueryBuilder()
          .insert()
          .into(ContractExchangeMapper)
          .values(contractExchangeMapperNumberArray)
          .updateEntity(false)
          .execute();

        delete updateContractDto.exchanges;
      }

      //update for contract
      let contract = await this.contractRepo
        .createQueryBuilder()
        .update()
        .set(updateContractDto)
        .where('no = :contractNo', { contractNo })
        .execute();

      await queryRunner.commitTransaction();

      return contract;
    } catch (e) {
      await queryRunner.rollbackTransaction();

      throw new BadRequestException({
        message: 'Bad request.',
      });
    } finally {
      await queryRunner.release();
    }
  }

  // findAll() {
  //   return `This action returns all contract`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} contract`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} contract`;
  // }
}
