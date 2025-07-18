import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserMembershipService } from './user_membership.service';

@Controller('membership')
export class UserMembershipController {
  constructor(private readonly userMembershipService: UserMembershipService) {}

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async getUserDispatchRentama(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userMembershipService.getUserMembership(
      user.user_id,
      qr,
    );
    return result;
  }

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

  // @Post('reward')
  // @UseInterceptors(TransactionInterceptor)
  // async achieveReward(
  //   @User() user: Users,
  //   @Body('user_achievements_id') user_achievements_id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const result = await this.userAchievementsService.achieveReward(
  //     user.user_id,
  //     user_achievements_id,
  //     qr,
  //   );

  //   return JSON.stringify(result);
  // }
}
