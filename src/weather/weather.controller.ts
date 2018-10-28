import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WeatherService } from './weather.service';
import { CreateDropDto } from './create-drop.dto';
import { User } from 'user/user.decorator';
import { User as UserEntity } from 'user/user.entity';
import { Weather } from './weather.entity';

@ApiUseTags('weather')
@Controller('api/weather')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class WeatherController {

    constructor(
        private readonly weatherService: WeatherService,
    ) {}

    @Get('index')
    @ApiResponse({
        status: 200, type: Weather, isArray: true,
        description: 'Get weather entries from log for current user .'
    })
    async index(@User() user: UserEntity): Promise<Weather[]> {
        return this.weatherService.index(user);
    }

    @Post()
    @ApiResponse({ status: 200, type: Weather, description: 'Create a new weather entry to log' })
    async create(@Body() drop: CreateDropDto, @User() user: UserEntity): Promise<Weather> {
        return this.weatherService.create(drop, user);
    }
}
