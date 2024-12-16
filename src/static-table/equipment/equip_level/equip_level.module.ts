import { Module } from '@nestjs/common';
import { EquipLevelService } from './equip_level.service';
import { EquipLevelController } from './equip_level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipLevel } from './entities/equip_level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipLevel])],
  exports: [EquipLevelService],
  controllers: [EquipLevelController],
  providers: [EquipLevelService],
})
export class EquipLevelModule {}
