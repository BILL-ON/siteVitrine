import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as sha256 from 'sha256';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(user: Partial<User>): Promise<User> {
    user.password = sha256(user.password);
    return this.userRepository.save(user);
  }

  async findOneByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: [{ username }, { email }] });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findOneByUsernameOrEmail(username, username);
    if (user && user.password === sha256(password)) {
      return user;
    }
    return null;
  }

  async generateJWT(user: User): Promise<string> {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  async decryptJWT(jwt_str: string): Promise<string | jwt.JwtPayload> {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.verify(jwt_str, process.env.JWT_SECRET);
  }

  async deleteUser(username: string): Promise<void> {
    await this.userRepository.delete({ username });
  }

  async getUserData(username: string): Promise<User | null> {
    console.log("username: ", username);
    return this.userRepository.findOne({ where: { username } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ select: ['id', 'username', 'email'] });
  }
}