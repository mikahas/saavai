import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WeatherService } from './weather.service';
import { CreateDropDto } from './create-drop.dto';
import { User } from 'user/user.decorator';
import { User as UserEntity } from 'user/user.entity';

@ApiUseTags('weather')
@Controller('api/weather')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class WeatherController {

    constructor(
        private readonly weatherService: WeatherService,
    ) {}

    @Get('index')
    async index(@User() user: UserEntity) {
        return this.weatherService.index(user);
    }

    @Post()
    async create(@Body() drop: CreateDropDto, @User() user: UserEntity) {
        return this.weatherService.create(drop, user);
    }
}
