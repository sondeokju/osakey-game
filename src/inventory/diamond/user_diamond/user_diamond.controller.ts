import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserDiamondService } from './user_diamond.service';

@Controller('dia')
export class UserDiamondController {
  constructor(private readonly userDiamondService: UserDiamondService) {}

  // @Get('')
  // @UseInterceptors(TransactionInterceptor)
  // async achieve(@User() user: Users, @QueryRunner() qr: QR) {
  //   const result = this.userDiamondService.getUserDiamonds(user.user_id, qr);
  //   return result;
  // }

  // @Post('add')
  // async addDiamonds(
  //   @Body()
  //   body: {
  //     userId: string;
  //     memberId: string;
  //     type: string;
  //     amount: number;
  //   },
  // ) {
  //   return await this.diamondService.addDiamonds(
  //     body.userId,
  //     body.memberId,
  //     body.type as 'diamond_paid' | 'diamond_bonus' | 'diamond_free',
  //     body.amount,
  //   );
  // }

  // @Post('save')
  // @UseInterceptors(TransactionInterceptor)
  // async saveAchieve(
  //   @User() user: Users,
  //   @Body('achieve_id') achieve_id: number,
  //   @Body('achieve_count') achieve_count: number,
  //   @Body('process_status') process_status: string,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userAchievementsService.saveAchieve(
  //     user.user_id,
  //     achieve_id,
  //     achieve_count,
  //     process_status,
  //     qr,
  //   );

  //   return JSON.stringify(result);
  // }
}
