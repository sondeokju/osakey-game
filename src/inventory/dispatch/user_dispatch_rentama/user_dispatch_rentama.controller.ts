import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserDispatchRentamaService } from './user_dispatch_rentama.service';

@Controller('dispatch')
export class UserDispatchRentamaController {
  constructor(
    private readonly userDispatchRentamaService: UserDispatchRentamaService,
  ) {}

  @Get('rentama')
  @UseInterceptors(TransactionInterceptor)
  async getUserDispatchRentama(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userDispatchRentamaService.getUserDispatchRentama(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('upgrade')
  @UseInterceptors(TransactionInterceptor)
  async saveAchieve(
    @User() user: Users,
    @Body('item_id') item_id: number,
    @Body('suit_piece_count') suit_piece_count: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userDispatchRentamaService.dispatchUpgrade(
      user.user_id,
      item_id,
      suit_piece_count,
      qr,
    );

    return result;
  }
}
