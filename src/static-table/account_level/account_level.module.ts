import { Module } from '@nestjs/common';
import { AccountLevelService } from './account_level.service';
import { AccountLevelController } from './account_level.controller';

@Module({
  controllers: [AccountLevelController],
  providers: [AccountLevelService],
})
export class AccountLevelModule {}
