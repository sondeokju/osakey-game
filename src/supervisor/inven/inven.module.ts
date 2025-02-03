import { Module } from '@nestjs/common';
import { InvenService } from './inven.service';
import { InvenController } from './inven.controller';
//import { UserSuitModule } from 'src/inventory/suit/user_suit/user_suit.module';
import { entities_module } from 'src/entity_group/entity_module';

console.log('[DEBUG] imported entities_module:', entities_module);
console.log('Type:', typeof entities_module);
console.log('Is Array:', Array.isArray(entities_module));

@Module({
  imports: [],
  exports: [InvenService],
  controllers: [InvenController],
  providers: [InvenService],
})
export class InvenModule {}
