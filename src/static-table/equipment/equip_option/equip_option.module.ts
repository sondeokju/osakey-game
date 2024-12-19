import { Module } from '@nestjs/common';
import { EquipOptionService } from './equip_option.service';
import { EquipOptionController } from './equip_option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipOption } from './entities/equip_option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipOption])],
  exports: [EquipOptionService],
  controllers: [EquipOptionController],
  providers: [EquipOptionService],
})
export class EquipOptionModule {}
