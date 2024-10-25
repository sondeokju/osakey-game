import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get('/')
  checkHealth() {
    return 'ok';
  }
}
