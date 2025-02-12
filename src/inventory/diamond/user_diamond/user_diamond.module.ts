import { Module } from '@nestjs/common';
import { UserDiamondService } from './user_diamond.service';
import { UserDiamondController } from './user_diamond.controller';
import { UserDiamond } from './entities/user_diamond.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserDiamond])],
  exports: [UserDiamondService],
  controllers: [UserDiamondController],
  providers: [UserDiamondService],
})
export class UserDiamondModule {}
