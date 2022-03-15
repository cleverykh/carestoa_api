import { FLAG_YN } from 'src/common/interfaces/flag-yn.type';
import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User extends BaseEntity<User> {
  @Column({
    type: 'varchar',
    name: 'EMAIL',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'PASSWORD',
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'USER_NAME',
  })
  userName: string;

  @Column({
    type: 'varchar',
    name: 'DATE_BIRTH',
  })
  dateBirth: string;

  @Column({
    type: 'varchar',
    name: 'PHONE_NUMBER',
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    name: 'SERVICE_AGREEMENT',
  })
  serviceAgreement: FLAG_YN;

  @Column({
    type: 'varchar',
    name: 'PRIVACY_TERMS',
  })
  privacyTerms: FLAG_YN;

  @Column({
    type: 'varchar',
    name: 'PROVIDE_INFO_AGREEMENT',
  })
  provideInfoAgreement: FLAG_YN;

  @Column({
    type: 'varchar',
    name: 'MARKETING_TERMS',
  })
  marketingTerms: FLAG_YN;
}
