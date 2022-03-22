import { FLAG_YN } from 'src/common/interfaces/flag-yn.type';
import { BaseEntity } from 'src/core/base.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class User extends BaseEntity<User> {
  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
  })
  userName: string;

  @Column({
    type: 'varchar',
  })
  dateBirth: string;

  @Column({
    type: 'varchar',
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
  })
  serviceAgreement: FLAG_YN;

  @Column({
    type: 'varchar',
  })
  privacyTerms: FLAG_YN;

  @Column({
    type: 'varchar',
  })
  provideInfoAgreement: FLAG_YN;

  @Column({
    type: 'varchar',
  })
  marketingTerms: FLAG_YN;

  @OneToMany(() => Contract, (contract) => contract.user)
  contracts: Contract[];
}
