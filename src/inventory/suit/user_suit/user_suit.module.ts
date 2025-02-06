import { UserSuit } from 'src/inventory/suit/user_suit/entities/user_suit.entity';
import { Module } from '@nestjs/common';
import { UserSuitService } from './user_suit.service';
import { UserSuitController } from './user_suit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitModule } from 'src/static-table/suit/suit/suit.module';
import { UserItem } from 'src/user_item/entities/user_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSuit, UserItem]), SuitModule],
  exports: [UserSuitService],
  controllers: [UserSuitController],
  providers: [UserSuitService],
})
export class UserSuitModule {}
