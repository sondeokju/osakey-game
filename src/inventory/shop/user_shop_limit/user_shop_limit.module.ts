import { Module } from '@nestjs/common';
import { UserShopLimitService } from './user_shop_limit.service';
import { UserShopLimitController } from './user_shop_limit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserShopLimit } from './entities/user_shop_limit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserShopLimit])],
  exports: [UserShopLimitService],
  controllers: [UserShopLimitController],
  providers: [UserShopLimitService],
})
export class UserShopLimitModule {}
