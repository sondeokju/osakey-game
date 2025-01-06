import { Module } from '@nestjs/common';
import { CollectionEquipService } from './collection_equip.service';
import { CollectionEquip } from './entities/collection_equip.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEquipController } from './collection_equip.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEquip])],
  exports: [CollectionEquipService],
  controllers: [CollectionEquipController],
  providers: [CollectionEquipService],
})
export class CollectionEquipModule {}
