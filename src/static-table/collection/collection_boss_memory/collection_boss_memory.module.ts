import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionBossMemory } from './entities/collection_boss_memory.entity';
import { CollectionBossMemoryService } from './collection_boss_memory.service';
import { CollectionBossController } from './collection_boss_memory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionBossMemory])],
  exports: [CollectionBossMemoryService],
  controllers: [CollectionBossController],
  providers: [CollectionBossMemoryService],
})
export class CollectionBossModule {}
