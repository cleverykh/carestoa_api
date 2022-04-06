import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { User } from '../users/entities/user.entity';
import { Contract } from './entities/contract.entity';
import { ContractExchangeMapper } from '../contract_exchange_mapper/contract_exchange_mapper.entity';
import { ContractAmountHistory } from './entities/contract-amount-history.entity';
import { Cryptocurrency } from '../cryptocurrency/entities/cryptocurrency.entity';
import { SYMBOL_TICKER_URL } from 'src/common/interfaces/external-api.type';
import axios from 'axios';
import { BinanceReturn } from 'src/common/interfaces/binance-return.type';
import { randomGenerator } from 'src/core';
import { CRYPTOCURRENCY_SYMBOL } from 'src/common';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepo: Repository<Contract>,
    @InjectRepository(ContractExchangeMapper)
    private readonly contractExchangeMapperRepo: Repository<ContractExchangeMapper>,
    @InjectRepository(ContractAmountHistory)
    private readonly contractAmountHistoryRepo: Repository<ContractAmountHistory>,
    @InjectRepository(Cryptocurrency)
    private readonly cryptocurrency: Repository<Cryptocurrency>,
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
  ): Promise<Contract> {
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
      /**
       * Update exchange from contract
       */
      const contractExchangeMapperNumberArray: any = [];
      if (
        updateContractDto.exchanges &&
        updateContractDto.exchanges.length > 0
      ) {
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
      }
      delete updateContractDto.exchanges;

      /**
       * Update for contract
       */
      await this.contractRepo
        .createQueryBuilder()
        .update()
        .set(updateContractDto)
        .where('no = :contractNo', { contractNo })
        .execute();

      /**
       * Insert to contract amount history
       */
      if (updateContractDto.cryptocurrencySymbol)
        await this.__InsertForContractAmountHistory(
          updateContractDto.cryptocurrencySymbol,
          contractNo,
        );

      //Return object
      const contract = await this.contractRepo
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.product', 'product')
        .leftJoinAndSelect('contract.cryptocurrency', 'cryptocurrency')
        .leftJoinAndSelect(
          'contract.contractAmountHistories',
          'contractAmountHistories',
        )
        .leftJoinAndSelect(
          'contract.contractExchangeMappers',
          'contractExchangeMapper',
        )
        .leftJoinAndSelect('contractExchangeMapper.exchange', 'exchange')
        .where('contract.no = :contractNo', { contractNo })
        .orderBy('contractAmountHistories.createdAt', 'DESC')
        .getOne();

      await queryRunner.commitTransaction();

      return contract;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new BadRequestException({
        message:
          e.response && e.response.message
            ? e.response.message
            : 'Bad request.',
      });
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * insert for contract amount History
   * @param cryptocurrencySymbol
   * @param contractNo
   */
  async __InsertForContractAmountHistory(
    cryptocurrencySymbol: CRYPTOCURRENCY_SYMBOL,
    contractNo: number,
  ) {
    const cryptocurrency = await this.cryptocurrency.findOne({
      where: {
        symbol: cryptocurrencySymbol,
      },
    });

    const binanceTickerAPI = `${
      SYMBOL_TICKER_URL.BINANCE_DOMAIN
    }symbol=${cryptocurrency.symbol.toUpperCase()}USDT&limit=1`;

    const binanceTicerResult: BinanceReturn[] = await axios
      .get(binanceTickerAPI)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw new BadRequestException({
          message: 'Failed to get cryptocurrency current price',
        });
      });

    let swapAmountVar = parseFloat(binanceTicerResult[0].price) * 15;
    let swapAmount = parseFloat(
      swapAmountVar
        .toFixed(4)
        .padEnd(
          swapAmountVar.toString().split('.')[0].length + 9,
          randomGenerator(0, 9999, 'string').padStart(4, '0'),
        ),
    );

    let contractAmountHistory = new ContractAmountHistory();
    contractAmountHistory.contractNo = contractNo;
    contractAmountHistory.contractAmount = swapAmount;
    contractAmountHistory.depositIssueDate = binanceTicerResult[0].time;

    await this.contractAmountHistoryRepo
      .createQueryBuilder()
      .insert()
      .into(ContractAmountHistory)
      .values(contractAmountHistory)
      .updateEntity(false)
      .execute();
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
