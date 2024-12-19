import { Module } from '@nestjs/common';
import { UserEquipOptionService } from './user_equip_option.service';
import { UserEquipOptionController } from './user_equip_option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEquipOption } from './entities/user_equip_option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEquipOption])],
  exports: [UserEquipOptionService],
  controllers: [UserEquipOptionController],
  providers: [UserEquipOptionService],
})
export class UserEquipOptionModule {}
