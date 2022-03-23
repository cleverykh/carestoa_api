import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserInfo } from 'src/common/decorators';
import { AuthRolesGuard } from 'src/core';
import { User } from '../users/entities/user.entity';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';
@ApiTags('CONTRACT')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

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

  @Patch(':id')
  @ApiOperation({ summary: '계약 생성' })
  @UseGuards(new AuthRolesGuard())
  @ApiBearerAuth()
  async contractUpdate(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
