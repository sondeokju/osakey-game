import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionBoss } from './entities/collection_boss.entity';
import { CollectionBossService } from './collection_boss.service';
import { CollectionBossController } from './collection_boss.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionBoss])],
  exports: [CollectionBossService],
  controllers: [CollectionBossController],
  providers: [CollectionBossService],
})
export class CollectionBossModule {}
