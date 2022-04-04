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
    nullable: false,
  })
  contractAmount: number;

  @Column({
    type: 'bigint',
    name: 'deposit_issue_date',
    default: null,
    nullable: false,
  })
  depositIssueDate: number;

  @Column({
    type: 'int',
    name: 'contract_no',
    unsigned: true,
  })
  contractNo: number;

  @ManyToOne((type) => Contract, (contract) => contract.contractAmountHistories)
  @JoinColumn({
    name: 'contract_no',
    referencedColumnName: 'no',
  })
  contract: Contract;
}
