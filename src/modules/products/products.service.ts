import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse } from 'src/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  /**
   * create product
   * @param createProductDto
   */
  async createForProduct(createProductDto: CreateProductDto): Promise<Product> {
    const checkExist = await this.productRepo.findOne({
      where: {
        name: createProductDto.name,
      },
    });

    if (checkExist) {
      throw new BadRequestException({
        message: 'Product name already exists.',
      });
    }

    return await this.productRepo.save(new Product(createProductDto));
  }

  async findAllForProduct(): Promise<PaginatedResponse<Product>> {
    const [items, totalCount] = await this.productRepo
      .createQueryBuilder('product')
      .getManyAndCount();

    return { totalCount, items };
  }
}
