import { Module } from '@nestjs/common';
import { InvenService } from './inven.service';
import { InvenController } from './inven.controller';
import { entities_module } from 'src/entity_group/entity_module';

@Module({
  imports: [...entities_module],
  exports: [InvenService],
  controllers: [InvenController],
  providers: [InvenService],
})
export class InvenModule {}
