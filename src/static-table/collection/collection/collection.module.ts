import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Collection])],
  exports: [CollectionService],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
