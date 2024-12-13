import { Module } from '@nestjs/common';
import { EquipLevelService } from './equip_level.service';
import { EquipLevelController } from './equip_level.controller';

@Module({
  controllers: [EquipLevelController],
  providers: [EquipLevelService],
})
export class EquipLevelModule {}
