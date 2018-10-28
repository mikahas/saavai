import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './weather.entity';
import { UserModule } from 'user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Weather]), UserModule],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
