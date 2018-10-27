import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(token: string): Promise<User> {
        // Validate if token passed along with HTTP request
        // is associated with any registered account in the database
        return await this.userService.findByToken(token);
      }
}
