import { FLAG_YN } from 'src/common/interfaces/flag-yn.type';
import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('User')
export class User extends BaseEntity<User> {
  @Column({
    type: 'varchar',
    name: 'EMAIL',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'PASSWORD',
    nullable: false,
    unique: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'USER_NAME',
    nullable: false,
    unique: false,
  })
  userName: string;

  @Column({
    type: 'varchar',
    name: 'DATE_BIRTH',
    nullable: true,
    unique: false,
  })
  dateBirth: string;

  @Column({
    type: 'varchar',
    name: 'PHONE_NUMBER',
    nullable: true,
    unique: false,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    name: 'SERVICE_AGREEMENT',
    nullable: false,
    unique: false,
  })
  serviceAgreement: FLAG_YN;

  @Column({
    type: 'varchar',
    name: 'PRIVACY_TERMS',
    nullable: false,
    unique: false,
  })
  privacyTerms: FLAG_YN;

  @Column({
    type: 'varchar',
    name: 'MARKETING_TERMS',
    nullable: false,
    unique: false,
  })
  marketingTerms: FLAG_YN;
}
