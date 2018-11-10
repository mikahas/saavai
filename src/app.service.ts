import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  root(): string {
    return 'Sää Vai API';
  }

  ping(): string {
    // TODO: add database connection check
    return 'pong';
  }

}
