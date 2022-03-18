import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse } from 'src/common';
import { Repository } from 'typeorm';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from './dto/update-cryptocurrency.dto';
import { Cryptocurrency } from './entities/cryptocurrency.entity';

@Injectable()
export class CryptocurrencyService {
  constructor(
    @InjectRepository(Cryptocurrency)
    private readonly cryptocurrencyRepo: Repository<Cryptocurrency>,
  ) {}

  /**
   * create cryptocurrency
   * @param createCryptocurrencyDto
   */
  async createForCryptocurrency(
    createCryptocurrencyDto: CreateCryptocurrencyDto,
  ): Promise<Cryptocurrency> {
    const checkExist = await this.cryptocurrencyRepo.findOne({
      where: [
        { code: createCryptocurrencyDto.code },
        { name: createCryptocurrencyDto.name },
      ],
    });

    if (checkExist) {
      throw new BadRequestException({
        message: 'Cryptocurrency code or name already exists.',
      });
    }
    return await this.cryptocurrencyRepo.save(
      new Cryptocurrency(createCryptocurrencyDto),
    );
  }

  async findAllForCryptocurrency(): Promise<PaginatedResponse<Cryptocurrency>> {
    const [items, totalCount] = await this.cryptocurrencyRepo
      .createQueryBuilder('cryptocurrency')
      .getManyAndCount();
    return { totalCount, items };
  }
}
