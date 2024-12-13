import { Module } from '@nestjs/common';
import { EquipService } from './equip.service';
import { EquipController } from './equip.controller';

@Module({
  controllers: [EquipController],
  providers: [EquipService],
})
export class EquipModule {}
