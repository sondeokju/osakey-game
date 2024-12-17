import { Module } from '@nestjs/common';
import { UserEquipService } from './user_equip.service';
import { UserEquipController } from './user_equip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEquip } from './entities/user_equip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEquip])],
  exports: [UserEquipService],
  controllers: [UserEquipController],
  providers: [UserEquipService],
})
export class UserEquipModule {}
