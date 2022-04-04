import { PartialType } from '@nestjs/swagger';
import { CreateContractDto } from './create-contract.dto';

export class CreateContractAmountHistoryDto extends PartialType(
  CreateContractDto,
) {}
