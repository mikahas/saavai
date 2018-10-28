import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { omit, map, head } from 'lodash';
import { User } from './user.entity';
import { ConfigService } from '../services/config/config.service';
import { CreateUserDto } from './create-user.dto';
import * as jwt from 'jsonwebtoken';
import { UserCredentialsDto } from './user-credentials.dto';
import { TokenResponseDto } from './token-response.dto';

export class UserPayload {
    readonly id: number;
};

const saltRounds = 8;
const tokenExpiryTime = 86400; // 24h

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly config: ConfigService
  ) {}

  async index(): Promise<User[]> {
    return await this.userRepository.find().then((users: User[]): User[] => {
        return map(users, this.omitHash);
    });
  }

  async create(userData: CreateUserDto): Promise<User> {
    const passwordHash = bcrypt.hashSync(userData.password, saltRounds);
    const user = this.userRepository.create({
        email: userData.email, passwordHash
    });
    const newUser = await this.userRepository.save(user);
    return this.omitHash(newUser);
  }

  async findByToken(token: string): Promise<User> {
    if (!token) throw new Error('Token not found.');
    const payload = <UserPayload>jwt.verify(token, this.config.get('TOKEN_SECRET'));
    const user = await this.userRepository.findOne(payload.id);
    return this.omitHash(user);
  }


  async login(credentials: UserCredentialsDto): Promise<TokenResponseDto> {
      if (!credentials.email) throw new Error('Email not found.');
      const token = await this.userRepository.find({ email: credentials.email })
        .then((users: User[]): string => {
            if (!users.length) throw new Error(`User not found (${credentials.email}).`);
            const user = head(users);
            const isLoginValid = bcrypt.compareSync(credentials.password, user.passwordHash);
            if (!isLoginValid) throw new Error('Invalid password.');
            return jwt.sign({ id: user.id }, this.config.get('TOKEN_SECRET'), {
                expiresIn: tokenExpiryTime
            });
        });
    return { token };
  }

  private omitHash(user: User): User {
    return <User>omit(user, ['passwordHash']);
  }

}
