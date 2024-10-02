import { Module } from '@nestjs/common';
import { ItemTypeDefineService } from './item_type_define.service';
import { ItemTypeDefineController } from './item_type_define.controller';

@Module({
  controllers: [ItemTypeDefineController],
  providers: [ItemTypeDefineService],
})
export class ItemTypeDefineModule {}
