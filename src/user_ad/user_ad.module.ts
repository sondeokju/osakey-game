import { Module } from '@nestjs/common';
import { UserAdService } from './user_ad.service';
import { UserAdController } from './user_ad.controller';

@Module({
  controllers: [UserAdController],
  providers: [UserAdService],
})
export class UserAdModule {}
