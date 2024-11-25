import { Module } from '@nestjs/common';
import { DispatchEquipLevelService } from './dispatch_equip_level.service';
import { DispatchEquipLevelController } from './dispatch_equip_level.controller';

@Module({
  controllers: [DispatchEquipLevelController],
  providers: [DispatchEquipLevelService],
})
export class DispatchEquipLevelModule {}
