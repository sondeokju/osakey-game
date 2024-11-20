import { Module } from '@nestjs/common';
import { RealtimeService } from './realtime.service';
import { RealtimeController } from './realtime.controller';
import { RealTimeGateway } from './realtime.gateway';

@Module({
  controllers: [RealtimeController],
  providers: [RealTimeGateway, RealtimeService],
})
export class RealtimeModule {}
