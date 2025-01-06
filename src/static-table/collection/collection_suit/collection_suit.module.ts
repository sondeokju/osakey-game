import { Module } from '@nestjs/common';
import { CollectionSuitService } from './collection_suit.service';
import { CollectionSuitController } from './collection_suit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionSuit } from './entities/collection_suit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionSuit])],
  exports: [CollectionSuitService],
  controllers: [CollectionSuitController],
  providers: [CollectionSuitService],
})
export class CollectionSuitModule {}
