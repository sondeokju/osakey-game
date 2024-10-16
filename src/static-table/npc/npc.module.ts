import { Module } from '@nestjs/common';
import { NpcService } from './npc.service';
import { NpcController } from './npc.controller';

@Module({
  controllers: [NpcController],
  providers: [NpcService],
})
export class NpcModule {}
