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
    name: 'user_name',
  })
  userName: string;

  @Column({
    type: 'varchar',
    name: 'date_birth',
  })
  dateBirth: string;

  @Column({
    type: 'varchar',
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    name: 'service_agreement',
  })
  serviceAgreement: FLAG_YN;

  @Column({
    type: 'varchar',
    name: 'privacy_terms',
  })
  privacyTerms: FLAG_YN;

  @Column({
    type: 'varchar',
    name: 'provide_info_agreement',
  })
  provideInfoAgreement: FLAG_YN;

  @Column({
    type: 'varchar',
    name: 'marketing_terms',
  })
  marketingTerms: FLAG_YN;

  @OneToMany(() => Contract, (contract) => contract.user)
  contracts: Contract[];
}
