import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UserCollectionService } from './user_collection.service';

@Controller('collection')
export class UserCollectionController {
  constructor(private readonly userCollectionService: UserCollectionService) {}

  @Get()
  @UseInterceptors(TransactionInterceptor)
  async userCollectionList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.userCollectionService.userCollectionList(
      user.user_id,
      qr,
    );
    return result;
  }

  @Post('save')
  @UseInterceptors(TransactionInterceptor)
  async achieveReward(
    @User() user: Users,
    @Body('collection_type') collection_type: string,
    @Body('collection_id') collection_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userCollectionService.saveCollection(
      user.user_id,
      collection_type,
      collection_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('reward')
  @UseInterceptors(TransactionInterceptor)
  async collectionReward(
    @User() user: Users,
    @Body('user_collection_id') user_collection_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userCollectionService.collectionReward(
      user.user_id,
      user_collection_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
