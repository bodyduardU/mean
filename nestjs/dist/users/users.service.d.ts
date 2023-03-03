import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRO } from './User.interface';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(dto: CreateUserDto): Promise<UserRO>;
    findAll(): Promise<User[]>;
    findOne({ email, password }: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): string;
    private buildUseRP;
}
