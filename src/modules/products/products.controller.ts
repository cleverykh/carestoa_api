import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { PaginatedResponse } from 'src/common';

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: '상품 등록' })
  async productCreate(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: '상품 조회' })
  async productInquiry(): Promise<PaginatedResponse<Product>> {
    return await this.productsService.findAll();
  }
}
