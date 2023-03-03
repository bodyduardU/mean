import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRO } from './User.interface';
import { HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserRO> {
    const { username, email, password } = dto;
    const qb = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email =:email', { email });
    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username and email musth be unique' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    //////create new user
    let newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'userInput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const saveUser = await this.userRepository.save(newUser);
      return this.buildUseRP(saveUser);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne({ email, password }: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return null;
    }
    if (await argon2.verify(user.password, password)) {
      return user;
    }
    return null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let toUpdate = await this.userRepository.findOne(id);
    delete toUpdate.password;

    let updated = Object.assign(toUpdate, updateUserDto);
    return await this.userRepository.save(updated);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private buildUseRP(user: User) {
    const UserRO = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return { user: UserRO };
  }
}
