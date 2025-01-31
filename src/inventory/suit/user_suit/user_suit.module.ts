import { UserSuit } from 'src/inventory/suit/user_suit/entities/user_suit.entity';
import { Module } from '@nestjs/common';
import { UserSuitService } from './user_suit.service';
import { UserSuitController } from './user_suit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserSuit])],
  exports: [UserSuitService],
  controllers: [UserSuitController],
  providers: [UserSuitService],
})
export class UserSuitModule {}
