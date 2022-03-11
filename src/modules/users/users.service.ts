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
    const checkUser = await this.userRepo.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (checkUser) {
      throw new BadRequestException({
        message: 'User already exists',
      });
    }

    //password change to hash value
    createUserDto.password = await this.password.hashPassword(
      createUserDto.password,
    );
    const user = await this.userRepo.save(new User(createUserDto));
    return user;
  }

  async findOne(userNo: number) {
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
