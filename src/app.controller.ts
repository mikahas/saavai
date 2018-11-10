import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('ping')
  @ApiResponse({ status: 200, description: 'Ping - pong, check API heartbeat' })
  ping(): string {
    return this.appService.ping();
  }
}
