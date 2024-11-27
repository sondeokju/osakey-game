import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserRentamaService } from './user_rentama.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Controller('rentama')
export class UserRentamaController {
  constructor(private readonly userRentamaService: UserRentamaService) {}

  @Post('dispatch')
  //@HttpCode(200)
  @UseInterceptors(TransactionInterceptor)
  async eduLearn(
    @User() user: Users,
    @Body('progress_mission_id') progress_mission_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userRentamaService.rentamaDispatch(
      user.id,
      progress_mission_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('dispatch/complete')
  //@HttpCode(200)
  @UseInterceptors(TransactionInterceptor)
  async dispatchComplete(
    @User() user: Users,
    @Body('progress_mission_id') progress_mission_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userRentamaService.dispatchComplete(
      user.id,
      progress_mission_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Get('disptch/list')
  @UseInterceptors(TransactionInterceptor)
  async dispatchList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userRentamaService.dispatchList(user.id, qr);
    return result;
  }
}
