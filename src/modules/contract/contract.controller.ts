import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/common/decorators';
import { BinanceReturn } from 'src/common/interfaces/binance-return.type';
import { SYMBOL_TICKER_URL } from 'src/common/interfaces/external-api.type';
import { AuthRolesGuard, CallHttpService } from 'src/core';
import { User } from '../users/entities/user.entity';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';
@ApiTags('CONTRACT')
@Controller('contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractService,
    private readonly callHttpService: CallHttpService,
  ) {}

  @Post()
  @ApiOperation({ summary: '계약 생성' })
  @UseGuards(new AuthRolesGuard())
  @ApiBearerAuth()
  async contractCreate(
    @UserInfo() userInfo: User,
    @Body() createContractDto: CreateContractDto,
  ): Promise<Contract> {
    return await this.contractService.createForContract(
      userInfo,
      createContractDto,
    );
  }

  @Patch(':contractNo')
  @ApiOperation({ summary: '계약 정보 수정' })
  @UseGuards(new AuthRolesGuard())
  @ApiBearerAuth()
  async contractUpdate(
    @UserInfo() userInfo: User,
    @Param('contractNo', ParseIntPipe) contractNo: number,
    @Body() updateContractDto: UpdateContractDto,
  ): Promise<Contract> {
    return await this.contractService.updateForContract(
      userInfo,
      contractNo,
      updateContractDto,
    );
  }

  @Get('ticker/:symbol/:currency/:limit')
  @ApiOperation({ summary: 'BINANCE 암호화폐별 거래 시세 가져오기' })
  httpCall(
    @Param('symbol') symbol: string,
    @Param('currency') currency: string,
    @Param('limit') limit: string,
  ): Observable<AxiosResponse<BinanceReturn[]>> {
    const binanceTickerAPI = `${
      SYMBOL_TICKER_URL.BINANCE_DOMAIN
    }symbol=${symbol.toUpperCase()}${currency.toUpperCase()}&limit=${limit}`;

    return this.callHttpService.callHttp(binanceTickerAPI);
  }

  // @Get()
  // findAll() {
  //   return this.contractService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contractService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contractService.remove(+id);
  // }
}
