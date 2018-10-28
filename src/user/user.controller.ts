import { Controller, Get, Post, Body, UseGuards, Headers, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserCredentialsDto } from './user-credentials.dto';
import { ApiResponse, ApiBearerAuth, ApiUseTags, ApiModelProperty, ApiOperation, ApiImplicitBody } from '@nestjs/swagger';
import { User } from './user.decorator';
import { User as UserEntity } from './user.entity';
import { TokenResponseDto } from './token-response.dto';

@ApiUseTags('user')
@Controller('api/user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @Get('index')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: UserEntity, isArray: true, description: 'Fetch list of users' })
    index() {
        return this.userService.index();
    }

    @Post('register')
    @ApiResponse({ status: 200, type: UserEntity, description: 'Create a new user' })
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Get('me')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: UserEntity, description: 'Fetch current user information' })
    me(@User() user: UserEntity): UserEntity {
        return user;
    }

    @Post('login')
    @ApiResponse({ status: 200, type: TokenResponseDto, description: 'Login successful.'})
    @ApiResponse({ status: 401, description: 'Login failed.'})
    @ApiOperation({ description: "Login and get token", title: "Login" })
    async login(@Body() credentials: UserCredentialsDto, @Res() response: Response) {
        try {
            const tokenResponse = await this.userService.login(credentials);
            response.status(HttpStatus.OK).json(tokenResponse);
        } catch (error) {
            console.error(error);
            response.status(HttpStatus.UNAUTHORIZED).send({
                statusCode:401,
                error: "Unauthorized"
            });
        };
    }

}
