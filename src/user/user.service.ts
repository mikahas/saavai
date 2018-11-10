import { Injectable, UnauthorizedException } from '@nestjs/common';
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
import * as nanoid from 'nanoid';

export class UserPayload {
    readonly id: number;
};

const saltRounds = 8;
const tokenExpiryTime = 86400; // 24h

@Injectable()
export class UserService {

  private readonly defaultUserApiKeyLength = 10;

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
        email: userData.email, passwordHash,
        apiKey: nanoid(this.defaultUserApiKeyLength)
    });
    const newUser = await this.userRepository.save(user);
    return this.omitHash(newUser);
  }

  async findByToken(token: string): Promise<User> {
    if (!token) throw new Error('Token not found.');
    let payload;
    try {
      payload = <UserPayload>jwt.verify(token, this.config.get('TOKEN_SECRET'));
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(error);
    }
    const user = await this.userRepository.findOne(payload.id);
    return this.omitHash(user);
  }

  async findByApiKey(apiKey: string): Promise<User> {
    if (!apiKey) throw new Error('API key not found.');
    return this.userRepository.findOne({ apiKey });
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
    return { token, expiresIn: tokenExpiryTime };
  }

  private omitHash(user: User): User {
    return <User>omit(user, ['passwordHash']);
  }

  async generateApiKey(user: User): Promise<string> {
    user.apiKey = nanoid(this.defaultUserApiKeyLength)
    return this.userRepository
      .save(user)
      .then((): string => user.apiKey);
  }

}
