import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';
import { IsEmail } from 'class-validator';
import { type } from 'os';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  @IsEmail()
  email: string;

  @Column({ default: '' })
  image: string;
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
