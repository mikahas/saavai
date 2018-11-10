import { Controller, Get, UseGuards, Post, Body, Query, Param } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WeatherService } from './weather.service';
import { CreateDropDto } from './create-drop.dto';
import { User } from 'user/user.decorator';
import { User as UserEntity } from 'user/user.entity';
import { Weather } from './weather.entity';
import { QueryWeatherIndexDto } from './query-weather-index.dto';
import { UserService } from 'user/user.service';

@ApiUseTags('weather')
@Controller('api/weather')
export class WeatherController {

    constructor(
        private readonly weatherService: WeatherService,
        private readonly userService: UserService
    ) {}

    @Get('index')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('bearer'))
    @ApiResponse({
        status: 200, type: Weather, isArray: true,
        description: 'Get weather entries from log for current user .'
    })
    async index(@Query() query: QueryWeatherIndexDto, @User() user: UserEntity): Promise<Weather[]> {
        return this.weatherService.index(user, query.range, query.from);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('bearer'))
    @ApiResponse({ status: 200, type: Weather, description: 'Create a new weather entry to log' })
    async create(@Body() drop: CreateDropDto, @User() user: UserEntity): Promise<Weather> {
        return this.weatherService.create(drop, user);
    }

    @Post('log/:apiKey')
    @ApiResponse({ status: 200, description: 'Create a new weather entry using token authentication' })
    async log(@Body() drop: CreateDropDto, @Param() params) {
        const user = await this.userService.findByApiKey(params.apiKey);
        // NOTE: always return true so the api key validity cannot be tested so easily
        if (!user) return true;
        await this.weatherService.create(drop, user);
        return true;
    }
}
