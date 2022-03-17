import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse } from 'src/common';
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
  async create(createExchangeDto: CreateExchangeDto): Promise<Exchange> {
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

    return await this.exchangeRepo.save(new Exchange(createExchangeDto));
  }

  async findAll(): Promise<PaginatedResponse<Exchange>> {
    const [items, totalCount] = await this.exchangeRepo
      .createQueryBuilder('exchange')
      .getManyAndCount();

    return { totalCount, items };
  }
}
