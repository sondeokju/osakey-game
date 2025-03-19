import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameLogs } from './entities/game_logs.entity';
import { GameLogsService } from './game_logs.service';
import { GameLogsController } from './game_logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameLogs])],
  exports: [GameLogsService],
  controllers: [GameLogsController],
  providers: [GameLogsService],
})
export class GameLogsModule {}
