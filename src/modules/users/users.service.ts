import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../auth/password.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly password: PasswordService,
  ) {}

  /**
   * create user
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkExist = await this.userRepo.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (checkExist) {
      throw new BadRequestException({
        message: 'User already exists',
      });
    }

    //password change to hash value
    createUserDto.password = await this.password.hashPassword(
      createUserDto.password,
    );
    const user = await this.userRepo.save(new User(createUserDto));
    //password value delete
    delete user.password;

    return user;
  }

  /**
   * email duplicate check
   * @param email
   */
  async findOne(email: string): Promise<Object> {
    const checkUser = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    return checkUser ? { result: false } : { result: true };
  }

  async findOneForUser(userNo: number) {
    const qb = await this.userRepo
      .createQueryBuilder('user')
      .where('user.no = :no', { no: userNo })
      .getOne();
    return qb;
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
