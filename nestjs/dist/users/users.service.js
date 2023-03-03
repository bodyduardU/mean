"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const common_2 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const argon2 = require("argon2");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(dto) {
        const { username, email, password } = dto;
        const qb = await (0, typeorm_2.getRepository)(user_entity_1.User)
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email =:email', { email });
        const user = await qb.getOne();
        if (user) {
            const errors = { username: 'Username and email musth be unique' };
            throw new common_1.HttpException({ message: 'Input data validation failed', errors }, common_2.HttpStatus.BAD_REQUEST);
        }
        let newUser = new user_entity_1.User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        const errors = await (0, class_validator_1.validate)(newUser);
        if (errors.length > 0) {
            const _errors = { username: 'userInput is not valid.' };
            throw new common_1.HttpException({ message: 'Input data validation failed', _errors }, common_2.HttpStatus.BAD_REQUEST);
        }
        else {
            const saveUser = await this.userRepository.save(newUser);
            return this.buildUseRP(saveUser);
        }
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne({ email, password }) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            return null;
        }
        if (await argon2.verify(user.password, password)) {
            return user;
        }
        return null;
    }
    async update(id, updateUserDto) {
        let toUpdate = await this.userRepository.findOne(id);
        delete toUpdate.password;
        let updated = Object.assign(toUpdate, updateUserDto);
        return await this.userRepository.save(updated);
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    buildUseRP(user) {
        const UserRO = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return { user: UserRO };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map