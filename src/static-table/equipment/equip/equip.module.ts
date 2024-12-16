import { Module } from '@nestjs/common';
import { EquipService } from './equip.service';
import { EquipController } from './equip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equip } from './entities/equip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equip])],
  exports: [EquipService],
  controllers: [EquipController],
  providers: [EquipService],
})
export class EquipModule {}
