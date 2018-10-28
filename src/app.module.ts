import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'user/user.module';
import { ConfigModule } from './services/config/config.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ConfigModule,
    AuthModule,
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
