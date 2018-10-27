import { Controller, Get, Post, Body, Param, UseGuards, Headers, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @Get('index')
    @UseGuards(AuthGuard('bearer'))
    index() {
        return this.userService.index();
    }

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Get('me')
    @UseGuards(AuthGuard('bearer'))
    me(@Headers() headers) {
        const authHeader: string = headers.authorization;
        const token = authHeader.substring(7, authHeader.length);
        return this.userService.findByToken(token);
    }

    @Post('login')
    async login(@Body() credentials: CreateUserDto, @Res() response: Response) {
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
