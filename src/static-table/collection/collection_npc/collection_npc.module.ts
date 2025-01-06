import { Module } from '@nestjs/common';
import { CollectionNpcService } from './collection_npc.service';
import { CollectionNpc } from './entities/collection_npc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionNpcController } from './collection_npc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionNpc])],
  exports: [CollectionNpcService],
  controllers: [CollectionNpcController],
  providers: [CollectionNpcService],
})
export class CollectionNpcModule {}
