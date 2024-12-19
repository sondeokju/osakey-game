import { Module } from '@nestjs/common';
import { UserEquipOptionService } from './user_equip_option.service';
import { UserEquipOptionController } from './user_equip_option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEquipOption } from './entities/user_equip_option.entity';
import { EquipOptionService } from 'src/static-table/equipment/equip_option/equip_option.service';
import { EquipOption } from 'src/static-table/equipment/equip_option/entities/equip_option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEquipOption, EquipOption])],
  exports: [UserEquipOptionService],
  controllers: [UserEquipOptionController],
  providers: [UserEquipOptionService, EquipOptionService],
})
export class UserEquipOptionModule {}
