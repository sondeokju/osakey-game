import { Module } from '@nestjs/common';
import { ItemEquipslotService } from './item-equipslot.service';
import { ItemEquipslotController } from './item-equipslot.controller';

@Module({
  controllers: [ItemEquipslotController],
  providers: [ItemEquipslotService],
})
export class ItemEquipslotModule {}
