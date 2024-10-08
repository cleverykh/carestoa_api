import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FLAG_YN, PaginatedResponse } from 'src/common';
import { exchanges } from 'src/common/initial-data/initial-data';
import { Repository } from 'typeorm';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { Exchange } from './entities/exchange.entity';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectRepository(Exchange)
    private readonly exchangeRepo: Repository<Exchange>,
  ) {}

  /**
   * create exchange
   * @param createExchangeDto
   */
  async createForExchange(
    createExchangeDto: CreateExchangeDto,
  ): Promise<Exchange | Exchange[]> {
    console.log(createExchangeDto.dumpInsert);
    if (createExchangeDto.dumpInsert === FLAG_YN.YES) {
      return await this.exchangeRepo.save(exchanges);
    }

    const checkExist = await this.exchangeRepo.findOne({
      where: [
        { code: createExchangeDto.code },
        { name: createExchangeDto.name },
      ],
    });

    if (checkExist) {
      throw new BadRequestException({
        message: 'Exchange code or name already exists.',
      });
    }

    return await this.exchangeRepo.save(createExchangeDto);
  }

  async findAllForExchange(): Promise<PaginatedResponse<Exchange>> {
    const [items, totalCount] = await this.exchangeRepo
      .createQueryBuilder('exchange')
      .getManyAndCount();

    return { totalCount, items };
  }
}
