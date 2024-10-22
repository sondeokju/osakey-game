import { Module } from '@nestjs/common';
import { NpcService } from './npc.service';
import { NpcController } from './npc.controller';
import { Npc } from './entities/npc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Npc])],
  exports: [NpcService],
  controllers: [NpcController],
  providers: [NpcService],
})
export class NpcModule {}
