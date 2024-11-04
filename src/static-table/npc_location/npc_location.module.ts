import { Module } from '@nestjs/common';
import { NpcLocationService } from './npc_location.service';
import { NpcLocationController } from './npc_location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NpcLocation } from './entities/npc_location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NpcLocation])],
  exports: [NpcLocationService],
  controllers: [NpcLocationController],
  providers: [NpcLocationService],
})
export class NpcLocationModule {}
