import { Module } from '@nestjs/common';
import { UserRentamaEquipSlotService } from './user_rentama_equip_slot.service';
import { UserRentamaEquipSlotController } from './user_rentama_equip_slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRentamaEquipSlot } from './entities/user_rentama_equip_slot.entity';
import { UserEquipModule } from 'src/inventory/equipment/user_equip/user_equip.module';
import { EquipGradeModule } from 'src/static-table/equipment/equip_grade/equip_grade.module';
import { EquipLevelModule } from 'src/static-table/equipment/equip_level/equip_level.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRentamaEquipSlot]),
    UserEquipModule,
    EquipGradeModule,
    EquipLevelModule,
  ],
  exports: [UserRentamaEquipSlotService],
  controllers: [UserRentamaEquipSlotController],
  providers: [UserRentamaEquipSlotService],
})
export class UserRentamaEquipSlotModule {}
