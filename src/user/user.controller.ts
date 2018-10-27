import { Controller, Get, Post, Body, UseGuards, Headers, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserCredentialsDto } from './user-credentials.dto';
import { ApiResponse, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @Get('index')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    index() {
        return this.userService.index();
    }

    @Post('register')
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Get('me')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    me(@Headers() headers) {
        const authHeader: string = headers.authorization;
        const token = authHeader.substring(7, authHeader.length);
        return this.userService.findByToken(token);
    }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Login successful.'})
    @ApiResponse({ status: 401, description: 'Login failed.'})
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
