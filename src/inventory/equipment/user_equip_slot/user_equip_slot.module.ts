import { Module } from '@nestjs/common';
import { UserEquipSlotService } from './user_equip_slot.service';
import { UserEquipSlotController } from './user_equip_slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEquipSlot } from './entities/user_equip_slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEquipSlot])],
  exports: [UserEquipSlotService],
  controllers: [UserEquipSlotController],
  providers: [UserEquipSlotService],
})
export class UserEquipSlotModule {}
