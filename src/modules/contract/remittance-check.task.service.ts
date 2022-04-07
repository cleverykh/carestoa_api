import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CONTRACT_STATUS } from 'src/common';
import { ContractService } from 'src/modules/contract/contract.service';

@Injectable()
export class RemittanceCheckTaskService {
  constructor(private readonly contractService: ContractService) {}

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async remittanceCheck() {
    /**remittanceCheck
     * CONTRACT_STATUS === PREPARATION 유저 조회
     * 각 유저를 explorer 에서 송금 확인
     */
    let contractCheckList = await this.contractService.contractFindByStatus(
      CONTRACT_STATUS.PREPARATION,
    );

    //remittance Check
    if (contractCheckList.totalCount) {
    }
  }
}
