import { BaseEntity } from 'src/core';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Contract } from './contract.entity';

@Entity({ name: 'contract_amount_history' })
export class ContractAmountHistory extends BaseEntity<ContractAmountHistory> {
  @Column({
    type: 'decimal',
    name: 'contract_amount',
    precision: 27,
    scale: 18,
  })
  contractAmount: number;

  @Column({
    type: 'bigint',
    name: 'deposit_issue_date',
    default: null,
  })
  depositIssueDate: number;

  @ManyToOne((type) => Contract, (contract) => contract.contractAmountHistories)
  @JoinColumn({
    name: 'contract_no',
    referencedColumnName: 'no',
  })
  contract: Contract;
}
