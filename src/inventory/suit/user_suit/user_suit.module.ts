import { UserSuit } from 'src/inventory/suit/user_suit/entities/user_suit.entity';
import { Module } from '@nestjs/common';
import { UserSuitService } from './user_suit.service';
import { UserSuitController } from './user_suit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitModule } from 'src/static-table/suit/suit/suit.module';
import { UserItemModule } from 'src/user_item/user_item.module';
import { ResourceManagerModule } from 'src/supervisor/resource_manager/resource_manager.module';
import { GameLogsModule } from 'src/game_log/game_logs/game_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSuit]),
    SuitModule,
    UserItemModule,
    ResourceManagerModule,
    GameLogsModule,
  ],
  exports: [UserSuitService],
  controllers: [UserSuitController],
  providers: [UserSuitService],
})
export class UserSuitModule {}
